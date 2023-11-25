// pages/aboutUsPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const aboutUsPage: React.FC = () => {
  
    return (
      <div>
        <h1>
            <p>TutorMe</p>
            <button onClick={event => window.location.href="/index"}>Home</button>
            <button onClick={event => window.location.href="/loginPage"}>Login</button>
        </h1>
        <div>
            <p>
                blah blah blah about us
            </p>
        </div>
      </div>
    );
  };
  
  export default aboutUsPage;
  