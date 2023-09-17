import React from "react";
import Nav from "../components/Nav.jsx";
import InputBlog from "../components/InputBlog.jsx";
import { Box, Center } from "@chakra-ui/react";

function Custom() {
  return (
    <Box  minH="100vh" className='page'bgGradient="linear(to-b,  #FFDBC3, #27005D)" align='center'>
      <Nav />
      <InputBlog />
    </Box>
  );
}

export default Custom;
