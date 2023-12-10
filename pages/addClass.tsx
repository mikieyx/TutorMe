import { useRouter } from 'next/router';
import Logo from "next/image";
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
    const {data: session, update: updateSession} = useSession();

  function addClass() {
    setClasses([...classes, classInput.toUpperCase().trim()]);
    setClassInput('');
  }

  function removeClass(index) {
    const updatedClasses = classes.filter((_, i) => i !== index);
    setClasses(updatedClasses);
  }

  async function submitClasses() {
    const res = await (
      await fetch('/api/classes/add', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          classes,
        }),
        method: 'POST',
      })
    ).json();
    router.push((await updateSession()).is_tutor ? '/tutorHomePage' : '/tuteeHomePage');
  }

  return (
    <>
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
        <div className="flex justify-center items-center h-[400px]">
      <div className="bg-white p-8 rounded shadow-md w-120">
        <h1 className="text-xl font-semibold mt-8 mb-4">Course</h1>
        <div className="flex mb-4">
          <input
            placeholder="ie CS146"
            value={classInput}
            onChange={(e) => setClassInput(e.target.value)}
            className="input w-64 rounded-lg mr-4"
          />
          <button onClick={addClass} className="btn bg-primary text-white">
            Add Course
          </button>
        </div>
        <div className="text-xl font-semibold mb-4">
          {classes.map((c, i) => {
            return (
              <div key={i} className="flex items-center justify-between">
                <p>{c}</p>
                <button onClick={() => removeClass(i)} className="btn bg-red-500 text-white">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={submitClasses} className="btn bg-primary text-white">
          Submit
        </button>
        </div>
        </div>
      </main>
    </>
  );
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
  });

  if (!user) {
    return {
      redirect: {
        destination: './onboard',
        permanent: false,
      },
    };
  };
  
  return { props: { session }};
};