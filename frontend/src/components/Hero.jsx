import { ArrowRight, RefreshCcw } from 'lucide-react';
import heroImg from '../assets/hero_circular.png';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="badge">Mission LiFE Initiative</div>
          <h1 className="hero-title">
            Reimagine Campus <span className="highlight">Resources.</span>
          </h1>
          <p className="hero-subtitle">
            Don't abandon it. Pass it on. 
            Connect with incoming juniors to buy, sell, or donate textbooks, lab coats, and electronics seamlessly.
          </p>
          <div className="hero-actions">
            <a href="#get-started" className="btn btn-primary hero-btn">
              Start Trading <ArrowRight className="btn-icon" size={20} />
            </a>
            <a href="#how-it-works" className="btn btn-secondary hero-btn">
              Learn How
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <h3>500+</h3>
              <p>Items Rescued</p>
            </div>
            <div className="stat-card">
              <h3>₹50k+</h3>
              <p>Student Savings</p>
            </div>
            <div className="stat-card">
              <h3>300kg</h3>
              <p>Waste Reduced</p>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-circle main-circle">
            <RefreshCcw className="floating-icon icon-1" size={48} />
          </div>
          <div className="visual-circle secondary-circle"></div>
          <img src={heroImg} alt="Students exchanging electronics and books" className="hero-img" />
        </div>
      </div>
    </section>
  );
}
