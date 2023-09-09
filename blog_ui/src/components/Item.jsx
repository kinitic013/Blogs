import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
function Item(props)
{
    const [vote,setVote] = React.useState(100);
    return (<div className='item'>
        <p className='upVote'>{<FontAwesomeIcon icon={faPlus} size="2xl" />}</p>
        <p className='author'>{props.author}</p>
        <p className='votes'>{props.votes}</p>
        <input className='title' value={props.title} />
        <p className='downVote'>{<FontAwesomeIcon icon={faMinus} size="2xl" />}</p>
        <p className='body' value={props.body}/>
    </div>);
}

export default Item; 