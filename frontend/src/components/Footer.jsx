import React from 'react';
import '../styles/components/shared.css';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#" className="logo text-white">
            <i className="fa-solid fa-recycle"></i> CampusCycle
          </a>
          <p>Sustainability / Circular Economy / Mission LiFE</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#problem">The Problem</a></li>
            <li><a href="#challenge">The Challenge</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Mission LiFE</a></li>
            <li><a href="#">Circular Economy Guide</a></li>
            <li><a href="#">Campus Sustainability</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:hello@campuscycle.edu">hello@campuscycle.edu</a></li>
            <li>New Delhi, India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; 2026 CampusCycle. All rights reserved. Building a sustainable future.</p>
      </div>
    </footer>
  );
};

export default Footer;