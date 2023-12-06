import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import Logo from "next/image";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import prisma from "../lib/prisma";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "@prisma/client";

interface Meeting {
  meeting_id: string;
  tutor_id: string;
  tutee_id: string;
  tutor_name: string;
  start_Time: string;
  end_Time: string; 
  booked: boolean;
  location: string;
  class: string;
}
interface TuteeViewMeetingsProps {   
  user: User;
  meetingsForTutee: Meeting[];
};

export default function MeetingList({ user, meetingsForTutee }: TuteeViewMeetingsProps){
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [confirmedMeeting, setConfirmedMeeting] = useState<Meeting | null>(null);
  
  // console.log(meetingsForTutee)

  useEffect(() => {
    

        setMeetings(meetingsForTutee);
  }, []);

  async function handleMeetingSelect(selectedMeeting: Meeting){
    console.log(selectedMeeting)
    selectedMeeting.tutee_id = user.user_id    
    const res = await (await fetch("/api/meetings/update", {
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedMeeting),
      method: "POST"
  })).json();

    // Show confirmation popup
    setConfirmedMeeting(selectedMeeting);

    // Remove the confirmed meeting from the meetings list
    const updatedMeetings = meetings.filter((meeting) => meeting.meeting_id !== selectedMeeting.meeting_id);
    setMeetings(updatedMeetings);
  };

  // Function to close the confirmation popup
  const closeConfirmationPopup = () => {
    setConfirmedMeeting(null);
  };

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
      <h2 className="text-2xl font-bold mb-4">Available Meetings</h2>
      {/* Confirmation Popup */}
      {confirmedMeeting && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <p>Confirmed!</p>
            <button onClick={closeConfirmationPopup} className="btn btn-primary">Close</button> {/* Applying DaisyUI button style */}
          </div>
        </div>
      )}
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
              <td>
                {/* Select button */}
                <button onClick={() => handleMeetingSelect(meeting)} 
                className="border-2 border-[#0038A8] px-6 py-2 rounded-lg hover:bg-[#0038A8]  hover:text-white ">Book Meeting</button>
              </td>
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
  const email = session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  const allMeetings = await prisma.meeting.findMany();
  console.log("All meetings")
  console.log(allMeetings)

  const filteredMeetings = allMeetings.map((m) => {
    if (user.classes.includes(m.class)){
      // console.log(m.tutor_name);
      return m;
    }
    else {
      return null;
    }
  }).filter((meeting) => meeting !== null);

  // console.log("Filtered Meetings")
  // console.log(filteredMeetings)
  const meetingsForTutee = JSON.parse(JSON.stringify(filteredMeetings))


  if (!user) {
    return {
      redirect: {
        destination: './onboard',
        permanent: false,
      },
    };
  }
  
  return { props: { session , user, meetingsForTutee} };
}

