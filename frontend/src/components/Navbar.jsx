import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <Leaf className="logo-icon" />
          <span className="logo-text">Campus<span className="accent">Cycle</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <a href="#problem">The Problem</a>
          <a href="#mission">Why Us</a>
          <a href="#how-it-works">How it Works</a>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-primary nav-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary nav-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <a href="#problem" onClick={() => setIsOpen(false)}>The Problem</a>
          <a href="#mission" onClick={() => setIsOpen(false)}>Why Us</a>
          <a href="#how-it-works" onClick={() => setIsOpen(false)}>How it Works</a>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
