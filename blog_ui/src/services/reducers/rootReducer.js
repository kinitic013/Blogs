import {combineReducers} from 'redux'
import {blogReducer} from "./BlogReducer";


export default combineReducers({
    blog : blogReducer
}) 