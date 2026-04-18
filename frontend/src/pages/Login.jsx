import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import { useState } from 'react';
import './Login.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    try {
      setServerError('');
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {serverError && <div className="error-message">{serverError}</div>}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Please enter a valid email',
                  },
                })}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="field-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="field-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <GoogleLoginButton />

          <p className="auth-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
