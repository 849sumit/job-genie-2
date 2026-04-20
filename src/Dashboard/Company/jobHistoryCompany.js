import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./jobHistoryCompany.css"

function JobHistoryCompany() {
    const [history, setHistory] = useState([]);
    const [showPopup, setshowPopup] = useState(false)
    const [title, setTitle] = useState()
    const [description, setdescription] = useState()
    const [location, setlocation] = useState()
    const [salary, setsalary] = useState()
    const [education, seteducation] = useState()
    const [experience, setexperience] = useState()
    const [skills, setskills] = useState()
    const [lastDate, setlastDate] = useState()
    const [postDetails, setPostDetails] = useState({
        email:'',
        title: '',
        description: '',
        location: '',
        salary: '',
        experience: '',
        education: '',
        skills: '',
        lastDate: ''
    });
    const Navigate = useNavigate();

    const isAuth = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("role")

    useEffect(() => {
        if (!isAuth) {
            Navigate("/");
        }
        else {
            const jobHistory = async () => {
                const email = localStorage.getItem("email");

                const response = await fetch(`/jobhistoryCompany?email=${encodeURIComponent(email)}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("JobHistory data:", data);
                    setHistory(data)
                }
            };
            jobHistory();
        }
    }, [isAuth]);

    const NewJob = () => {
        setshowPopup(true)
    }

    const Post = async () => {
        const email = localStorage.getItem("email");
        postDetails.email = email;
        postDetails.description = description;
        postDetails.education = education;
        postDetails.experience = experience;
        postDetails.lastDate = lastDate;
        postDetails.location = location;
        postDetails.salary = salary;
        postDetails.skills = skills;
        postDetails.title = title;

        const response = await fetch(`/NewJob`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postDetails)
        });

        if (response.ok) {
            alert('New Job Posted!')
            setshowPopup(false)
        }
    };


    const closePopup = () => {
        setshowPopup(false);
    };


    return (
        <div className="history-container1">
            <h1>Job History</h1>
            {history.length === 0 ? (
                <p>No job history found.</p>
            ) : (
                <div>
                    <button className="apply-btn-1" onClick={NewJob}>Post New Job</button>
                    <table className="history-table1">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Posted On</th>
                                <th>Last date</th>
                                <th>Experience</th>
                                <th>Candidates Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((job, index) => (
                                <tr key={index}>
                                    <td>{job[0]}</td>
                                    <td>{job[1]}</td>
                                    <td>{job[2]}</td>
                                    <td>{job[3]}</td>
                                    <td>{job[4]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                        <div className="popup-header">
                            <h2>Posting New Job</h2>
                            <button className="close-btn" onClick={closePopup}>×</button>
                        </div>

                        <div className="popup-content">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Job Title</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`form-input`}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    className={`form-input`}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">location</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={location}
                                    onChange={(e) => setlocation(e.target.value)}
                                    className={`form-input`}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">salary</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={salary}
                                    onChange={(e) => setsalary(e.target.value)}
                                    className={`form-input`}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">education</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={education}
                                    onChange={(e) => seteducation(e.target.value)}
                                    className={`form-input`}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">experience</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={experience}
                                    onChange={(e) => setexperience(e.target.value)}
                                    className={`form-input`}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">skills</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={skills}
                                    onChange={(e) => setskills(e.target.value)}
                                    className={`form-input`}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Last Date to Apply</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={lastDate}
                                    onChange={(e) => setlastDate(e.target.value)}
                                    className={`form-input`}
                                />
                            </div>
                        </div>

                        <div className="popup-actions">
                            <button className="apply-btn" onClick={Post}>Post</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default JobHistoryCompany;