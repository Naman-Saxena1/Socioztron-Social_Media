import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import {
    homeFeedReducer,
    userDetailsReducer,
    allLikedPostsReducer,
    currentProfilePageReducer,
    userBookmarksReducer
} from "./reducers/index"

export default createStore(
    combineReducers({
        homeFeedReducer, 
        userDetailsReducer, 
        allLikedPostsReducer,
        currentProfilePageReducer,
        userBookmarksReducer
    }),
    {},
    applyMiddleware(thunk)
)
