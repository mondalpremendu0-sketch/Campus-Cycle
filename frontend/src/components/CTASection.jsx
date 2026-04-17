import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/shared.css';
import '../styles/components/CTASection.css';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission or navigate to register
    navigate('/register');
  };

  return (
    <section id="join" className="section cta-section">
      <div className="container text-center">
        <h2 className="text-white">Ready to break the cycle?</h2>
        <p className="text-white subtitle">Join the movement to build a structured system connecting outgoing students with incoming ones.</p>
        <form className="cta-form fade-in" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your academic email address"
            required
            aria-label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-large">Get Involved</button>
        </form>
      </div>
    </section>
  );
};

export default CTASection;