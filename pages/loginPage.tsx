// pages/loginPage.tsx

import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import { Session, getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import prisma from '../lib/prisma';
import Logo from "next/image";
import Heropic from "next/image";

const loginPage: React.FC = () => {
    const { data, status } = useSession()
    const handleLogin = () => {
      if (status === "authenticated") {
        signOut();
        return;
      }
      signIn("google", {callbackUrl:"/onboard"})
    };
  
    return (
      <div>
        <main className="w-9/12 mx-auto sticky max-h-[100px] " >
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

        {/* Starting of Hero Section */}

         <div className="text-center mt-8 ">
        
        <h2 className=" text-[#0038A8] text-4xl font-medium w-3/4 mx-auto leading-snug mt-8"> 
Here's to the pursuit of knowledge and the joy of <span className='text-[#F4C02B]'>learning!</span> </h2>
<p className='mt-6 text-xl font-normal '> Click the proceed button to be redirected to the okta authentication </p>
<button className="  text-xl px-16 py-2 rounded-lg bg-[#0038a8d2] text-white  hover:bg-[#0038a8]  hover:text-white my-8 " 
            onClick={handleLogin}>{status === "authenticated" ? "Logout" : "Proceed"}</button>
        <Heropic
              src="/learning.svg"
              width="580"
              height="580"
              alt="thank you"
              className="mx-auto "
            ></Heropic>
      
        
        <h1 >{data?.user.email}</h1>
        <div>

        </div>
        </div>
        
        </main>
        <div className="w-full bg-[#E3EBFC] h-[250px] relative top-[400px] -z-10"></div>
      </div>
    );
  };
  
  export default loginPage;


  export async function getServerSideProps(context){
    const session: Session = await getServerSession(context.req, context.res, authOptions)
    
    if (!session){
        return {
            props: {
              session
            }
        }
    }
    const email = session.user.email

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (user){
      console.log(session)
        return {
            redirect: {
                destination: session.is_tutor ? "/tutorHomePage" : '/tuteeHomePage',
                permanent: false
            }
        }
    }
    console.log("LAST")
    return {
      redirect: {
        destination: "/onboard",
        permanent: false
      }
    };
}  