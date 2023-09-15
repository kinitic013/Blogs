import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser ,faPlus ,faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { LOGOUT } from '../services/constants';
import {logout} from "../services/actions/Auth"
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserIcon = <FontAwesomeIcon icon={faUser} size = 'xl' />
const AddIcon = <FontAwesomeIcon icon={faPlus} size = 'xl' />
const LogoutIcon = <FontAwesomeIcon icon={faRightToBracket} size = '2xl'/>;

function Nav()
{
  const isLoggedIn = useSelector(state => state.auth.LoggedIn);
  const dispatch = useDispatch();
  function handleLogout()
  {
    dispatch(logout());
    toast.success('UserLoggedout Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  return(<div className='Nav'>
  <nav>
    <div className="nav-content">
      <div className="logo">
      <Link to="/">TheBlog.</Link>
      </div>
      <ul class="nav-links">
        <li><Link to="/custom">{AddIcon}</Link></li>
        <li><Link to="/Account">{UserIcon}</Link></li>
        {isLoggedIn ? <li onClick={handleLogout}>{LogoutIcon}</li> : <li><Link to="/signup">SignUp</Link></li>}
      </ul>
    </div>
  </nav>
  </div>);
}

export default Nav;