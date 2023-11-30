import React, { useState } from 'react';


// implement a delete button 

export default function AddClass(){
    const [classes, setClasses] = useState([]);
    const [classInput, setClassInput] = useState('')

    function addClass(){
        setClasses([...classes, classInput.toUpperCase().trim()])
        setClassInput('')
    }

    async function submitClasses(){
    
        const res = await (await fetch("/api/classes/add", {
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                classes
            }),
            method: "POST"
        })).json();
    }

    return<>
    <h1>
        Course
    </h1>
    <input placeholder="ie CS146" value={classInput} onChange={(e)=>setClassInput(e.target.value)}>
    </input>
    <button onClick={addClass}>Add Course</button>
    <h2>
        {classes.map((c,i)=>{
            return <p key={i}>
                {c}
            </p>
        })}
    </h2>
    <button onClick={submitClasses}>Submit</button>
    </>
}
