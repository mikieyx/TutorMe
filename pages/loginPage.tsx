// pages/loginPage.tsx

import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import { Session, getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import prisma from '../lib/prisma';

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
        <h1>Login</h1>
        <h1>{status}</h1>
        <h1>{data?.user.email}</h1>
        <div>
            <button onClick={handleLogin}>{status === "authenticated" ? "Logout" : "Login"}</button>
        </div>
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
        return {
            redirect: {
                destination: session.is_tutor ? "/tutorHomePage" : '/tuteeHomePage',
                permanent: false
            }
        }
    }
    return {
      redirect: {
        destination: "/onboard",
        permanent: false
      }
    };
}  