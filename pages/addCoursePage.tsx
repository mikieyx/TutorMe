// pages/addCoursePage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

// Will have a textbox for the tutor to add a course they want to teach.

const addCoursePage: React.FC = () => {
    const [course, setCourse] = useState('');
  
    const handleAdd = async () => {
      try {
        const response = await axios.post("...");
        console.log(response.data.message);
      } catch (error) {
        console.error('Error occurred during course add:', error);
      }
    };
  
    return (
      <div>
        <p>Add Course Page</p>
        <input type="course" placeholder="New Course" value={course} onChange={(e) => setCourse(e.target.value)} />
        <button onClick={handleAdd}>Add New Course</button>

      </div>
    );
  };
  
  export default addCoursePage;
  