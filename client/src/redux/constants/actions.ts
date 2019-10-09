
export enum Actions {
    REQUEST_SIGNUP,
    REQUEST_SIGNIN,

    RECEIVE_SIGNIN,
    LOAD_SESSION,

    REQUEST_SIGNOUT,
    RECEIVE_SIGNOUT,

    SEND_POST,
    POST_SUCCEEDED,

    REQUEST_POSTS,
    RECEIVE_POSTS,

    REQUEST_POST_DELETE,
    POST_DELETED,

    REQUEST_POST_EDIT,
    POST_UPDATED,
}

export const sendAction = (type: Actions, payload: any) => ({
    type: type.toString(),
    payload
})

export const sendSecureAction = (type: Actions, payload: any) => ({
    secured: true,
    type: type.toString(),
    payload
})

export const sendStore = (type: Actions, payload: any = {}) => ({
    type,
    payload
})