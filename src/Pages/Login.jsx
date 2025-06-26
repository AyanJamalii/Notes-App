import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authapp.css";
import { browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Auth/Firebase';
import { FiEye, FiEyeOff } from "react-icons/fi";
import CustomAlert from "../Components/CustomAlert";
import ProgressBar from "../Components/ProgressBar";

const Login = ({showPassword, setShowPassword, alertMsg, setAlertMsg}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const presistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence; 
            await setPersistence(auth, presistenceType);
            ProgressBar.start()
            await signInWithEmailAndPassword(auth, email, password)
            ProgressBar.done()
            setAlertMsg({show: true, type: 'error', message:"Logged In Successfull."})
            navigate('/dashboard')
          } catch (err){
          ProgressBar.done()
          setAlertMsg({show: true, type: 'error', message:"Invalid Credentials"})            
        }
    }

    const handleForgotPass = async () => {
      if (!email) {
        setAlertMsg({show: true, type: 'error', message:"Please enter email first."})
      }
      try {
        ProgressBar.start()
        await sendPasswordResetEmail(auth, email)
        ProgressBar.done()
        setAlertMsg({show: true, type: 'error', message:"Email sent, Check you spam folder."})
      } catch (err) {
        ProgressBar.done()
        setAlertMsg({show: true, type: 'error', message:"Unable to sent email, Please try again later."})
      }
    }
  return (
    <div className="signup-div">
      <div className="signup-card">
      <div className="decor-circle1"></div>
      <div className="decor-circle2"></div>
        <h1 className="Signup-h1">Welcome Back to <span> YourNoteBook <br />  Login </span>to Continue</h1>
        <div className="input-boxes">
          <form onSubmit={handleLogin}>
          <h3>Email:</h3>
          <input
            type="text"
            placeholder="Enter your email."
            className="inputBox-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            id="emailHelp"
            className="form-text"
            style={{ color: "#6b4d4d", marginLeft: "12px", marginBottom: "5px" }}
          >
            We'll never share your email with anyone else.
          </div>
          <h3 style={{ marginTop: "30px" }} className="passoword-container">Password:</h3>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password."
            className="inputBox-1 password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password-icon" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <FiEyeOff/> : <FiEye />}</span>
          <div className="remeberMe">
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          <label htmlFor="rememberMe" style={{marginLeft: "5px", position: "relative", bottom: "2px"}} className="remeber-label">Remember Me</label> 
          </div>
          <p className="forgot-link" onClick={handleForgotPass}>Forgot Password?</p>          
          <div className="signupBtn-box">
            <button className="signup-btn">Login</button>
          </div>
          </form>
          <p style={{margin: "5px 0px 0px 147px"}} className="new-acc">
            Create new account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
      {alertMsg && alertMsg.show && (
  <CustomAlert message={alertMsg} onClose={() => setAlertMsg({ show: false, type: '', message: '' })} />
)}
    </div>
  );
};

export default Login;
