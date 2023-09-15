import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faL, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import {increment , decrement , edit} from "../services/actions/BlogList";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from "axios";

function Item(props)
{
    const [vote,setVote] = useState(100);
    const [Heading , setHeading] = useState(props.Head); 
    const [Bodying , setBodying] = useState(props.Body); 
    
    const dispatch=useDispatch();// dispatch or action caller

    function HandleHeadChange(event)
    {
        setHeading(event.target.value);
    }
    function HandleBodyChange(event)
    {
        setBodying(event.target.value);
    }

    return (<div className='item'>
        <Card>
            <CardHeader>
                <p className='author'>{props.authorId}</p>
                <input className='title' onChange={HandleHeadChange} value={Heading} />
            </CardHeader>

            <CardBody>
                <input className='body' onChange={HandleBodyChange} value={Bodying}/>
            </CardBody>
            
            <CardFooter>
                <ButtonGroup>
                    <Button>
                        <p className='upVote'>{<FontAwesomeIcon icon={faPlus} size="2xl" />}</p>
                    </Button>
                    <Button>
                        <p className='vote'>{props.Vote}</p>
                    </Button>
                    <Button>
                        <p className='downVote'>{<FontAwesomeIcon icon={faMinus} size="2xl" />}</p>
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
        
        
        
    </div>);
}

export default Item; 