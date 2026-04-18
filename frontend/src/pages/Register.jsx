import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleSignupButton from '../components/auth/GoogleSignupButton';
import { useState } from 'react';
import './Register.css';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    try {
      setServerError('');
      await registerUser(data);
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-card">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            {serverError && <div className="error-message">{serverError}</div>}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Username must be at least 3 characters' },
                })}
                className={errors.username ? 'input-error' : ''}
              />
              {errors.username && <span className="field-error">{errors.username.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
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

            <div className="form-group">
              <label htmlFor="phoneNo">Phone Number</label>
              <input
                id="phoneNo"
                type="tel"
                placeholder="Enter your phone number"
                {...register('phoneNo', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
                className={errors.phoneNo ? 'input-error' : ''}
              />
              {errors.phoneNo && <span className="field-error">{errors.phoneNo.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                placeholder="Enter your address"
                {...register('address', {
                  required: 'Address is required',
                })}
                className={errors.address ? 'input-error' : ''}
              />
              {errors.address && <span className="field-error">{errors.address.message}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <select
                  id="year"
                  {...register('year', { required: 'Year is required' })}
                  className={errors.year ? 'input-error' : ''}
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
                {errors.year && <span className="field-error">{errors.year.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  id="department"
                  type="text"
                  placeholder="Enter your department"
                  {...register('department', {
                    required: 'Department is required',
                  })}
                  className={errors.department ? 'input-error' : ''}
                />
                {errors.department && <span className="field-error">{errors.department.message}</span>}
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <div className="divider">
            <span>Or sign up with</span>
          </div>

          <GoogleSignupButton />

          <p className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
