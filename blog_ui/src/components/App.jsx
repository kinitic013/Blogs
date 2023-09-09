import React from 'react';

// import Nav from "./Nav.jsx";
import Item from './Item.jsx';
import Footer from './Footer.jsx'
import InitialList from "../data/BlogList.js"
import { useDispatch, useSelector } from "react-redux";
import {increment,decrement} from "../services/actions/action.js"


function App({store}) {
  const rupee=useSelector(state=>state.account.rupee);//getState
  const dispatch=useDispatch();// dispatch or action caller

  const [list,setList] = React.useState(InitialList);
  return <div>
    {/* <Nav /> */}
    <h1>Amount is ${rupee}</h1>
    <button className='inputItem' onClick={()=>{dispatch(increment())}} >Plus</button>
    <button className='inputItem' onClick={()=>{dispatch(decrement())}}>Minus</button>
    {list.map((card) => {
        return <Item title={card.title} body={card.body} author={card.author} votes={card.votes}/>;
    })}
    <Footer/>
  </div>
}

export default App;
