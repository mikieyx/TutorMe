// pages/meetingSearchPage.tsx

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

// Will have the card/table list of meetings. Should have a search function of some sort.
// Otherwise the user can just scroll until they find a meeting for their class.

const meetingSearchPage: React.FC = () => {
  
    return (
      <div>
        <p>Meeting Search Page</p>
        <p>Container with all meetings, simply fetch all meetings from table WITHOUT an
           associated tutee_id (WHERE tutee_id = null). Clicking one will redirect to
           a specific meeting page with those details and the option to accept.
        </p>
      </div>
    );
  };
  
  export default meetingSearchPage;
  