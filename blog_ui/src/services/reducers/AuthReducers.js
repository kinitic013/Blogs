import {LOGIN,LOGOUT,SIGNUP} from "../constants"

function authReducer(state = {LoggedIn : false , userDetails : {}} , action)
{
    switch(action.type)
    {
        case SIGNUP :
            {
                return {LoggedIn : true , userDetails : action.payload.userDetails};
            }
        case LOGIN :
            {
                return {LoggedIn : true , userDetails : action.payload.userDetails};
            }
        case LOGOUT :
            {
                return {LoggedIn : false , userDetails : {}};
            }
        default :
        {
            return state;
        }
    }
}

export  {authReducer};
