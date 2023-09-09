import React from "react";

import Item from './Item.jsx'
let list=[
    {
        title : "First ",
        body  : "Check CHekc cc ",
        author: "Kinitic013",
        votes : "100"
    },
    {
        title : "First ",
        body  : "Check CHekc cc ",
        author: "Kinitic013",
        votes : "100"
    },
    {
        title : "First ",
        body  : "Check CHekc cc ",
        author: "Kinitic013",
        votes : "100"
    },
    {
        title : "First ",
        body  : "Check CHekc cc ",
        author: "Kinitic013",
        votes : "100"
    }
    
  ];
  
  
function ItemList()
{
    return (    <div>
        {list.map((card) => { 
            return <Item title={card.title} body={card.body} author={card.author} votes={card.votes}/>;
        })}
    </div>)  ;
}

export {ItemList};