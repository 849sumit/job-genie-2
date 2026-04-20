import { Link } from "react-router-dom";
import "./Navbar.css";

function CompanyNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Job Genie</div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/companyApplicants">Applicants</Link></li>
        <li><Link to="/jobHistory">Job History</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default CompanyNavbar;
