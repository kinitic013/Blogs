import React from "react";
import Nav from "../components/Nav.jsx";
import InputLogin from "../components/Login.jsx";
import { Box } from "@chakra-ui/react";
import { LOGIN } from "../services/constants.js";
function Signup() {
  return (
    <Box minH="100vh" className='page'bgGradient="linear(to-b,  #C63D2F, #FFBB5C)" align='center'>
      <Nav type={LOGIN} />
      <InputLogin type="Login" />
    </Box>
  );
}

export default Signup;
