import React from 'react';
import './CustomAlert.css';

const CustomAlert = ({ message, onClose }) => {
  if (!message || !message.show) return null;

  return (
    <div className='custom-alert-overlay'>
      <div className="custom-alert-box">
        <p>{message.message}</p> {/* ✅ Only render the string, not the whole object */}
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default CustomAlert;
