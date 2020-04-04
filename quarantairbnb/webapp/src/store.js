import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import * as cfg from "./config";
import apiMiddlewareCreator from "./middleware/apiMiddleware";
import rootReducers from "./reducers";

console.log("store", cfg)
const middleware = [thunkMiddleware, apiMiddlewareCreator(cfg)];
const initialState = {};

let composed;
if (window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined) {
  composed = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  composed = applyMiddleware(...middleware);
}

export default createStore(rootReducers, initialState, composed);
