import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__logo" aria-hidden="true">✨</div>
        <span className="navbar__title">Job Genie</span>
      </div>
      <nav className="navbar__nav" aria-label="Primary">
        <button className="navbar__button" type="button">Home</button>
        <button className="navbar__button" type="button">Apply Now</button>
        <button className="navbar__button" type="button">Job History</button>
        <button className="navbar__button" type="button">Profile</button>
      </nav>
    </header>
  );
}

export default Navbar;
