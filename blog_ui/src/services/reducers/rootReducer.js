import {combineReducers} from 'redux'
import {amount, jail}from "./reducer";


export default combineReducers({
    account : amount,
    jail : jail
}) 