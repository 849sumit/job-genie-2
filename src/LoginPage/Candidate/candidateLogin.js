import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './candidateLogin.css';
import SignUp from '../SignUp/SignUp';

function CandidateLogin({ setShowNavbar }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useLayoutEffect(() => {
    setShowNavbar(false);
  }, [])

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setShowNavbar(true)
        setIsLoading(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('email', email);
        localStorage.setItem('role', data)
      }
      else {
        setErrors({ submit: 'Login failed. Please check your credentials.' });
      }

      console.log('Login attempt:', { email, password, rememberMe });

      setEmail('');
      setPassword('');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    }
  };

  if (showSignUp) {
    return <SignUp />;
  }

  if (isLoading) {
    setShowNavbar(true);
    navigate("/home");
  }

  return (
    <div className="candidate-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Job Genie</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-footer">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password" className="forgot-password-link">
              Forgot password?
            </a>
          </div>

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="signup-section">
          <p className="signup-text">
            Don't have an account? <a href="#" onClick={() => setShowSignUp(true)} className="signup-link">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CandidateLogin;
