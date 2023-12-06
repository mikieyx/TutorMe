import Logo from "next/image";
import { Session, getServerSession } from 'next-auth';
import prisma from '../lib/prisma';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import { User, Prisma } from "@prisma/client";

const meetingInclude = Prisma.validator<Prisma.MeetingInclude>()({
  tutor: {
    select: {
      firstName: true,
      lastName: true
    }
  }
});

type Meeting = Prisma.MeetingGetPayload<{
  include:typeof meetingInclude
}>;

const userInclude = Prisma.validator<Prisma.UserInclude>()({
  meetings_tutee: {
    include: meetingInclude
  }
});

interface TuteeHomePageProps {   
  user: string
};

export default function MeetingList({ user: _user }: TuteeHomePageProps) {
  const user: Prisma.UserGetPayload<{
    include: typeof userInclude;
  }> = JSON.parse(_user);
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);  



  useEffect(() => {
    

    setMeetings(user.meetings_tutee);
}, [user]);


  return (
    <main className="w-9/12 mx-auto sticky max-h-[100px] " >
    <div>
        {/* This is the navigation bar */}
        <header className="flex items-center justify-between my-10">
          <div className="flex items-center gap-4 cursor-pointer">
            <Logo src="/logo.svg" width="50" height="50" alt="logo"></Logo>
            <p className="text-3xl font-medium text-[#0038A8]">TutorMe</p>
          </div>
          <ul className="flex items-center gap-10 text-slate-700 text-lg w-[400px]">
          <li className="hover:text-[#0038A8]">
            <a href="/tuteeHomePage">Home</a>
            </li>
            <li className="hover:text-[#0038A8]">
            <a href="/tuteeViewMeetings">View Available Meetings</a>
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
      
    <div className="p-5"> {/* Applying padding using DaisyUI utility classes */}
      <h2 className="text-2xl font-bold mb-4">Your Upcoming Meetings</h2>
      
      {/* Table display */}
      <table className="table w-full">
        {/* Table headers */}
        <thead>
          <tr>
            <th>Tutor Name</th>
            <th>Subject</th>
            <th>Location</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        {/* Meeting data */}
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.meeting_id}>
              <td>{meeting.tutor_name}</td>
              <td>{meeting.class}</td>
              <td>{meeting.location}</td>
              <td>{meeting.start_Time}</td>
              <td>{meeting.end_Time}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
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

  if (session.is_tutor) {
    return {
      redirect: {
        destination: '/',
        permanenet: false,
      },
    };
  }
  const email = session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: userInclude
  });
  

  if (!user) {
    return {
      redirect: {
        destination: './onboard',
        permanent: false,
      },
    };
  }
  /*
  const yourClasses = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      classes: true  
  }
  })
  */
  return { props: { session , user:JSON.stringify(user) } };
}
