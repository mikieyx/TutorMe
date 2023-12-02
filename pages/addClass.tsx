import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Logo from "next/image";


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
        <main className="w-9/12 mx-auto sticky max-h-[100px] " >
            {/* This is the navigation bar */}
            <header className="flex items-center justify-between my-10">
            <div className="flex items-center gap-4 cursor-pointer">
                <Logo src="/logo.svg" width="50" height="50" alt="logo"></Logo>
                <p className="text-3xl font-medium text-[#0038A8]">TutorMe</p>
            </div>
            <ul className="flex items-center gap-10 text-slate-700 text-lg w-[240px]">
                <li className="hover:text-[#0038A8]">
                <a href="/index">Home</a>
                </li>
                <li className="hover:text-[#0038A8]">
                <button onClick={(event) => (window.location.href = "/about_us")}>
                    About Us
                </button>
                </li>
            </ul>
            <div>
                <button
                className="border-2 border-[#0038A8] px-6 py-2 rounded-lg hover:bg-[#0038A8]  hover:text-white "
                onClick={(event) => (window.location.href = "/loginPage")}
                >
                Login
                </button>
            </div>
            </header>

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
        </main>
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
