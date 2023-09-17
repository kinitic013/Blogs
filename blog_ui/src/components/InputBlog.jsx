import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { increment, decrement } from "../services/actions/BlogList";
import axios from "axios";
import App from "./App";
import { useNavigate } from "react-router-dom";
import glassButtonStyle from "../style/GlassStyleButton";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
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
        toast.success("New Blog is Created!!!", {
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
        toast.error("An error took place , Please Try again later :<( ", {
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
        <div className="input">
          <Card
            p="40px"
            color="black"
            mt="4"
            bg="rgba(255, 255, 255, 0.1)"
            rounded="md"
            shadow="md"
            className="item"
            maxW="1200px"
            w="100%"
            backdropFilter="blur(8px)"
            borderWidth="2px"
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            <CardHeader>
              <Heading
              bgGradient="linear(to-l, #053B50, #C63D2F)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
              className="BlogHeading"
              >
                Author your own Blog.
              </Heading>
            </CardHeader>
            <form method="POST" className="inputForm" onSubmit={HandleSubmit}>
              <CardBody>
                <Stack>
                  <Textarea
                    border="0px"
                    overflowY="hidden"
                    h={`${currentHead.split("\n").length * 1.5}rem`}
                    className="inputItem inputHead"
                    type="text"
                    placeholder="Head"
                    name="Head"
                    onChange={HandleHeadChange}
                    value={currentHead}
                  ></Textarea>
                  <Textarea
                    border="0px"
                    overflowY="hidden"
                    h={`${currentBody.split("\n").length * 1.5}rem`}
                    className="inputItem inputBody"
                    type="text"
                    placeholder="Body"
                    name="NewBlog"
                    onChange={HandleBodyChange}
                    value={currentBody}
                  ></Textarea>
                  <Button
                    sx={glassButtonStyle}
                    className="inputItem"
                    type="submit"
                  >
                    Save
                  </Button>
                </Stack>
              </CardBody>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}

export default InputBlog;
