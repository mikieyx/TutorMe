// pages/index.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const Home: React.FC = () => {
  
    return (
      <div>
        <h1>
            <p>TutorMe</p>
            <button onClick={event => window.location.href="/about_us"}>About Us</button>
            <button onClick={event => window.location.href="/loginPage"}>Login</button>
        </h1>
        <div>
          <p>Elevate Your Learning Journey With Tailored Mentorship!</p>
        </div>
        <div>
          <button onClick={event => window.location.href="/signupPage"}>Register Now</button>
        </div>
      </div>
    );
  };
  
  export default Home;
  