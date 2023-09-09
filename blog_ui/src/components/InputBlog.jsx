import React , {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {increment , decrement} from "../services/actions/BlogList";
function InputBlog()
{
    const [currentTitle,setCurrentTitle] = React.useState("");
    const [currentBody,setCurrentBody] = React.useState("");
    const BlogList=useSelector(state=>state.blog.bloglist);//getState
    const dispatch=useDispatch();// dispatch or action caller


    async function HandleSubmit(e)
    {
        e.preventDefault();
        const newBlogItem = {
            title : currentTitle,
            body  : currentBody,
            author: "Kinitic013",
            votes : "123" ,
            id : uuidv4()
        }
        dispatch(increment(newBlogItem)); 
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title : currentTitle, body : currentBody  })
        // };
        // await fetch("http://localhost:5000/", requestOptions)
        //     .then((msg) => {
        //         console.log("OK posted");
        //     })
        //     .catch((err) => console.log(err));

        setCurrentBody("");
        setCurrentTitle("");
    }
    function HandleTitleChange(event)
    {
        const newValue= event.target.value;
        setCurrentTitle(newValue);
    }
    function HandleBodyChange(event)
    {
        const newValue= event.target.value;
        setCurrentBody(newValue);
    }

    return <form method="POST" className="inputForm" onSubmit={HandleSubmit}>
            <input className="inputItem inputTitle" type="text" placeholder="Title" name="Head" onChange={HandleTitleChange} value={currentTitle}></input>
            <textarea className="inputItem inputBody" type="text" placeholder="Body" name="NewBlog"  onChange={HandleBodyChange} value={currentBody}></textarea>
            <button className="inputItem" type="submit">Save</button>
        </form> ;
}

export default InputBlog;