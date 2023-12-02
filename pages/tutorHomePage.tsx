// pages/tuteeHomePage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Logo from "next/image";
import { useRouter } from "next/router";

export default function TutorHomePage(){
    const router = useRouter();

    function addMeeting(){
        router.push("/addMeeting")

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
              <a href="/tutorHomePage">Home</a>
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
        <div className="text-center mt-8">
            <p>Show meetings here</p>
            <button onClick={addMeeting}>Add a meeting</button>
        </div>
      </main>
      <div className="w-full bg-[#E3EBFC] h-[200px] relative top-[450px] -z-10"></div>
    </div>
    );
};