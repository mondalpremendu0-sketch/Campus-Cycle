import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DashboardNav.css';

function DashboardNav() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>CampusCycle</h2>
        </div>
        
        <div className="nav-items">
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;
