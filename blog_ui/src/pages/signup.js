import React from "react";
import Nav from "../components/Nav.jsx";
import {  Box} from "@chakra-ui/react";
import InputSignup from "../components/Signup.jsx"
import { SIGNUP } from "../services/constants.js";
function Signup() {
  return (
    <Box
      minH="100vh"
      className="page"
      bgGradient="linear(to-b,  #C63D2F, #FFBB5C)"
      align="center"
    >
      <Nav type={SIGNUP}/>
        <InputSignup />
    </Box>
  );
}

export default Signup;
