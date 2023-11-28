import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from "next-auth"
import { Session } from "next-auth";
import prisma from '../lib/prisma';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Onboard(props) {
    console.log(props)
    const router = useRouter();
    const [tutor, setTutor] = useState(false);

    async function submitUser(){
        const res = await (await fetch("/api/onboard/route", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                is_Tutor: tutor
            }),
            method: "POST"
        })).json();
        router.push(res.is_Tutor ? "/tutorHomePage" : "/tuteeHomePage")
    }
    return <>
        <button onClick={() => setTutor(true)}>I'm a tutor!</button>
        <button onClick={()=> setTutor(false)}>I'm a tutee!</button>
        <button onClick={submitUser}>Submit</button>
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

    if (user){
        return {
            redirect: {
                destination: user.is_Tutor ? "/tutorHomePage" : "/tuteeHomePage",
                permanent: false
            }
        }
    }
    return {props: {user}};
}  