import {useState} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {login , logout , signup} from "../services/actions/Auth";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
function InputLogin(props)
{
    // const [CurrentName,setCurrentName] = useState("");
    const navigate = useNavigate();
    const [currentEmail,setCurrentUsername] = useState("");
    const [currentPassword,setCurrentPassword] = useState("");
    const dispatch=useDispatch();// dispatch or action caller

    async function HandleSubmit(e)
    {
        e.preventDefault();
        const currentUser = {
            Email : currentEmail,
            Password : currentPassword
        }

        const login_url = `http://localhost:5000/${props.type}` ;
        axios.post(login_url , currentUser)
        .then((response) => {
            const data = JSON.parse(response.data);
            console.log(data);
            console.log("OK LoggedIn");
            dispatch(login({userDetails : data}));

        })
        .catch((err) =>{
            console.log(err);
            alert("Incorrect Password/Email");
        });


        setCurrentUsername("");
        // setCurrentName("");
        setCurrentPassword("");
    }
    function HandleUsernameChange(event)
    {
        const newValue= event.target.value;
        setCurrentUsername(newValue);
    }

    // function HandleNameChange(event)
    // {
    //     const newValue= event.target.value;
    //     setCurrentName(newValue);
    // }

    function HandlePasswordChange(event)
    {
        const newValue= event.target.value;
        setCurrentPassword(newValue);
    }

    return (
        <div>
                <form className="inputForm" onSubmit={HandleSubmit}>
                    {/* <input className="inputItem" type="text" name="name" placeholder="Name" onChange={HandleNameChange} value={CurrentName}  /> */}
                    <input className="inputItem" type="email" name="Email" placeholder="Email" onChange={HandleUsernameChange} value={currentEmail}  />
                    <input type="password" className="inputItem" name="password" placeholder="Password" onChange={HandlePasswordChange}  value={currentPassword} />
                    <button type="submit" className="inputItem ">{props.type}</button>
                </form>
        </div>
    )
}


export default InputLogin;