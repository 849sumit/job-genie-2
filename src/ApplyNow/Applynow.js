import React, { useState } from "react";
import "./Applynow.css";

function Companies() {
    const companies = [
        { name: "Google Inc.", location: "California, USA", jobs: 120, followers: "12K" },
        { name: "Amazon", location: "Seattle, USA", jobs: 95, followers: "146K" },
        { name: "Facebook", location: "Menlo Park, USA", jobs: 72, followers: "92K" },
        { name: "Salesforce", location: "San Francisco, USA", jobs: 60, followers: "77K" },
        { name: "Stripe", location: "Dublin, Ireland", jobs: 40, followers: "68K" },
        { name: "Oracle", location: "Austin, USA", jobs: 55, followers: "78K" },
    ];

    const [search, setSearch] = useState("");

    const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="companies-container">
            <aside className="sidebar">
                <h3>Filters</h3>
                <ul>
                    <li><input type="checkbox" /> Tech Companies</li>
                    <li><input type="checkbox" /> Remote Friendly</li>
                    <li><input type="checkbox" /> Internship</li>
                    <li><input type="checkbox" /> Full Time</li>
                </ul>
            </aside>

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
                            <h2>{company.name}</h2>
                            <p><strong>Location:</strong> {company.location}</p>
                            <p><strong>Jobs Available:</strong> {company.jobs}</p>
                            <p><strong>Followers:</strong> {company.followers}</p>
                            <button className="view-jobs-btn">View Jobs</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Companies;