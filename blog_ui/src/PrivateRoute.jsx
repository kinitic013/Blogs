import { Navigate } from "react-router-dom"; 
import {useSelector} from "react-redux"

function PrivateRoute({children})
{
    const isLoggedIn = useSelector(state => state.auth.LoggedIn)
    console.log(isLoggedIn);
    return isLoggedIn ? children : <Navigate to="/login" /> ;
}

export default PrivateRoute;