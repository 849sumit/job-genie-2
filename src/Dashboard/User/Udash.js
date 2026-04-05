import React, {useEffect, useLayoutEffect} from "react";
import "./Udash.css";
// import Navbar from "./Navbar.js";
import { PieChart } from 'react-minimal-pie-chart';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useNavigate } from "react-router-dom";
// 

// Simple static chart data for learning purposes.
const appliedSummary = [
  { title: "Applied", value: 28, color: "#2563eb" },
  { title: "Responses", value: 12, color: "#10b981" },
];

const sectorSummary = [
  { title: "Tech", value: 11, color: "#60a5fa" },
  { title: "Finance", value: 8, color: "#facc15" },
  { title: "Healthcare", value: 5, color: "#f97316" },
  { title: "Education", value: 4, color: "#a78bfa" },
];

const weekActivity = [
  { day: "Mon", applied: 3, responded: 1 },
  { day: "Tue", applied: 4, responded: 2 },
  { day: "Wed", applied: 6, responded: 3 },
  { day: "Thu", applied: 5, responded: 2 },
  { day: "Fri", applied: 7, responded: 3 },
  { day: "Sat", applied: 2, responded: 1 },
  { day: "Sun", applied: 3, responded: 0 },
];

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

  const Navigate = useNavigate();

  const isAuth = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if(!isAuth){
    Navigate("/");
    }
  }, [isAuth]);

  return (
      <div className="udash-container">
        <div className="udash-header">
          <h1>Your Analytics</h1>
          <p>Visual breakdown of applications, responses, and sector activity.</p>
        </div>

        <div className="udash-charts-grid">
          <div className="chart-card">
            <div className="chart-card__header">
              <h2>Applications vs Responses</h2>
            </div>
            <PieWithLegend data={appliedSummary} />
          </div>

          <div className="chart-card">
            <div className="chart-card__header">
              <h2>Applications by Sector</h2>
            </div>
            <PieWithLegend data={sectorSummary} />
          </div>
          <div className="chart-card chart-card--bar">
            <div className="chart-card__header">
              <h2>Last Week Activity</h2>
              <p>Daily applied companies and responses</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weekActivity}>
                <XAxis dataKey="day" />
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
