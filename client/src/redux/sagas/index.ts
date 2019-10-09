import * as admission from './admission'
import * as feed from './feed'

export const initSagas = (sagaMiddleware: any) => {
    let sagas: any[] = [
        ...Object.values(admission),
        ...Object.values(feed),
    ]
    sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware))
}

