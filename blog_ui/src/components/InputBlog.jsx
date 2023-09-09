import React , {useEffect} from "react"

function InputBlog()
{
    const [currentTitle,setCurrentTitle] = React.useState("");
    const [currentBody,setCurrentBody] = React.useState("");

    async function HandleSubmit(e)
    {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title : currentTitle, body : currentBody  })
        };
        await fetch("http://localhost:5000/", requestOptions)
            .then((msg) => {
                console.log("OK posted");
            })
            .catch((err) => console.log(err));

        setCurrentBody("");
        setCurrentTitle("");
    }
    function HandleTitleChange(event)
    {
        const newValue= event.target.value;
        setCurrentTitle(newValue);
    }
    function HandleBodyChange(event)
    {
        const newValue= event.target.value;
        setCurrentBody(newValue);
    }

    return <form method="POST" className="inputForm" onSubmit={HandleSubmit}>
            <input className="inputItem inputTitle" type="text" placeholder="Title" name="Head" onChange={HandleTitleChange} value={currentTitle}></input>
            <textarea className="inputItem inputBody" type="text" placeholder="Body" name="NewBlog"  onChange={HandleBodyChange} value={currentBody}></textarea>
            <button className="inputItem" type="submit">Save</button>
        </form> ;
}

export default InputBlog;