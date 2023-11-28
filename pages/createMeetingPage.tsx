// pages/createMeetingPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

// Will contain UI for creating a meeting as a basic form.

const createMeetingPage: React.FC = () => {
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [tutorName, setTutorName] = useState('');
  
    const handleCreate = async () => {
      try {
        const response = await axios.post("...");
        console.log(response.data.message);
      } catch (error) {
        console.error('Error occurred during meeting creation:', error);
      }
    };
  
    return (
      <div>
        <p>Create Meeting Page</p>
      <div>
        <input type="time" placeholder="Time" value={time} onChange={(e) => setEmail(e.target.value)} />
        <input type="location" placeholder="Location" value={location} onChange={(e) => setPassword(e.target.value)} />
        <input type="tutor_name" placeholder="Your Name" value={tutorName} onChange={(e) => setTutorName(e.target.value)} />
        <button onClick={handleCreate}>Create Your Meeting</button>
      </div>
      </div>
    );
  };
  
  export default createMeetingPage;
  