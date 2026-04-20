import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Dashboard/User/Navbar';
import CandidateLogin from './LoginPage/Candidate/candidateLogin';
import ApplyNow from './ApplyNow/Applynow';
import Home from './Dashboard/User/Udash';
import JobHistory from './JobHistory/History';
import Profile from './UserProfile/Profile';
import Settings from './UserProfile/Setting';
import CompanyApplicants from './Dashboard/Company/CompanyApplicant';


function App() {

  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <Router>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<CandidateLogin setShowNavbar={setShowNavbar} />} />
        <Route path="/apply" element={<ApplyNow />} />
        <Route path="/history" element={<JobHistory />} />
        <Route path="/companyApplicants" element={<CompanyApplicants/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;