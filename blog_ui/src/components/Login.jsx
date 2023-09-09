import React ,{useContext}from "react";
function InputLogin()
{
    const [CurrentName,setCurrentName] = React.useState("");
    const [CurrentUsername,setCurrentUsername] = React.useState("");
    const [CurrentPassword,setCurrentPassword] = React.useState("");

    async function HandleSubmit(e)
    {
        e.preventDefault();
        console.log("Submitted");
        var details = {
            'username': CurrentUsername,
            'password': CurrentPassword,
            'name': CurrentName
        };
        
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const requestOptions = {
            method: 'POST',
            mode : "cors",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 
                        'Access-Control-Allow-Headers': '*'
        },
            body: formBody
        };


        await fetch("http://localhost:5000/register", requestOptions)
            .then((msg) => {
                console.log("OK posted");
            })
            .catch((err) => console.log(err));


        alert("Usser Registered!!");

        setCurrentUsername("");
        setCurrentName("");
        setCurrentPassword("");
    }
    function HandleUsernameChange(event)
    {
        const newValue= event.target.value;
        setCurrentUsername(newValue);
    }
    function HandleNameChange(event)
    {
        const newValue= event.target.value;
        setCurrentName(newValue);
    }
    function HandlePasswordChange(event)
    {
        const newValue= event.target.value;
        setCurrentPassword(newValue);
    }

    return (
        <div>
                <form className="inputForm" onSubmit={HandleSubmit}>
                    <input className="inputItem" type="text" name="name" placeholder="Name" onChange={HandleNameChange} value={CurrentName}  />
                    <input className="inputItem" type="email" name="Email" placeholder="Email" onChange={HandleUsernameChange} value={CurrentUsername}  />
                    <input type="password" className="inputItem" name="password" placeholder="Password" onChange={HandlePasswordChange}  value={CurrentPassword} />
                    <button type="submit" className="inputItem ">Login</button>
                </form>
        </div>
    )
}


export default InputLogin;