import {combineReducers} from 'redux'
import {blogReducer} from "./BlogReducer";
import {authReducer} from "./AuthReducers";


export default combineReducers({
    blog : blogReducer,
    auth : authReducer
}) 