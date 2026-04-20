import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useState, useEffect, use } from "react";

function Profile() {
    const Navigate = useNavigate()
    const [editLocationPopUp, setEditLocationPopUp] = useState(false)
    const [editPhonePopUp, setEditPhonePopUp] = useState(false)
    const [editEducationPopUp, setEditEducationPopUp] = useState(false)
    const [editNoOfEmployeesPopUp, setEditNoOfEmployeesPopup] = useState(false)
    const [active, setActive] = useState("profile")
    const [location, setLocation] = useState()
    const [education, setEducation] = useState()
    const [phone, setPhone] = useState()
    const [profileData, setProfileData] = useState([])
    const [editParams, setEditParams] = useState({
        email: '',
        changedField: '',
        value: ''
    });
    const [resumeId, setResumeId] = useState();
    const [aboutUs, setAboutUs] = useState();
    const [noOfEmployees, setNoOfEmployees] = useState();

    const [file, setFile] = useState(null);
    const email = localStorage.getItem('email')
    const isAuth = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!isAuth) {
            Navigate("/");
        }
        else {
            const getProfileData = async () => {

                const response = await fetch(`/profile?email=${encodeURIComponent(email)}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Profile data:", data);
                    setProfileData(data)
                }
            };
            getProfileData();
        }
    }, [isAuth]);

    const handleProfileClick = () => {
        setActive('profile')
        Navigate('/profile')
    };

    const handleSettingsClick = () => {
        Navigate('/settings')
        setActive("setting")
    };

    const editLocation = () => {
        setEditLocationPopUp(true)
        editParams.changedField = 'Location'
    };
    const editPhone = () => {
        setEditPhonePopUp(true)
        editParams.changedField = 'Phone'
    };
    const editEducation = () => {
        setEditEducationPopUp(true)
        editParams.changedField = 'Education'
    };

    const editNoOfEmployees = () => {
        setEditNoOfEmployeesPopup(true)
        editParams.changedField = 'NoOfEmployees'
    };

    const closePopup = () => {
        setEditLocationPopUp(false)
        setEditEducationPopUp(false)
        setEditPhonePopUp(false)
        setEditNoOfEmployeesPopup(false)
    };

    const edit = async (e) => {
        editParams.email = email
        if (editParams.changedField == 'Location') {
            editParams.value = location
        }
        else if (editParams.changedField == 'Phone') {
            editParams.value = phone
        }
        else if (editParams.changedField == 'Education') {
            editParams.value = education
        }
        else if(editParams.changedField == 'NoOfEmployees') {
            editParams.value = noOfEmployees
        }
        const response = await fetch('/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editParams),
        });
        if (response.ok) {
            console.log(response)
            alert('Edit Sucessfully !!!')
        }
        else {
            alert('Failed to Edit. Please try again')
        }
    }

    const handleUpload = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            alert('Uploaded Sucessfully !!!')
            setResumeId(data.id);
        }
        else {
            alert('Failed to Upload. Please try again')
        }
    }

    const handleDownload = async (e) => {
        console.log(resumeId)
        window.open(`http://localhost:3000/download/${resumeId}`);
    }


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
                {profileData.map((data, index) => (
                    <div>
                        <div className="profile-info">
                            <img
                                src="profile_logo.jpg"
                                alt="Profile"
                                className="profile-pic"
                            />
                            <div className="profile-details">
                                <h2>{data[1]}</h2>
                                <p>{data[2]}</p>
                                <p>{data[6]} | {data[4]}</p>
                            </div>
                        </div>

                        <div className="divider">
                            {/* Personal Information */}
                            <section className="card">
                                <h3>Personal Information</h3>
                                <hr></hr>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <strong>Location:</strong> {data[4]}
                                        <span className="edit-link" onClick={editLocation}>Edit</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Phone:</strong> {data[3]}
                                        <span className="edit-link" onClick={editPhone}>Edit</span>
                                    </div>
                                    {role === 'candidate' ?
                                        <><div className="info-item">
                                            <strong>Education:</strong> {data[7]}
                                            <span className="edit-link" onClick={editEducation}>Edit</span>
                                        </div><div className="info-item-1">
                                                <strong>Experience:</strong> {data[8]}
                                            </div></>
                                        :
                                        <><div className="info-item-1">
                                            <strong>Operating since:</strong> {data[13]}
                                        </div><div className="info-item-1">
                                                <strong>website Link:</strong> {data[12]}
                                            </div>
                                            <div className="info-item-1">
                                                <strong>Number of Employees:</strong> {data[11]}
                                                <span className="edit-link" onClick={editNoOfEmployees}>Edit</span>
                                            </div>
                                        </>}
                                </div>
                            </section>

                            {role == 'candidate' ?
                                <section className="card">
                                    <h3>Resume</h3>
                                    <hr></hr>
                                    <div className="resume-section">
                                        <div className="resume-buttons">
                                            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                                            <button className="upload-btn" onClick={handleUpload}>Upload</button>
                                            <button className="download-btn" onClick={handleDownload}>Download</button>
                                        </div>
                                    </div>
                                </section>
                                :
                                <section className="card">
                                    <h3>About Us</h3>
                                    <hr></hr>
                                    <div className="resume-section">
                                        <div className="resume-buttons">
                                            <input className="aboutbox" type="paragraph" onChange={(e) => setAboutUs(e.target.value)} />
                                            <button className="download-btn">Submit</button>
                                        </div>
                                    </div>
                                </section>
                            }

                        </div>

                        {role === 'candidate' ?
                            <div className="card" >
                                <div className="info-item">
                                    <h3>My Skills</h3>
                                    <span className="edit-link">Add</span>
                                </div>
                                <hr></hr>
                                <div className="skills">
                                    <span className="skill">ReactJS</span>
                                    <span className="skill">JavaScript</span>
                                    <span className="skill">HTML</span>
                                    <span className="skill">CSS</span>
                                    <span className="skill">MySQL</span>
                                </div>
                            </div>
                            : <div></div>
                        }
                    </div>
                ))}

            </main>

            {editLocationPopUp && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            Edit Location
                            <button className="close-btn" onClick={closePopup}>×</button>
                        </div>

                        <div className="popup-actions">
                            New Location
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <button className="apply-btn" onClick={edit}>Edit</button>
                        </div>
                    </div>
                </div>
            )}

            {editPhonePopUp && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            Edit Phone no.
                            <button className="close-btn" onClick={closePopup}>×</button>
                        </div>

                        <div className="popup-actions">
                            New phone no.
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <button className="apply-btn" onClick={edit}>Edit</button>
                        </div>
                    </div>
                </div>
            )}

            {editEducationPopUp && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            Edit Education
                            <button className="close-btn" onClick={closePopup}>×</button>
                        </div>

                        <div className="popup-actions">
                            Education
                            <input
                                type="text"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            />
                            <button className="apply-btn" onClick={edit}>Edit</button>
                        </div>
                    </div>
                </div>
            )}

            {editNoOfEmployeesPopUp && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            Edit Number of Employees
                            <button className="close-btn" onClick={closePopup}>×</button>
                        </div>

                        <div className="popup-actions">
                            Updated No. of Employees
                            <input
                                type="text"
                                value={noOfEmployees}
                                onChange={(e) => setNoOfEmployees(e.target.value)}
                            />
                            <button className="apply-btn" onClick={edit}>Edit</button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
}


export default Profile;