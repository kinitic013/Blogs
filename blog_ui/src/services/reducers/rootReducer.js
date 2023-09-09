import {combineReducers} from 'redux'
import {amount}from "./BankReducer";
import {jail} from "./JailReducer";
import {blogReducer} from "./BlogReducer";


export default combineReducers({
    account : amount,
    jail : jail ,
    blog : blogReducer
}) 