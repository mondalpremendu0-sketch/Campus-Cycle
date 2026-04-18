import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './GoogleCallback.css';

function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuthFromGoogle } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userString = searchParams.get('user');

        if (!token) {
          setError('Authentication failed: No token received');
          setLoading(false);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Parse user data from URL
        const user = userString ? JSON.parse(decodeURIComponent(userString)) : null;

        // Set auth data in context
        setAuthFromGoogle(token, user);

        // Store token
        localStorage.setItem('token', token);

        // Redirect to dashboard
        setTimeout(() => navigate('/dashboard'), 1500);
      } catch (err) {
        console.error('Google callback error:', err);
        setError('An error occurred during authentication');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, setAuthFromGoogle]);

  if (error) {
    return (
      <div className="google-callback-container">
        <div className="callback-card error-card">
          <div className="error-icon">⚠️</div>
          <h2>Authentication Error</h2>
          <p>{error}</p>
          <p className="redirect-message">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="google-callback-container">
        <div className="callback-card loading-card">
          <div className="spinner"></div>
          <h2>Completing Authentication</h2>
          <p>Please wait while we authenticate you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="google-callback-container">
      <div className="callback-card success-card">
        <div className="success-icon">✓</div>
        <h2>Authentication Successful</h2>
        <p>Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}

export default GoogleCallback;
