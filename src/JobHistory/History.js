// // JobHistory.js
// import React from 'react';

// function JobHistory() {
//   // Example data — in a real app this would come from your backend or database
//   const jobApplications = [
//     { company: "Microsoft", position: "Frontend Developer", date: "2026-03-15", status: "Interview Scheduled" },
//     { company: "Google", position: "Backend Engineer", date: "2026-02-28", status: "Rejected" },
//     { company: "Amazon", position: "Full Stack Developer", date: "2026-01-20", status: "Offer Received" }
//   ];

//   return (
//     <div>
//       <h2>Job History</h2>
//       <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>Company</th>
//             <th>Position</th>
//             <th>Date Applied</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobApplications.map((job, index) => (
//             <tr key={index}>
//               <td>{job.company}</td>
//               <td>{job.position}</td>
//               <td>{job.date}</td>
//               <td>{job.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default JobHistory;

import React, { useEffect, useState } from "react";
import "./History.css";

function JobHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Example: Fetch job history from backend API
    fetch("http://localhost:5000/api/job-history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  return (
    <div className="history-container">
      <h2>Job History</h2>
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
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.appliedDate}</td>
                <td>{job.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default JobHistory;