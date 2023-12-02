import React, { useState } from 'react';

interface AddMeetingProps {
  addMeeting: (newMeeting: Meeting) => void;
}

interface Meeting {
  id: number;
  tutorName: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
}

const AddMeeting: React.FC<AddMeetingProps> = ({ addMeeting }) => {
  const [tutorName, setTutorName] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeeting: Meeting = {
      id: Math.floor(Math.random() * 1000),
      tutorName,
      subject,
      date,
      startTime,
      endTime,
    };
    addMeeting(newMeeting);
    // Additional logic after adding the meeting, e.g., clearing form fields
    setTutorName('');
    setSubject('');
    setDate('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <div>
      <h2>Add Meeting</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tutor Name:
          <input
            type="text"
            value={tutorName}
            onChange={(e) => setTutorName(e.target.value)}
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <button type="submit">Add Meeting</button>
      </form>
    </div>
  );
};

export default AddMeeting;