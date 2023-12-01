import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';



// implement a delete button 

export default function AddClass(){
    const [classes, setClasses] = useState([]);
    const [classInput, setClassInput] = useState('')
    const router = useRouter();
    const {data: session} = useSession();

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
        router.push(session.is_tutor ? "/tutorHomePage" : "/tuteeHomePage")
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

export async function getServerSideProps(context){
    const session: Session = await getServerSession(context.req, context.res, authOptions)
    
    if (!session){
        return {
            redirect: {
                destination: './loginPage',
                permanenet: false,
            },
        }
    }
    const email = session.user.email

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!user){
        return {
            redirect: {
                destination: './onboard',
                permanent: false
            }
        }
    }
    return {props: {session}};
}  
