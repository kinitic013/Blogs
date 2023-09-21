import React, { useEffect } from "react";

import Nav from "./Nav.jsx";
import Item from "./Item.jsx";
import Footer from "./Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reset } from "../services/actions/BlogList.js";
import { VStack } from "@chakra-ui/react";

function App(props) {
  const list = useSelector((state) => state.blog.bloglist); //getState
  const dispatch = useDispatch(); // dispatch or action caller



  useEffect(() => {
    const fetchData = async () => {
      try {
        const create_url = process.env.REACT_APP_URL+"/resetAll";
        const response = await axios.get(create_url); // Replace with your server route
        const data = response.data;
        dispatch(reset({ newArray: data }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Initial fetchs
    // const intervalId = setInterval(fetchData, 10000);
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div >
      <Nav page={props.page}/>
      <VStack
        spacing={4}
        className="itemList"
      >
        {list.map((card) => {
          return (
            <Item
              Head={card.Head}
              Body={card.Body}
              authorId={card.authorId}
              Vote={card.Vote}
              _id={card._id}
            />
          );
        })}
      </VStack>
      <Footer />
    </div>
  );
}

export default App;
