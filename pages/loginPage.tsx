// pages/loginPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

const loginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('/api/auth', { action: 'login', email, password });
        console.log(response.data.message);
      } catch (error) {
        console.error('Error occurred during login:', error);
      }
    };
  
    return (
      <div>
        <h1>Login</h1>
        <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  };
  
  export default loginPage;
  