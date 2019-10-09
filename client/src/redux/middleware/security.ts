
export default (store: any) => (next: any) => (action: any) => {
    if (action.secured) {
        const session = store.getState().session
        if (session.online) {
            action.token = session.token
        }
    }
    next(action)
}