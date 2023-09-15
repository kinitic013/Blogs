import React from 'react';
import Nav from "../components/Nav.jsx";
import MyBlogsList from '../components/MyBlogList.jsx';

function Account(card)
{
    return (
      <div>
        <Nav />
        <MyBlogsList />
      </div>
    );
}

export default Account;