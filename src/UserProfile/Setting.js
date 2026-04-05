import React from "react";
import "./setting.css";

function Settings() {
  return (
    <div className="settings-page">
      <h2>Account Settings</h2>
      <button>Logout</button>
      <button>Change Password</button>
      <button>Manage Notifications</button>
    </div>
  );
}

export default Settings;