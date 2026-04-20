import { useState, useEffect } from "react";
import "./Applynow.css";
import { useNavigate } from "react-router-dom";

function Companies() {

    const [companies, setCompanies] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const Navigate = useNavigate();
    const isAuth = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("email")
    const [user, setUser] = useState({
        email: '',
        jobId: ''
    });


    useEffect(() => {
        if (!isAuth) {
            Navigate("/");
        }
        else {
            const applyNow = async () => {
                const email = localStorage.getItem("email");

                const response = await fetch(`/applyNow`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("applyNow data:", data);
                    setCompanies(data)
                }
            };

            applyNow();
        }
    }, [isAuth]);


    const [search, setSearch] = useState("");

    const filteredCompanies = companies.filter((company) =>
        company[0].toLowerCase().includes(search.toLowerCase()) ||
        company[1].toLowerCase().includes(search.toLowerCase()) ||
        company[2].toLowerCase().includes(search.toLowerCase())
    );

    const viewJob = (job) => {
        setSelectedJob(job);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedJob(null);
    };


    const apply = async (e) => {
        user.email = email
        user.jobId = selectedJob[9]
        const response = await fetch('/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            alert('Application submitted successfully!');
            setShowPopup(false);
            console.log('apply response:', response);
        } else {
            alert('Failed to submit application. Please try again.');
            console.error('apply error:', response);
        }

    };

    return (
        <div className="companies-container">
            <main className="main-content">
                <h1>Companies</h1>

                <input
                    type="text"
                    placeholder="Search companies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-bar"
                />


                <div className="company-list">
                    {filteredCompanies.map((company, index) => (
                        <div key={index} className="company-card">
                            <h2>{company[0]}</h2>
                            <p><strong>Job Title:</strong> {company[1]}</p>
                            <p><strong>Location:</strong> {company[2]}</p>
                            <p><strong>Last Date to apply:</strong> {company[3]}</p>
                            <p><strong>Job Posted on:</strong> {company[4]}</p>
                            <button className="view-jobs-btn" onClick={() => viewJob(company)}>View Job</button>
                        </div>
                    ))}
                </div>

                {showPopup && (
                    <div className="popup-overlay" onClick={closePopup}>
                        <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                            <div className="popup-header">
                                <h2>{selectedJob[0]}</h2>
                                <button className="close-btn" onClick={closePopup}>×</button>
                            </div>

                            <div className="popup-content">
                                <p><strong>Role:</strong> {selectedJob[1]}</p>
                                <p><strong>Location:</strong> {selectedJob[2]}</p>
                                <p><strong>Description:</strong> {selectedJob[5]}</p>
                                <p><strong>Experience:</strong> {selectedJob[7]}</p>
                                <p><strong>Skills Required:</strong> {selectedJob[8]}</p>
                                <p><strong>Last Date to Apply:</strong> {selectedJob[3]}</p>
                            </div>

                            <div className="popup-actions">
                                <button className="apply-btn" onClick={apply}>Apply Now</button>
                            </div>
                        </div>
                    </div>
                )}
            </main >
        </div >
    );
}

export default Companies;