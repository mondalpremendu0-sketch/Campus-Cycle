import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ItemService from '../services/ItemService';
import './Browse.css';

function Browse() {
  const { api } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, limit: 12 });

  // Filter states
  const [search, setSearch] = useState('');
  const [condition, setCondition] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const itemService = new ItemService(api);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (page = 1) => {
    try {
      setLoading(true);
      setError('');

      const filters = {
        search: search || undefined,
        condition: condition || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        location: location || undefined,
        page,
        limit: 12
      };

      const data = await itemService.getItems(filters);
      setItems(data.items);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to load items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchItems(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCondition('');
    setMinPrice('');
    setMaxPrice('');
    setLocation('');
    fetchItems(1);
  };

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  if (error && items.length === 0) {
    return (
      <div className="browse-error">
        <p>{error}</p>
        <button onClick={() => fetchItems()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1>Browse Cycles</h1>
        <p>Find great deals on quality cycles</p>
      </div>

      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search cycles by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
        <button
          type="button"
          className="filter-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          ☰ Filters
        </button>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Condition</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                <option value="">All Conditions</option>
                <option value="like-new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Min Price (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Max Price (₹)</label>
              <input
                type="number"
                placeholder="99999"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Campus location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-actions">
            <button className="apply-btn" onClick={() => fetchItems(1)}>
              Apply Filters
            </button>
            <button className="reset-btn" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Items Grid */}
      {loading && items.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading cycles...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>No cycles found matching your criteria.</p>
          <button onClick={handleResetFilters}>Clear Filters</button>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>Showing {items.length} of {pagination.total} cycles</p>
          </div>

          <div className="items-grid">
            {items.map((item) => (
              <div
                key={item._id}
                className="item-card"
                onClick={() => handleItemClick(item._id)}
              >
                <div className="item-image-wrapper">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="item-image" />
                  )}
                  <span className={`condition-badge condition-${item.condition}`}>
                    {ItemService.formatCondition(item.condition)}
                  </span>
                </div>

                <div className="item-card-content">
                  <h3>{item.title}</h3>
                  <p className="item-description">{item.description.substring(0, 80)}...</p>

                  <div className="item-meta">
                    <span className="price">{ItemService.formatPrice(item.price)}</span>
                    <span className="location">📍 {item.location}</span>
                  </div>

                  <div className="item-seller">
                    <p><strong>{item.seller?.username}</strong></p>
                    <p className="seller-contact">{item.contactPhone}</p>
                  </div>

                  <p className="posted-date">
                    Posted {ItemService.formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                disabled={pagination.page === 1}
                onClick={() => fetchItems(pagination.page - 1)}
                className="page-btn"
              >
                ← Previous
              </button>

              <div className="page-info">
                Page {pagination.page} of {pagination.pages}
              </div>

              <button
                disabled={pagination.page === pagination.pages}
                onClick={() => fetchItems(pagination.page + 1)}
                className="page-btn"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Browse;
