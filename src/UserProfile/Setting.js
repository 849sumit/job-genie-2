import React, { useState } from "react";
import "./Setting.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Settings() {
  const [active, setActive] = useState("profile")
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [user, setUser] = useState({
    email: email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!user.oldPassword) tempErrors.oldPassword = "Old password is required";
    if (!user.newPassword) tempErrors.newPassword = "New password is required";
    if (user.newPassword.length < 6)
      tempErrors.newPassword = "Password must be at least 6 characters";
    if (user.newPassword !== user.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleProfileClick = () => {
    setActive('profile')
    navigate('/profile')
  };

  const handleSettingsClick = () => {
    setActive("setting")
    navigate('/settings')
  };

  const logout = () => {
    navigate('/')
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("Password Updated Successfully")
      }
      else if (response.status == 500) {
        alert("old password is not correct")
      }
    }
    catch (error) {
      setErrors({ submit: 'SignUp failed. Please try again.' });
    }

  };

  return (
    <div className="setting-container">
      <aside className="sidebar">
        <ul>
          <li className={active === "profile" ? "active" : ""} onClick={handleProfileClick}>Profile</li>
          <li className={active === "setting" ? "active" : ""} onClick={handleSettingsClick}>settings</li>
        </ul>
      </aside>
      <section className="setting-card">
        <h2>Update Password</h2>
        <form onSubmit={handleUpdatePassword}>
          <div className="card-1">
            <label>Email</label>
            <input type="email" name="email" value={user.email} readOnly />

            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={user.oldPassword}
              onChange={handleChange}
            />
            {errors.oldPassword && <p className="error">{errors.oldPassword}</p>}

            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && <p className="error">{errors.newPassword}</p>}

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <button type="submit" className="update-btn">Update Password</button>
            <button type="submit" className="log-btn" onClick={logout}>Log Out</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Settings;