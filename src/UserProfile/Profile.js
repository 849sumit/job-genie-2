import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useState } from "react";

function Profile() {
    const Navigate = useNavigate()
    const [active, setActive] = useState("profile")
    const handleProfileClick = () => {
        setActive('profile')
        Navigate('/profile')
    };

    const handleSettingsClick = () => {
        Navigate('/settings')
        setActive("setting")
    };

    return (
        <div className="profile-container">
            <aside className="sidebar">
                <ul>
                    <li className={active === "profile" ? "active" : ""} onClick={handleProfileClick}>Profile</li>
                    <li className={active === "setting" ? "active" : ""} onClick={handleSettingsClick}>settings</li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="profile-main">
                <div className="profile-info">
                    <img
                        src="https://via.placeholder.com/120"
                        alt="Profile"
                        className="profile-pic"
                    />
                    <div className="profile-details">
                        <h2>John Doe</h2>
                        <p>johndoe@example.com</p>
                        <p>Frontend Developer | Seattle, USA</p>
                    </div>
                </div>

                <div className="divider">
                    {/* Personal Information */}
                    <section className="card">
                        <h3>Personal Information</h3>
                        <hr></hr>
                        <div className="info-grid">
                            <div className="info-item">
                                <strong>Location:</strong> Seattle, USA
                                <span className="edit-link">Edit</span>
                            </div>
                            <div className="info-item">
                                <strong>Phone:</strong> +1 234 567 8900
                                <span className="edit-link">Edit</span>
                            </div>
                            <div className="info-item">
                                <strong>Education:</strong> Bachelor's in Computer Science
                                <span className="edit-link">Edit</span>
                            </div>
                        </div>
                    </section>

                    {/* Resume Section */}
                    <section className="card">
                        <h3>Resume</h3>
                        <hr></hr>
                        <div className="resume-section">
                            <span>resume.pdf</span>
                            <div className="resume-buttons">
                                <button className="upload-btn">Upload</button>
                                <button className="download-btn">Download</button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Skills Section */}
                <section className="card">
                    <h3>My Skills</h3>
                    <div className="skills">
                        <span className="skill">ReactJS</span>
                        <span className="skill">JavaScript</span>
                        <span className="skill">HTML</span>
                        <span className="skill">CSS</span>
                        <span className="skill">MySQL</span>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Profile;