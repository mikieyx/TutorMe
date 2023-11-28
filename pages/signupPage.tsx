// pages/signupPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const signupPage: React.FC = () => {
    const handleSignupChoice = async (signupChoice) => {
        try {
            console.log(`Option selected:`, signupChoice);
            if (signupChoice === 'tutee') {
                window.location.href='/tuteeSignupPage';
            }
            else if (signupChoice === 'tutor') {
                window.location.href='/tutorSignupPage';
            }
            else {
                return;
            }
        } catch (error) {
          console.error('Error occurred during signup:', error);
        }
      };
  
    return (
      <div>
        <h1>
            <p>TutorMe</p>
            <button onClick={event => window.location.href="/aboutUsPage"}>About Us</button>
            <button onClick={event => window.location.href="/loginPage"}>Login</button>
        </h1>
            <div>
                <select id = "signupChoice" onChange={(event) => handleSignupChoice(event.target.value)}>
                    <option value="blank">---</option>
                    <option value="tutee">Tutee</option>
                    <option value="tutor">Tutor</option>
                </select>
            </div>
      </div>
    );
  };
  
  export default signupPage;
  