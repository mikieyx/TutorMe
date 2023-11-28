// pages/loginPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { signIn, signOut, useSession } from "next-auth/react"

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
  