import React, { useEffect, useState } from "react";
import "./History.css";
import { useNavigate } from "react-router-dom";
import JobHistoryCompany from "../Dashboard/Company/jobHistoryCompany";

function JobHistory() {
  const [history, setHistory] = useState([]);
  const [openCompany, setopenCompany] = useState(false)
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

        const response = await fetch(`/jobhistory?email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("JobHistory data:", data);
          setHistory(data)
        }
      };
      if (role == 'candidate') {
        jobHistory();
      }
      else {
        setopenCompany(true)
      }
    }
  }, [isAuth]);

  if (openCompany) {
    return <JobHistoryCompany />
  }

    return (
      <div className="history-container">
        <h1>Job History</h1>
        {history.length === 0 ? (
          <p>No job history found.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((job, index) => (
                <tr key={index}>
                  <td>{job[0]}</td>
                  <td>{job[1]}</td>
                  <td>{job[2]}</td>
                  <td>{job[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }


export default JobHistory;