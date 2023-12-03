import Logo from "next/image";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Meeting {
  id: number;
  tuteeName: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
}
  const TutorHomePage = () => {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    // Mock data for meetings (can be replaced with actual data retrieval)
    const mockMeetings: Meeting[] = [
      {
        id: 1,
        tuteeName: 'Hee Hee',
        subject: 'CS166',
        date: '2023-12-01',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
      },
      {
        id: 2,
        tuteeName: 'Gee Gee',
        subject: 'CS149',
        date: '2023-12-02',
        startTime: '11:30 AM',
        endTime: '12:30 PM',
      },
      // Add more mock meetings as needed
    ];

    setMeetings(mockMeetings);
  }, []);

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
      
    <div className="p-5"> {/* Applying padding using DaisyUI utility classes */}

      <h2 className="text-2xl font-bold mb-4">Upcoming Meetings Information</h2>
      
      {/* Table display */}
      <table className="table w-full">
        {/* Table headers */}
        <thead>
          <tr>
            <th>Tutee Name</th>
            <th>Subject</th>
            {/* <th>Location</th> */}
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        {/* Meeting data */}
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.tuteeName}</td>
              <td>{meeting.subject}</td>
              {/* <td>{meeting.location}</td> */}
              <td>{meeting.date}</td>
              <td>{meeting.startTime}</td>
              <td>{meeting.endTime}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </main>
  );
};

export default TutorHomePage;