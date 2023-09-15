import React , {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {increment , decrement} from "../services/actions/BlogList";
import axios from "axios";
import App from "./App"
function InputBlog()
{
    const [currentHead,setCurrentHead] = React.useState("");
    const [currentBody,setCurrentBody] = React.useState("");
    const BlogList=useSelector(state=>state.blog.bloglist);//getState
    const dispatch=useDispatch();// dispatch or action caller
    const userDetails = useSelector(state => state.auth.userDetails);

    async function HandleSubmit(e)
    {
        e.preventDefault();
        const newBlogItem = {
            Head : currentHead,
            Body  : currentBody,
            authorId: userDetails.userDetails.Email,
            Vote : "123" ,
            _id : uuidv4()
        }
        const create_url = "http://localhost:5000/create" ;
        axios.post(create_url , newBlogItem)
        .then((response) => {
            console.log("OK posted");
        })
        .catch((err) => console.log(err));


        dispatch(increment(newBlogItem));
        setCurrentBody("");
        setCurrentHead("");
    }
    function HandleHeadChange(event)
    {
        const newValue= event.target.value;
        setCurrentHead(newValue);
    }
    function HandleBodyChange(event)
    {
        const newValue= event.target.value;
        setCurrentBody(newValue);
    }

    return <form method="POST" className="inputForm" onSubmit={HandleSubmit}>
            <input className="inputItem inputHead" type="text" placeholder="Head" name="Head" onChange={HandleHeadChange} value={currentHead}></input>
            <textarea className="inputItem inputBody" type="text" placeholder="Body" name="NewBlog"  onChange={HandleBodyChange} value={currentBody}></textarea>
            <button className="inputItem" type="submit">Save</button>
        </form> ;
}

export default InputBlog;