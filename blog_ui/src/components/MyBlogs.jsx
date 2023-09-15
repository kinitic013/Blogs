import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faL, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import {increment , decrement , edit} from "../services/actions/BlogList";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ItemMyBlog(props)
{
    const [vote,setVote] = useState(100);
    const [isEditable, setEditable] = useState(true);
    const [type , setType] = useState("Edit");
    const [Heading , setHeading] = useState(props.Head); 
    const [Bodying , setBodying] = useState(props.Body); 


    const dispatch=useDispatch();// dispatch or action caller

    function HandleDelete()
    {
        const delete_url = "http://localhost:5000/delete" ;
        axios
          .post(delete_url, { _id: props._id })
          .then((msg) => {
            console.log("OK Deleted");
            toast.success('Blog Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          })
          .catch((err) => {
            toast.error("Blog not deleted , Error took place", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            console.log(err);
          });

        dispatch(decrement(props._id));
    }

    function HandleEdit()
    {
        if(!isEditable)
        {
            setType("Edit");
            setEditable(true);

            const newBlogItem = {
                Head : Heading,
                Body : Bodying,
                Vote : props.Vote,
                authorId : props.authorId, 
                _id : props._id
            }
            const create_url = "http://localhost:5000/update" ;
            console.log(newBlogItem);
            axios
              .post(create_url, newBlogItem)
              .then((msg) => {
                console.log("Blog Edited ");
                toast.success('Blog Successfully Updated', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
              })
              .catch((err) => {
                console.log(err);
                toast.error("Blog can't be updated , Error took place", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              });

            dispatch(edit(newBlogItem));
        }
        else
        {
            setEditable(false);
            setType("Save");
        }    
    }
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
                <input  disabled={isEditable} className='title' onChange={HandleHeadChange} value={Heading} />
            </CardHeader>

            <CardBody>
                <input  disabled={isEditable} className='body' onChange={HandleBodyChange} value={Bodying}/>
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
                    <Button onClick={HandleDelete}>
                        Delete
                    </Button>
                    <Button onClick={HandleEdit}>
                        {type}
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
        
        
        
    </div>);
}

export default ItemMyBlog; 