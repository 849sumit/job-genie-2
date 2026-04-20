import './Navbar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role")

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar_logo">
          <img src="/logojob2.png" alt="Job Genie Logo" className="navbar_logo_img" />
        </div>
        <span className="navbar__title">Job Genie</span>
      </div>
      <nav className="navbar__nav" aria-label="Primary">
        <button className="navbar__button" type="button" onClick={() => navigate('/')}>
          Home
        </button>
        {role === "candidate" ? (
           <button className="navbar__button" type="button" onClick={() => navigate('/apply')}>
          Apply Now
        </button>
        ) : (
           <button className="navbar__button" type="button" onClick={() => navigate('/companyApplicants')}>
          Applications
        </button>
        )}
      
        <button className="navbar__button" type="button" onClick={() => navigate('/history')}>
          Job History
        </button>
        <button className="navbar__button" type="button" onClick={() => navigate('/profile')}>
          Profile
        </button>
      </nav>
    </header>
  );
}

export default Navbar;