import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CreateItem from '../components/items/CreateItem';
import ItemsList from '../components/items/ItemsList';
import DashboardNav from '../components/DashboardNav';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('create');
  const [itemsRefresh, setItemsRefresh] = useState(false);

  const handleItemCreated = () => {
    setItemsRefresh(!itemsRefresh);
    setActiveTab('list');
  };

  return (
    <div className="dashboard-container">
      <DashboardNav />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome, {user?.username}!</h1>
          <p>Manage your cycle items and listings</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Post New Item
          </button>
          <button
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            My Items
          </button>
        </div>

        <div className="dashboard-panel">
          {activeTab === 'create' && (
            <CreateItem onItemCreated={handleItemCreated} />
          )}
          {activeTab === 'list' && (
            <ItemsList key={itemsRefresh} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
