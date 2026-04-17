import React from 'react';
import '../styles/components/shared.css';
import '../styles/components/GoogleAuthButton.css';

const GoogleAuthButton = ({ label = 'Continue with Google' }) => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/v1/user/auth/google';
  };

  return (
    <button type="button" className="google-auth-button" onClick={handleGoogleLogin}>
      <span className="google-icon">
        <i className="fa-brands fa-google"></i>
      </span>
      <span>{label}</span>
    </button>
  );
};

export default GoogleAuthButton;
