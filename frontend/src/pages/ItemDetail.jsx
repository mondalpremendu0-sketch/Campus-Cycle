import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ItemService from '../services/ItemService';
import './ItemDetail.css';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, api } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);

  const itemService = new ItemService(api);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await itemService.getItemById(id);
      setItem(data.item);
    } catch (err) {
      setError('Failed to load item details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      await itemService.updateItemStatus(id, newStatus);
      setItem({ ...item, status: newStatus });
      alert(`Item marked as ${newStatus}`);
    } catch (err) {
      alert('Failed to update item status');
      console.error(err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.deleteItem(id);
        alert('Item deleted successfully');
        navigate('/dashboard');
      } catch (err) {
        alert('Failed to delete item');
        console.error(err);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-item/${id}`);
  };

  const isOwner = user && item && item.seller && (typeof item.seller === 'string' ? user._id === item.seller : user._id === item.seller._id);

  if (loading) {
    return (
      <div className="item-detail-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-detail-container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => navigate('/browse')}>
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="item-detail-container">
        <div className="error-state">
          <p>Item not found</p>
          <button onClick={() => navigate('/browse')}>
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <div className="item-detail-wrapper">
        {/* Image Section */}
        <div className="detail-image-section">
          {item.image && (
            <img src={item.image} alt={item.title} className="detail-image" />
          )}
          <div className="image-badges">
            <span className={`condition-badge condition-${item.condition}`}>
              {ItemService.formatCondition(item.condition)}
            </span>
            <span className={`status-badge status-${item.status}`}>
              {item.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="detail-content-section">
          <div className="detail-header">
            <h1>{item.title}</h1>
            <p className="detail-posted">
              Posted on {ItemService.formatDate(item.createdAt)}
            </p>
          </div>

          <div className="price-section">
            <span className="price">{ItemService.formatPrice(item.price)}</span>
          </div>

          <div className="detail-meta">
            <div className="meta-item">
              <strong>Condition:</strong>
              <span>{ItemService.formatCondition(item.condition)}</span>
            </div>
            <div className="meta-item">
              <strong>Location:</strong>
              <span>{item.location}</span>
            </div>
            <div className="meta-item">
              <strong>Status:</strong>
              <span className={`status-${item.status}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          {/* Seller Info */}
          <div className="seller-section">
            <h3>Seller Information</h3>
            <div className="seller-info">
              <div className="seller-details">
                <p className="seller-name"><strong>{item.seller?.username}</strong></p>
                <p className="seller-contact">
                  📞 {item.contactPhone}
                </p>
                <p className="seller-email">
                  ✉️ {item.seller?.email}
                </p>
                {item.seller?.address && (
                  <p className="seller-address">
                    📍 {item.seller.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Owner Controls */}
          {isOwner && (
            <div className="owner-controls">
              <h3>Manage Item</h3>
              <div className="status-controls">
                <button
                  className="status-btn available"
                  onClick={() => handleStatusChange('available')}
                  disabled={statusUpdating || item.status === 'available'}
                >
                  Mark Available
                </button>
                <button
                  className="status-btn reserved"
                  onClick={() => handleStatusChange('reserved')}
                  disabled={statusUpdating || item.status === 'reserved'}
                >
                  Mark Reserved
                </button>
                <button
                  className="status-btn sold"
                  onClick={() => handleStatusChange('sold')}
                  disabled={statusUpdating || item.status === 'sold'}
                >
                  Mark Sold
                </button>
              </div>

              <div className="action-buttons">
                <button className="edit-btn" onClick={handleEdit}>
                  ✏️ Edit Item
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  🗑️ Delete Item
                </button>
              </div>
            </div>
          )}

          {/* Contact Buyer */}
          {!isOwner && item.status === 'available' && (
            <div className="contact-section">
              <p>Interested in this cycle?</p>
              <a
                href={`tel:${item.contactPhone}`}
                className="contact-btn phone-btn"
              >
                📞 Call {item.seller?.username}
              </a>
              <a
                href={`mailto:${item.seller?.email}?subject=Interested in ${item.title}`}
                className="contact-btn email-btn"
              >
                ✉️ Send Email
              </a>
            </div>
          )}

          {item.status !== 'available' && !isOwner && (
            <div className="unavailable-notice">
              <p>This item is currently {item.status}.</p>
            </div>
          )}
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate('/browse')}>
        ← Back to Browse
      </button>
    </div>
  );
}

export default ItemDetail;
