import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authapp.css";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Auth/Firebase';
import { FiEye, FiEyeOff } from "react-icons/fi";
import CustomAlert from "../Components/CustomAlert";
import ProgressBar from "../Components/ProgressBar";

const Signup = ({ showPassword, setShowPassword, alertMsg, setAlertMsg }) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim() || !confirmEmail.trim() || !password.trim()) {
      setAlertMsg({ show: true, type: 'error', message: "Please fill all the fields." });
      return;
    }

    if (email !== confirmEmail) {
      setEmailError("Emails didn't match.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    try {
      ProgressBar.start();
      await createUserWithEmailAndPassword(auth, email, password);
      ProgressBar.done();
      navigate('/dashboard'); // No alert for success
    } catch (err) {
      ProgressBar.done();
      setAlertMsg({ show: true, type: 'error', message: err.message });
    }
  };

  return (
    <div className="signup-div">
      <div className="signup-card">
        <div className="decor-circle1"></div>
        <div className="decor-circle2"></div>
        <h1 className="Signup-h1">
          Welcome to <span> Xyz </span>, <br /><span> Sign Up</span> to Start.
        </h1>
        <div className="input-boxes">
          <form onSubmit={handleSignup}>
            <h3>Email:</h3>
            <input
              type="text"
              placeholder="Enter your email."
              className="inputBox-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-text" style={{ color: "white", marginLeft: "12px", marginBottom: "5px" }}>
              We'll never share your email with anyone else.
            </div>

            <h3 style={{ marginTop: "25px" }}>Confirm Email:</h3>
            <input
              type="text"
              placeholder="Confirm your email."
              className="inputBox-1"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            {emailError && (
              <div style={{ color: 'red', marginTop: '8px', fontSize: '0.9rem', marginLeft: '12px' }}>
                {emailError}
              </div>
            )}

            <h3 style={{ marginTop: "30px" }} className="password-container">Password:</h3>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password."
              className="inputBox-1 password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password-icon-signup" onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            <div className="signupBtn-box">
              <button className="signup-btn">Sign Up</button>
            </div>
          </form>
          <p style={{ margin: "5px 0 0 141px" }} className="new-accc">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      {alertMsg && alertMsg.show && (
        <CustomAlert message={alertMsg} onClose={() => setAlertMsg({ show: false, message: '', type: '' })} />
      )}
    </div>
  );
};

export default Signup;
