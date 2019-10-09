import { takeLatest, put } from 'redux-saga/effects'
import { Actions, sendStore } from '../constants/actions'
import { Methods, Request } from '../helpers/request'

export function* signup() {
    yield takeLatest(Actions.REQUEST_SIGNUP.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.Post, '/api/admission')
            const response = yield request.send(action.payload)
            if (!response.ok) {
                throw new Error(response)
            }
            yield performSignin(action)
        } catch(err) {
            console.log(err)
        }
    }) 
}

export function* signin() {
    yield takeLatest(Actions.REQUEST_SIGNIN.toString(), performSignin)
}

function *performSignin(action: any) {
    try {
        const request = new Request(Methods.Put, '/api/admission')
        const response = yield request.send(action.payload)
        const json = yield response.json()
        if (json.error) {
            throw new Error(json)
        }
        yield put(sendStore(Actions.RECEIVE_SIGNIN, json))
    } catch(err) {
        console.log(err)
    }
}

export function* signout() {
    yield takeLatest(Actions.REQUEST_SIGNOUT.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.Delete, `/api/admission/${action.payload.id}`)
            const response = yield request.send()
            if (!response.ok) {
                throw new Error(response)
            }
            yield put(sendStore(Actions.RECEIVE_SIGNOUT))
        } catch(err) {
            console.log(err)
        }
    }) 
}