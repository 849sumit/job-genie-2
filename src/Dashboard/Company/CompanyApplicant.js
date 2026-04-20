import { useState, useEffect } from "react";
import "./CompanyApplicant.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../User/Navbar";

function CompanyApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [update, setUpdate] = useState({
    userId: '',
    jobId: '',
    status: ''
  })

  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuthenticated");
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      const fetchApplicants = async () => {
        const response = await fetch(`/companyApplicants?email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Applicants data:", data);
          setApplicants(data);
        }
      };

      fetchApplicants();

    }
  }, [isAuth]);

  const statusUpdate = async (value) => {
    update.userId = selectedApplicant.userId;
    update.jobId = selectedApplicant.jobId;
    update.status = value;
    const response = await fetch(`/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update)
    });

    if (response.ok) {
      alert('Updated Successfully!')
      setShowPopup(false);
    }
  };



  const filteredApplicants = applicants.filter((applicant) =>
    applicant.title.toLowerCase().includes(search.toLowerCase()) ||
    applicant.userName.toLowerCase().includes(search.toLowerCase()) ||
    email.toLowerCase().includes(search.toLowerCase())
  );

  const viewApplicant = (applicant) => {
    setSelectedApplicant(applicant);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedApplicant(null);
  };

  const Status = (value) => {
    statusUpdate(value)
  }

  return (
    <div className="company-applicants-container1">
      <Navbar />
      <main className="main-content1">
        <h1>Applicants</h1>
        <input
          type="text"
          placeholder="Search applicants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar1"
        />

        <div className="applicant-list1">
          {filteredApplicants.map((applicant, index) => (
            <div key={index} className="applicant-card1">
              <h2>{applicant.name}</h2>
              <p><strong>Role Applied:</strong> {applicant.title}</p>
              <p><strong>Name:</strong> {applicant.userName}</p>
              <p><strong>Applied On:</strong> {applicant.appliedDate}</p>
              <button className="view-btn" onClick={() => viewApplicant(applicant)}>View Details</button>
            </div>
          ))}
        </div>

        {showPopup && (
          <div className="popup-overlay1" onClick={closePopup}>
            <div className="popup-card1" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header1">
                <h2>{selectedApplicant.userName}</h2>
                <button className="close-btn1" onClick={closePopup}>×</button>
              </div>

              <div className="popup-content1">
                <p><strong>Role Applied:</strong> {selectedApplicant.title}</p>
                <p><strong>Email:</strong> {selectedApplicant.email}</p>
                <p><strong>Experience:</strong> {selectedApplicant.experience}</p>
                <p><strong>Skills:</strong> {selectedApplicant.skills}</p>
                <p><strong>Preferred Location:</strong> {selectedApplicant.preferredLocation}</p>
                <p><strong>Applied On:</strong> {selectedApplicant.appliedDate}</p>
              </div>
              <div>
                <button className="apply-btn1" onClick={() => Status('reviewed')}>Reviewed</button>
                <button className="apply-btn2" onClick={() => Status('accepted')}>Accepted</button>
                <button className="apply-btn3" onClick={() => Status('rejected')}>Rejected</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CompanyApplicants;
