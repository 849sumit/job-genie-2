import React, { useEffect, useState } from "react";
import "./Company.css";
import { PieChart } from "react-minimal-pie-chart";
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from "recharts";
import { useNavigate } from "react-router-dom";

function PieWithLegend({ data }) {
  return (
    <div className="pie-chart-side">
      <PieChart
        data={data}
        style={{ width: "180px", height: "180px" }}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: "6px",
          fontFamily: "sans-serif",
          fill: "#ffffff",
        }}
        labelPosition={55}
      />
      <div className="pie-chart-side__legend">
        {data.map((item) => (
          <div key={item.title} className="pie-chart-side__legend-item">
            <span
              className="pie-chart-side__legend-swatch"
              style={{ background: item.color }}
            />
            <span>
              {item.title}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompanyDash() {
  const [applicationSummary, setApplicationSummary] = useState([]);
  const [roleSummary, setRoleSummary] = useState([]);
  const [weekActivity, setWeekActivity] = useState([]);

  const navigate = useNavigate();
  const isAuth = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      const fetchCompanyDashboard = async () => {
        const companyEmail = localStorage.getItem("email");

        const response = await fetch(
          `/companyDashboard?email=${encodeURIComponent(companyEmail)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Company Dashboard data:", data);
          setApplicationSummary(data.appliedVsAccepted);
          setRoleSummary(data.applicationsByRole);
          setWeekActivity(data.lastWeekHiringActivity);
        }
      };

      fetchCompanyDashboard();
    }
  }, [isAuth]);

  return (
    <div className="companydash-container">
      <div className="companydash-header">
        <h1>Company Analytics</h1>
        <p>Insights into candidate applications, acceptances, and hiring trends.</p>
      </div>

      <div className="companydash-charts-grid">
        <div style={{ display: "flex", gap: "1.25rem" }}>
          <div className="chart-card-1">
            <div className="chart-card__header">
              <h2>Applicants vs Accepted</h2>
            </div>
            <PieWithLegend data={applicationSummary} />
          </div>

          <div className="chart-card-2">
            <div className="chart-card__header">
              <h2>Applications by Role</h2>
            </div>
            <PieWithLegend data={roleSummary} />
          </div>
        </div>

        <div className="chart-card chart-card--bar">
          <div className="chart-card__header">
            <h2>Last Week Hiring Activity</h2>
            <p>Daily applications and acceptances</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weekActivity}>
              <XAxis dataKey="date" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Bar dataKey="applied" fill="#2563eb" />
              <Bar dataKey="accepted" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CompanyDash;
