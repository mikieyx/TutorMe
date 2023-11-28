// pages/index.tsx

import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import logo from "../assests/logo.svg";

const Home: React.FC = () => {
  return (
    <div>
      <img src="../assests/logo.svg" alt="" />
      <p className="text-6xl font-bold ">TutorMe</p>

      <button onClick={(event) => (window.location.href = "/aboutUsPage")}>
        About Us
      </button>
      <button onClick={(event) => (window.location.href = "/loginPage")}>
        Login
      </button>

      <div>
        <p>
          Elevate Your Learning Journey With Tailored Mentorship! lol hello
          shobuj noob
        </p>
      </div>
      <div>
        <button onClick={(event) => (window.location.href = "/signupPage")}>
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Home;