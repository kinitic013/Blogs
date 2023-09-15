import {LOGIN,LOGOUT,SIGNUP } from "../constants"

export function signup(userDetails)
{
    return {type : SIGNUP , payload : {userDetails : userDetails}};
}

export function login(userDetails)
{
    return {type : LOGIN , payload : {userDetails : userDetails}};
}

export function logout()
{
    return {type : LOGOUT};
}

