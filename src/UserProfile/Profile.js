import React from "react";
import "./Profile.css";

function Profile() {
    return (
        <div className="profile-container">
            <aside className="sidebar">
                <ul>
                    <li className="active">Profile</li>
                    <li className="active">settings</li>
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

                {/* Account Settings */}
                <section className="card">
                    <h3>Account Settings</h3>
                    <div className="account-settings">
                        <p><strong>Password:</strong> ••••••••</p>
                        <button className="change-btn">Change Password</button>
                        <button className="logout-btn">Log Out</button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Profile;