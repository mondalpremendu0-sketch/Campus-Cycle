import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/shared.css';
import '../styles/components/Register.css';
import GoogleAuthButton from './GoogleAuthButton';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/register', data);
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-splash">
          <span className="eyebrow">CampusCycle</span>
          <h1>Launch your campus cycle profile</h1>
          <p>Register quickly to join the sustainable student marketplace, save money, and keep useful campus essentials moving forward.</p>

          <ul className="feature-list">
            <li><i className="fa-solid fa-check-circle"></i><span>Fast onboarding with student-friendly fields.</span></li>
            <li><i className="fa-solid fa-shield-check"></i><span>Secure account setup with encrypted passwords.</span></li>
            <li><i className="fa-solid fa-repeat"></i><span>Reuse and reconnect across batches every semester.</span></li>
          </ul>
        </div>

        <div className="register-form-wrapper">
          <div className="register-form-header">
            <h2>Create your account</h2>
            <p>Use your campus details to register and start sharing or buying resources.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="register-fields">
              <div className="register-field">
                <label>Username</label>
                <input
                  {...register('username', { required: 'Username is required' })}
                  type="text"
                  placeholder="Your full name"
                />
                {errors.username && <p className="register-error">{errors.username.message}</p>}
              </div>
              <div className="register-field">
                <label>Email address</label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="you@college.edu"
                />
                {errors.email && <p className="register-error">{errors.email.message}</p>}
              </div>
              <div className="register-field">
                <label>Password</label>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  placeholder="Choose a strong password"
                />
                {errors.password && <p className="register-error">{errors.password.message}</p>}
              </div>
              <div className="register-field">
                <label>Phone number</label>
                <input
                  {...register('phoneNo', { required: 'Phone number is required' })}
                  type="text"
                  placeholder="+91 98765 43210"
                />
                {errors.phoneNo && <p className="register-error">{errors.phoneNo.message}</p>}
              </div>
              <div className="register-field field-full">
                <label>Address</label>
                <input
                  {...register('address', { required: 'Address is required' })}
                  type="text"
                  placeholder="Hostel block / dorm / campus address"
                />
                {errors.address && <p className="register-error">{errors.address.message}</p>}
              </div>
              <div className="register-field">
                <label>Year</label>
                <input
                  {...register('year', { required: 'Year is required' })}
                  type="text"
                  placeholder="Third year"
                />
                {errors.year && <p className="register-error">{errors.year.message}</p>}
              </div>
              <div className="register-field">
                <label>Department</label>
                <input
                  {...register('department', { required: 'Department is required' })}
                  type="text"
                  placeholder="Engineering / Science / Arts"
                />
                {errors.department && <p className="register-error">{errors.department.message}</p>}
              </div>
            </div>

            <div className="register-submit">
              <button type="submit">Create your account</button>
            </div>

            <p className="register-alternate">
              Already registered?{' '}
              <Link to="/login">Login here</Link>
            </p>
          </form>
          <div className="oauth-divider">or register with email</div>
          <GoogleAuthButton label="Continue with Google" />

        </div>
        
      </div>
    </div>
  );
};

export default Register;