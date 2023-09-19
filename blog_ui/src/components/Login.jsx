import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, signup } from "../services/actions/Auth";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import glassButtonStyle from "../style/GlassStyleButton";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  Stack
} from "@chakra-ui/react";
function InputLogin(props) {
  // const [CurrentName,setCurrentName] = useState("");
  const navigate = useNavigate();
  const [currentEmail, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const LoggedIn = useSelector((state) => state.auth.LoggedIn);
  const dispatch = useDispatch(); // dispatch or action caller

  async function HandleSubmit(e) {
    e.preventDefault();
    const currentUser = {
      Email: currentEmail,
      Password: currentPassword,
    };
    console.log(currentUser);
    const login_url = process.env.REACT_APP_URL+"/login";
    axios
      .post(login_url, currentUser)
      .then((response) => {
        const data = JSON.parse(response.data);
        console.log(data);
        console.log("OK LoggedIn");
        dispatch(login({ userDetails: data }));
        toast.success("User Sucessfully Loggedin!!!", {
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
        toast.error("Incorrect Password/Email", {
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

    setCurrentUsername("");
    setCurrentPassword("");
  }
  function HandleUsernameChange(event) {
    const newValue = event.target.value;
    setCurrentUsername(newValue);
  }
  function HandlePasswordChange(event) {
    const newValue = event.target.value;
    setCurrentPassword(newValue);
  }

  return (
    <>
      {LoggedIn ? (
        navigate("/")
      ) : (
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
              Login
            </Heading>
          </CardHeader>
          <form className="input Login" onSubmit={HandleSubmit}>
            <CardBody>
              <Stack>
                <Input
                  border="0px"
                  className="inputItem"
                  type="email"
                  name="Email"
                  placeholder="Email"
                  onChange={HandleUsernameChange}
                  value={currentEmail}
                />
                <Input
                  border="0px"
                  type="password"
                  className="inputItem"
                  name="password"
                  placeholder="Password"
                  onChange={HandlePasswordChange}
                  value={currentPassword}
                />
                <Button
                  sx={glassButtonStyle}
                  type="submit"
                  className="inputItem "
                >
                  Login
                </Button>
              </Stack>
            </CardBody>
          </form>
        </Card>
      )}
    </>
  );
}

export default InputLogin;
