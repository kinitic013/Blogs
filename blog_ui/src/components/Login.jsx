import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, signup } from "../services/actions/Auth";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    const login_url = `http://localhost:5000/${props.type}`;
    axios
      .post(login_url, currentUser)
      .then((response) => {
        const data = JSON.parse(response.data);
        console.log(data);
        console.log("OK LoggedIn");
        dispatch(login({ userDetails: data }));
        toast.success('User Sucessfully Loggedin!!!', {
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
        toast.error('Incorrect Password/Email', {
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
    // setCurrentName("");
    setCurrentPassword("");
  }
  function HandleUsernameChange(event) {
    const newValue = event.target.value;
    setCurrentUsername(newValue);
  }

  // function HandleNameChange(event)
  // {
  //     const newValue= event.target.value;
  //     setCurrentName(newValue);
  // }

  function HandlePasswordChange(event) {
    const newValue = event.target.value;
    setCurrentPassword(newValue);
  }

  return (
    <>
      {LoggedIn ? (
        navigate("/")
      ) : (
        <form className="inputForm" onSubmit={HandleSubmit}>
          {/* <input className="inputItem" type="text" name="name" placeholder="Name" onChange={HandleNameChange} value={CurrentName}  /> */}
          <input
            className="inputItem"
            type="email"
            name="Email"
            placeholder="Email"
            onChange={HandleUsernameChange}
            value={currentEmail}
          />
          <input
            type="password"
            className="inputItem"
            name="password"
            placeholder="Password"
            onChange={HandlePasswordChange}
            value={currentPassword}
          />
          <button type="submit" className="inputItem ">
            {props.type}
          </button>
        </form>
      )}
    </>
  );
}

export default InputLogin;
