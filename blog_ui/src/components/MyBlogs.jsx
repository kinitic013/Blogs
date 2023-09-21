import {useState} from 'react';
import { useDispatch } from "react-redux";
import {decrement , edit} from "../services/actions/BlogList";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Text , Textarea } from "@chakra-ui/react";

function ItemMyBlog(props)
{
    const [vote,setVote] = useState(100);
    const [isEditable, setEditable] = useState(true);
    const [type , setType] = useState("Edit");
    const [Heading , setHeading] = useState(props.Head); 
    const [Bodying , setBodying] = useState(props.Body); 

    const glassButtonStyle = {
        bg: "rgba(255, 255, 255, 0.1)", // Set a translucent background color
        backdropFilter: "blur(4px)", // Apply a blur filter for the glass effect
        border: "2px solid rgba(255, 255, 255, 0.5)", // Add a translucent border
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Add a shadow
        color: "white", // Text color
        _hover: {
          bg: "rgba(255, 255, 255, 0.2)", // Change background color on hover
        },
        _active: {
          bg: "rgba(255, 255, 255, 0.3)", // Change background color when active
        },
      };


    const dispatch=useDispatch();// dispatch or action caller

    function HandleDelete()
    {
        const delete_url = process.env.REACT_APP_URL+"/delete" ;
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
            const create_url = process.env.REACT_APP_URL+"/update" ;
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

    return (
        <Card      className='item' p="40px"
      color="black"
      mt="4"
      bg="rgba(255, 255, 255, 0.1)"
      rounded="md"
      shadow="md"
      maxW="1200px"
      w="100%"
      backdropFilter="blur(8px)"
      borderColor="rgba(255, 255, 255, 0.1)">
            <CardHeader>
            <Text className="author">{props.authorId}</Text>
                <Textarea border='0px' overflowY="hidden" h={`${Heading.split("\n").length * 1.5}rem`}  disabled={isEditable} className='title' onChange={HandleHeadChange} value={Heading} />
            </CardHeader>

            <CardBody>
                <Textarea border='0px' overflowY="hidden" h={`${Heading.split("\n").length * 1.5}rem`}  disabled={isEditable} className='body' onChange={HandleBodyChange} value={Bodying}/>
            </CardBody>
            
            <CardFooter>
                <ButtonGroup>
                    <Button sx={glassButtonStyle} onClick={HandleDelete}>
                        Delete
                    </Button>
                    <Button sx={glassButtonStyle} onClick={HandleEdit}>
                        {type}
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>);
}

export default ItemMyBlog; 