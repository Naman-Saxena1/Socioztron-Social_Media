import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import {
    homeFeedReducer,
    exploreFeedReducer,
    userDetailsReducer
} from "./reducers/index"

export default createStore(
    combineReducers({homeFeedReducer, exploreFeedReducer, userDetailsReducer}),
    {},
    applyMiddleware(thunk)
)
