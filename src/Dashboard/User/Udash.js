import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Udash.css";
import { PieChart } from 'react-minimal-pie-chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";
import CompanyDash from "../Company/Company";

function PieWithLegend({ data }) {
  return (
    <div className="pie-chart-side">
      <PieChart
        data={data}
        style={{ width: '180px', height: '180px' }}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: '6px',
          fontFamily: 'sans-serif',
          fill: '#ffffff',
        }}
        labelPosition={55}
      />

      <div className="pie-chart-side__legend">
        {data.map((item) => (
          <div key={item.title} className="pie-chart-side__legend-item">
            <span className="pie-chart-side__legend-swatch" style={{ background: item.color }} />
            <span>{item.title}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Udash() {

  const [appliedSummary, setAppliedSummary] = useState([]);
  const [summary, setSummary] = useState([])
  const [weekActivity, setWeekActivity] = useState([])
  const [companyDashboard, setCompanyDashboard] = useState(false)

  const Navigate = useNavigate();

  const isAuth = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!isAuth) {
      Navigate("/");
    }
    else {
      const dashboard = async () => {
        const email = localStorage.getItem("email");
        if (role === 'candidate') {

          const response = await fetch(`/dashboard?email=${encodeURIComponent(email)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Dashboard data:", data);
            setAppliedSummary(data.appliedVsResponse);
            setSummary(data.ApplicationsBySector);
            setWeekActivity(data.lastWeekActivity);
          }
        }
        else{
          setCompanyDashboard(true)
        }
      };

      dashboard();
    }
  }, [isAuth]);

  if(companyDashboard){
    return <CompanyDash />
  }


  return (
    <div className="udash-container">
      <div className="udash-header">
        <h1>Your Analytics</h1>
        <p>Visual breakdown of applications, responses, and sector activity.</p>
      </div>

      <div className="udash-charts-grid">
        <div style={{ display: "flex", gap: "1.25rem" }}>
          <div className="chart-card-1">
            <div className="chart-card__header">
              <h2>Applications vs Responses</h2>
            </div>
            <PieWithLegend data={appliedSummary} />
          </div>

          <div className="chart-card-2">
            <div className="chart-card__header">
              <h2>Applications by Sector</h2>
            </div>
            <PieWithLegend data={summary} />
          </div>
        </div>
        <div className="chart-card chart-card--bar">
          <div className="chart-card__header">
            <h2>Last Week Activity</h2>
            <p>Daily applied companies and responses</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weekActivity}>
              <XAxis dataKey="date" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Bar dataKey="applied" fill="#2563eb" />
              <Bar dataKey="responded" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Udash;
