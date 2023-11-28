// pages/tutorHomePage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const tutorHomePage: React.FC = () => {
  
    return (
      <div>
        <p>Tutor Home</p>
        <p>Container with upcoming meetings that you are tutoring</p>
        <button onClick={(event) => (window.location.href = "/createMeetingPage")}>Create A New Meeting</button>
      </div>
    );
  };
  
  export default tutorHomePage;
  