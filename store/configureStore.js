import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';

export default function configureStore(onComplete) {
    const engine = createEngine('Kobler');
    const storeMiddleware = storage.createMiddleware(engine);
    const sagaMiddleware = createSagaMiddleware();

    let store = createStore(
        storage.reducer(reducers), //Apply redux-storage so we can persist Redux state to disk
        applyMiddleware(sagaMiddleware, storeMiddleware),
    );

    const load = storage.createLoader(engine);
    load(store)
        .then(onComplete)
        .catch(() => console.log('Failed to load previous state'));

    sagaMiddleware.run(sagas);

    return store;
}