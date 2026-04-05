import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';

function SignUp() {
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [role, setRole] = useState('candidate');
    const [person, setPerson] = useState({
        name: '',
        contactNo: '',
        address: '',
        email: '',
        password: '',
        role: 'candidate'
    });

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const signUpSubmit = async (e) => {

        if (validateForm()) {
            person.name = name;
            person.contactNo = contact;
            person.address = address;
            person.email = email;
            person.password = password;
            person.role = role;
            console.log(person);
            try {
                const response = await fetch('/signUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(person),
                });
            }
            catch (error) {
                setErrors({ submit: 'SignUp failed. Please try again.' });
            }
        }
    };


    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1 className='signup-title'>Create Account</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact" className="form-label">Contact</label>
                        <input
                            type="text"
                            id="contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className={`form-input ${errors.address ? 'input-error' : ''}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`form-input ${errors.address ? 'input-error' : ''}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                        />
                    </div>

                    <label htmlFor="role" className="form-label">Select Role</label>

                    <div className="radio-group">
                        <input type="radio" id="candidate" name="role" value="candidate" checked={role === "candidate"}  onChange={(e) => setRole(e.target.value)} />
                        <label htmlFor="candidate" className="radio-label">Candidate</label>
                        <input type="radio" id="company" name="role" value="company" checked={role === "company"} onChange={(e) => setRole(e.target.value)} />
                        <label htmlFor="company" className="radio-label">Company</label>
                    </div>
                    <div>
                        <button type="submit" className="submit-button" onClick={signUpSubmit}>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>

        </div>

    );
}

export default SignUp;