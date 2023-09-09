import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser ,faPlus} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
const UserIcon = <FontAwesomeIcon icon={faUser} size = 'xl' />
const AddIcon = <FontAwesomeIcon icon={faPlus} size = 'xl' />



function Nav()
{
  return(<div className='Nav'>
  <nav>
    <div className="nav-content">
      <div className="logo">
      <Link to="/">TheBlog.</Link>
      </div>
      <ul class="nav-links">
        <li><Link to="/custom">{AddIcon}</Link></li>
        <li><Link to="/login">{UserIcon}</Link></li>
      </ul>
    </div>
  </nav>
  </div>);
}

export default Nav;