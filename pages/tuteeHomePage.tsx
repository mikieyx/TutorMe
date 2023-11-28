// pages/tuteeHomePage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

// Tutee home will show current meetings.

const tuteeHomePage: React.FC = () => {
  
    return (
      <div>
        <p>Tutee Home</p>
        <p>Your meetings</p>
        <p>Container with already accepted meetings goes here</p>
        <button onClick={(event) => (window.location.href = "/meetingSearchPage")}>View Available Meetings</button>
      </div>
    );
  };
  
  export default tuteeHomePage;
  