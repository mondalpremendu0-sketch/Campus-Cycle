import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ItemService from '../../services/ItemService';
import './ItemsList.css';

function ItemsList() {
  const { api } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemService = new ItemService(api);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await itemService.getUserItems();
      setItems(response.items || []);
    } catch (err) {
      setError('Failed to load items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.deleteItem(itemId);
        setItems(items.filter(item => item._id !== itemId));
        alert('Item deleted successfully');
      } catch (err) {
        alert('Failed to delete item');
        console.error(err);
      }
    }
  };

  const handleEdit = (itemId) => {
    navigate(`/edit-item/${itemId}`);
  };

  const handleViewDetails = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      await itemService.updateItemStatus(itemId, newStatus);
      setItems(items.map(item => 
        item._id === itemId ? { ...item, status: newStatus } : item
      ));
      alert(`Item marked as ${newStatus}`);
    } catch (err) {
      alert('Failed to update item status');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading your items...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>You haven't posted any items yet.</p>
        <p className="empty-hint">Post your first cycle to get started!</p>
      </div>
    );
  }

  return (
    <div className="items-list">
      <h2>Your Listings ({items.length})</h2>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            {item.image && (
              <div className="item-image">
                <img src={item.image} alt={item.title} />
                <span className={`status-badge status-${item.status}`}>
                  {item.status.toUpperCase()}
                </span>
              </div>
            )}
            <div className="item-content">
              <h3>{item.title}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-meta">
                <span className="price">{ItemService.formatPrice(item.price)}</span>
                <span className={`condition condition-${item.condition}`}>
                  {ItemService.formatCondition(item.condition)}
                </span>
              </div>
              <div className="item-info">
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Phone:</strong> {item.contactPhone}</p>
                <p><strong>Status:</strong> <span className="status">{item.status}</span></p>
                <p><strong>Posted:</strong> {ItemService.formatDate(item.createdAt)}</p>
              </div>

              <div className="item-status-controls">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className="status-select"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div className="item-actions">
                <button
                  className="view-btn"
                  onClick={() => handleViewDetails(item._id)}
                >
                  👁️ View
                </button>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item._id)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsList;
