import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/shared.css';
import '../styles/components/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    document.getElementById('problem').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="badge">Mission LIFE Aligned</span>
          <h1>The Circular <br /><span className="accent-text">Campus Economy</span></h1>
          <p>Every semester, valuable items are discarded while incoming students buy them brand new. It's time to capture the environmental and economic value sitting inside our campus gates.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>Get Started</button>
            <button className="btn btn-secondary" onClick={handleLearnMore}>Learn More</button>
          </div>
          <div className="stats">
            <div className="stat-item">
              <h3>100k+</h3>
              <p>Items Wasted</p>
            </div>
            <div className="stat-item">
              <h3>₹50M+</h3>
              <p>Value Lost</p>
            </div>
            <div className="stat-item">
              <h3>0</h3>
              <p>Structured Systems</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="/assets/hero.png" alt="Students exchanging books and items on a green sustainable college campus" loading="lazy" />
        </div>
      </div>
    </header>
  );
};

export default Hero;