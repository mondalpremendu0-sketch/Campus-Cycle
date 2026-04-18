import { Leaf, Globe, Mail, MessageCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <Leaf className="logo-icon" />
              <span className="logo-text">Campus<span className="accent">Circular</span></span>
            </div>
            <p>Reducing waste and saving students money through localized circular economies.</p>
            <div className="social-links">
              <a href="#" aria-label="Community"><MessageCircle size={20} /></a>
              <a href="#" aria-label="Contact"><Mail size={20} /></a>
              <a href="#" aria-label="Website"><Globe size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Platform</h4>
            <ul>
              <li><a href="#how-it-works">How it Works</a></li>
              <li><a href="#problem">The Problem</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><a href="#mission">Mission LiFE</a></li>
              <li><a href="#">Sustainability Guides</a></li>
              <li><a href="#">Campus Ambassadors</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Trust & Safety</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CampusCircular. Built for Mission LiFE Initiative.</p>
        </div>
      </div>
    </footer>
  );
}
