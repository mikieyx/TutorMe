import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from "next-auth"
import { Session } from "next-auth";
import prisma from '../lib/prisma';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Logo from "next/image";

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
        router.push("/addClass")
    }
    return (
    <div>
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

    <div className="max-w-3xl mx-auto items-center mt-20 flex flex-col rounded-lg ">
        <h2 className="text-5xl w-6/12 font-bold mb-4">Select Your Role</h2>
        <button className="my-5 outline outline-2 text-black font-bold rounded-full py-4 px-12 bg-white hover:bg-[#F4C02B] focus:bg-green-500 focus:ring focus:ring-green-300 " onClick={() => setTutor(true) }>
            I'm a tutor!
        </button>
       
        <button className="my-5 outline outline-2 text-black font-bold rounded-full py-4 px-12 bg-white hover:bg-[#F4C02B]  focus:bg-green-500  focus:ring focus:ring-green-300" onClick={()=> setTutor(false)}>
            I'm a tutee!
        </button>
        <button className="my-5 text-black font-bold rounded-full py-4 px-10  outline outline-2 border-black bg-white   hover:bg-[#F4C02B]" onClick={submitUser}>
            Submit
        </button>
    </div>
    </main>
    </div>
    );
};

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
                destination: session.is_tutor ? "/tutorHomePage" : 'tuteeHomePage',
                permanent: false
            }
        }
    }
    return {props: {user}};
};