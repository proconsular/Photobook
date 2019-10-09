import { Photo } from '../constants/types'
import { Actions } from '../constants/actions';

export default (state: {[index: number]: Photo} = {}, action: any) => {
    switch(action.type as Actions) {
        case Actions.POST_SUCCEEDED: {
            let photo = action.payload as Photo
            return {
                ...state,
                [photo.id]: photo,
            }
        }
        case Actions.RECEIVE_POSTS: {
            let next = Object.assign({}, state)
            for (const photo of action.payload as Photo[]) {
                next[photo.id] = photo
            }
            return next
        }
        case Actions.POST_DELETED: {
            let next = Object.assign({}, state)
            delete next[action.payload.id]
            return next
        }
        case Actions.POST_UPDATED: {
            let next = Object.assign({}, state)
            next[action.payload.id] = {
                ...next[action.payload.id],
                ...action.payload,
            }
            return next
        }
        default:
            return state
    }
}