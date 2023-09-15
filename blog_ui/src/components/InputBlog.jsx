import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { increment, decrement } from "../services/actions/BlogList";
import axios from "axios";
import App from "./App";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InputBlog() {
  const navigate = useNavigate();
  const [isBlogPosted, setBlogPosted] = React.useState(false);
  const [currentHead, setCurrentHead] = React.useState("");
  const [currentBody, setCurrentBody] = React.useState("");
  const dispatch = useDispatch(); // dispatch or action caller
  const userDetails = useSelector((state) => state.auth.userDetails);

  async function HandleSubmit(e) {
    e.preventDefault();
    const newBlogItem = {
      Head: currentHead,
      Body: currentBody,
      authorId: userDetails.userDetails.Email,
      Vote: "123",
      _id: uuidv4(),
    };
    const create_url = "http://localhost:5000/create";
    axios
      .post(create_url, newBlogItem)
      .then((response) => {
        console.log("OK posted");
        toast.success('New Blog is Created!!!', {
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
      .catch((err)=>
      {
        console.log(err);
        toast.error('An error took place , Please Try again later :<( ', {
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

    dispatch(increment(newBlogItem));
    setCurrentBody("");
    setCurrentHead("");
    setBlogPosted(true);

  }
  function HandleHeadChange(event) {
    const newValue = event.target.value;
    setCurrentHead(newValue);
  }
  function HandleBodyChange(event) {
    const newValue = event.target.value;
    setCurrentBody(newValue);
  }

  return (
    <>
      {isBlogPosted ? (
        navigate("/Account")
      ) : (
        <>
          <form method="POST" className="inputForm" onSubmit={HandleSubmit}>
            <input
              className="inputItem inputHead"
              type="text"
              placeholder="Head"
              name="Head"
              onChange={HandleHeadChange}
              value={currentHead}
            ></input>
            <textarea
              className="inputItem inputBody"
              type="text"
              placeholder="Body"
              name="NewBlog"
              onChange={HandleBodyChange}
              value={currentBody}
            ></textarea>
            <button className="inputItem" type="submit">
              Save
            </button>
          </form>{" "}
        </>
      )}
    </>
  );
}

export default InputBlog;
