import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/shared.css';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleJoinMovement = () => {
    // Navigate to register or open modal
    window.location.href = '/register';
  };

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <i className="fa-solid fa-recycle"></i> CampusCycle
        </Link>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#problem">The Problem</a></li>
          <li><a href="#challenge">Our Mission</a></li>
          <li><button className="btn-nav" onClick={handleJoinMovement}>Join Movement</button></li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;