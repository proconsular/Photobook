import { Session } from "../constants/types";
import { Actions } from "../constants/actions";

const INIT_STATE = {
    id: 0,
    username: "",
    token: "",
    online: false
}

export default (state: Session = INIT_STATE, action: any) => {
    switch(action.type as Actions) {
        case Actions.RECEIVE_SIGNIN: {
            let next = Object.assign({}, state)
            next.id = action.payload.id
            next.username = action.payload.username
            next.token = action.payload.token
            next.online = true
            localStorage.setItem('session', JSON.stringify(next))
            return next
        }
        case Actions.LOAD_SESSION: {
            const data = localStorage.getItem('session')
            if (data) {
                return Object.assign({}, JSON.parse(data))
            }
            return state
        }
        case Actions.RECEIVE_SIGNOUT: {
            localStorage.removeItem('session')
            return Object.assign({}, INIT_STATE)
        }
        default:
            return state
    }
}