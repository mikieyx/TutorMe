// pages/about_us.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const about_us: React.FC = () => {
  
    return (
      <div>
        <h1>
            <p>TutorMe</p>
            <button onClick={event => window.location.href="/index"}>Home</button>
            <button onClick={event => window.location.href="/loginPage"}>Login</button>
        </h1>
        <div>
            <p>
                blah blah blah
            </p>
        </div>
      </div>
    );
  };
  
  export default about_us;
  