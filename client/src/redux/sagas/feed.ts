import { takeLatest, put } from 'redux-saga/effects'
import { Actions, sendStore } from '../constants/actions'
import { Methods, Request } from '../helpers/request'

export function* sendPost() {
    yield takeLatest(Actions.SEND_POST.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.Post, `/api/photos`)
            const file = action.payload.file
            delete action.payload.file
            const response = yield request.sendFile(action.payload, file)
            const data = yield response.json()
            if (data.error) {
                throw new Error(data.message)
            }
            yield put(sendStore(Actions.POST_SUCCEEDED, data))
        } catch(err) {
            console.log(err)
        }
    }) 
}

export function* requestPosts() {
    yield takeLatest(Actions.REQUEST_POSTS.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.Get, `/api/photos?offset=${action.payload.offset}&count=${action.payload.count}`)
            const response = yield request.send()
            const data = yield response.json()
            if (data.error) {
                throw new Error(data.message)
            }
            yield put(sendStore(Actions.RECEIVE_POSTS, data))
        } catch(err) {
            console.log(err)
        }
    }) 
}

export function* deletePost() {
    yield takeLatest(Actions.REQUEST_POST_DELETE.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.Delete, `/api/photos/${action.payload.id}`)
            const response = yield request.send()
            if (!response.ok) {
                throw new Error(yield response.text())
            }
            yield put(sendStore(Actions.POST_DELETED, {id: action.payload.id}))
        } catch(err) {
            console.log(err)
        }
    }) 
}

export function* updatePost() {
    yield takeLatest(Actions.REQUEST_POST_EDIT.toString(), function* (action: any) {
        try {
            const request = new Request(Methods.Put, `/api/photos/${action.payload.id}`)
            yield put(sendStore(Actions.POST_UPDATED, action.payload))
            const response = yield request.send(action.payload)
            const data = yield response.json()
            if (data.error) {
                throw new Error(data.message)
            }
            yield put(sendStore(Actions.POST_UPDATED, data))
        } catch(err) {
            console.log(err)
        }
    }) 
}