import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// eslint-disable-next-line`
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Components/PrivateRoute'
function App() {

  const [showPassword, setShowPassword] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  return (
      <Routes>
        <Route path="/login" element={<Login showPassword={showPassword} setShowPassword={setShowPassword} alertMsg={alertMsg} setAlertMsg={setAlertMsg} />} />
        <Route path="/" element={<Login showPassword={showPassword} setShowPassword={setShowPassword} alertMsg={alertMsg} setAlertMsg={setAlertMsg} />} />
        <Route path="/signup" element={<Signup showPassword={showPassword} setShowPassword={setShowPassword} alertMsg={alertMsg} setAlertMsg={setAlertMsg} />} />
        <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard alertMsg={alertMsg} setAlertMsg={setAlertMsg} />
      </PrivateRoute>
    } />



      </Routes>
  );
}

export default App;
