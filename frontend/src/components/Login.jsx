import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/shared.css';
import '../styles/components/Login.css';
import GoogleAuthButton from './GoogleAuthButton';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', data);
      if (response.data.success) {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-splash">
          <span className="eyebrow">CampusCycle</span>
          <h1>Welcome back.</h1>
          <p>Log in to manage your campus items, connect with students, and build a sustainable reuse network.</p>
          <ul className="feature-list">
            <li><i className="fa-solid fa-lightbulb"></i><span>Fast access to campus marketplace tools.</span></li>
            <li><i className="fa-solid fa-lock"></i><span>Secure login with password protection.</span></li>
            <li><i className="fa-solid fa-users"></i><span>Join the student community with one account.</span></li>
          </ul>
        </div>

        <div className="login-form-wrapper">
          <div className="login-form-header">
            <h2>Sign in to your account</h2>
            <p>Enter your campus email and password to continue.</p>
          </div>
          <GoogleAuthButton label="Continue with Google" />
          <div className="oauth-divider">or sign in with email</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-fields">
              <div className="login-field">
                <label>Email address</label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="you@college.edu"
                />
                {errors.email && <p className="login-error">{errors.email.message}</p>}
              </div>
              <div className="login-field">
                <label>Password</label>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="login-error">{errors.password.message}</p>}
              </div>
            </div>

            <div className="login-actions">
              <button type="submit">Login</button>
            </div>

            <p className="login-footer">
              New to CampusCycle?{' '}
              <Link to="/register">Create account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;