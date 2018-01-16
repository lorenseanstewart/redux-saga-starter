import React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import Root from "./Root";
import "./styles.scss";

import IndexReducer from "./reducers";
import IndexSaga from "./sagas";

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

// Redux DevTools - completely optional, but this is necessary for it to
// work properly with redux saga.  Otherwise you'd just do:
//
// const store = createStore(
//   IndexReducer,
//   applyMiddleware(sagaMiddleware)
// )

/*eslint-disable */
const composeSetup =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
/*eslint-enable */

// the compose() function allows redux dev tools
// to watch the sagas and store
const store = createStore(
    IndexReducer,
    composeSetup(applyMiddleware(sagaMiddleware))
);

// Begin the Index Saga
sagaMiddleware.run(IndexSaga);

// Set up top level routes and mount app to dom
render(<Root store={store} />, document.getElementById("app"));
module.hot.accept();
