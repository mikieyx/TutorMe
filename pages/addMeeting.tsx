import Logo from "next/image";
import React, { useState } from 'react';
import { Session, getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import { authOptions } from './api/auth/[...nextauth]';
import router from "next/router";
import { User } from "@prisma/client";

interface AddMeetingProps {
  user: User
}

interface Meeting {
  class: string;
  // location: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function AddMeeting({ user }: AddMeetingProps){
  const [_class, setClass] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const {data: session} = useSession();


  async function submitMeeting() {
    const start_Time = new Date(date.toString() + " " + startTime.toString())
    const end_Time = new Date(date.toString() + " " + endTime.toString())
    console.log(_class);
    const meeting = {
        tutor_id: user.user_id,
        start_Time,
        end_Time,
        location,
        class: _class,
    }
    const res = await (await fetch("/api/meetings/add", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(meeting),
        method: "POST"
    })).json();
    console.log("posted");
  }



  async function fetchClasses() {
    // Fetch classes from /api/fetch
  }

  return (
    <main className="w-9/12 mx-auto sticky max-h-[100px] ">
    <div>
        {/* This is the navigation bar */}
        <header className="flex items-center justify-between my-10">
          <div className="flex items-center gap-4 cursor-pointer">
            <Logo src="/logo.svg" width="50" height="50" alt="logo"></Logo>
            <p className="text-3xl font-medium text-[#0038A8]">TutorMe</p>
          </div>
          <ul className="flex items-center gap-10 text-slate-700 text-lg w-[400px]">
            <li className="hover:text-[#0038A8]">
            <a href="/tutorHomePage">Home</a>
            </li>
            <li className="hover:text-[#0038A8]">
            <a href="/addMeeting">Add a Meeting</a>
            </li>
            <li className="hover:text-[#0038A8]">
            <a href="/addClass">Add a Class</a>
            </li>
          </ul>
          <div>
            <button
              className="border-2 border-[#0038A8] px-6 py-2 rounded-lg hover:bg-[#0038A8]  hover:text-white "
              onClick={(event) => (window.location.href = "/")}
            >
              Logout
            </button>
          </div>
        </header>
      </div>
      <div className="flex justify-center items-center h-[600px]">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Add Meeting</h2>
        <form className="space-y-4">
          {/* CHANGE TO A DROPDOWN/SELECT WITH ONLY THE TUTOR'S CLASSES TO CHOOSE FROM */}
          <div className="flex flex-col">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject:
            </label>
            <select
             className="select select-bordered w-full max-w-xs"
             onChange={(e) => setClass(e.target.value)}
             >
                <option disabled selected> Pick the class you want to tutor</option>
                {user.classes.map((c)=>{
                    return <option>{c}</option>
                })}
            </select>
          </div>
          {/*
          <div className="flex flex-col">
            <label htmlFor="subject" className="text-sm font-medium">
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          */}
          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm font-medium">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="startTime" className="text-sm font-medium">
              Start Time:
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="endTime" className="text-sm font-medium">
              End Time:
            </label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">
                Location
            </label>
            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={submitMeeting}       
          >
            Add Meeting
          </button>
        </form>
      </div>
    </div>
    </main>
  );
};


export async function getServerSideProps(context) {
  const session: Session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: './loginPage',
        permanenet: false,
      },
    };
  }
  const email = session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  if (!user) {
    return {
      redirect: {
        destination: './onboard',
        permanent: false,
      },
    };
  }
  
  return { props: { session , user } };
}
