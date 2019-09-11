import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./saga/rootReducer";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
