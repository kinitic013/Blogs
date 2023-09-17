import React from "react";
import Nav from "../components/Nav.jsx";
import MyBlogsList from "../components/MyBlogList.jsx";
import { Box } from "@chakra-ui/react";
function Account(card) {
  return (
    <Box  minH="100vh" className="page" bgGradient="linear(to-b, #F6F4EB ,#EF6262)">
      <Nav />
      <MyBlogsList />
    </Box>
  );
}

export default Account;
