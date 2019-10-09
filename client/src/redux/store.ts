import { createStore, } from "redux";
import { applyMiddleware } from "redux";
import reducer from "./reducers"

import createSagaMiddleware from 'redux-saga'
import { initSagas } from "./sagas";
import security from "./middleware/security";

const sagaMiddleware = createSagaMiddleware()

const middleWare = [
    sagaMiddleware,
    security,
]

export const getStore = () => {
    const store = createStore(
        reducer,
        applyMiddleware(...middleWare)
    )
    initSagas(sagaMiddleware)
    return store
}

