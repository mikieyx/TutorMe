// pages/specificMeetingPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

// Option to accept a meeting will be on this page as a button.

const specificMeetingPage: React.FC = () => {
  const handleAccept = async () => {
    try {
      const response = await axios.post("...");
      console.log(response.data.message);
    } catch (error) {
      console.error('Error occurred during meeting acception:', error);
    }
  };
  
    return (
      <div>
        <p>Specific Meeting Page</p>
        <p>Info about this meeting</p>
        <button onClick={handleAccept}>Accept This Meeting</button>
      </div>
    );
  };
  
  export default specificMeetingPage;
  