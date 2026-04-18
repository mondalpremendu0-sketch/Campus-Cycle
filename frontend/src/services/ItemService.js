/**
 * Item Service Utility
 * Handles all item-related API calls
 */

class ItemService {
  constructor(api) {
    this.api = api;
  }

  /**
   * Get all available items with filters
   */
  async getItems(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.condition) params.append('condition', filters.condition);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.location) params.append('location', filters.location);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const response = await this.api.get(`/items?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Get single item by ID
   */
  async getItemById(id) {
    try {
      const response = await this.api.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Create new item
   */
  async createItem(itemData) {
    try {
      const response = await this.api.post('/items/create', itemData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Get user's items
   */
  async getUserItems() {
    try {
      const response = await this.api.get('/items/user/items');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Update item status
   */
  async updateItemStatus(id, status) {
    try {
      const response = await this.api.patch(`/items/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Update item details
   */
  async updateItem(id, itemData) {
    try {
      const response = await this.api.patch(`/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Delete item
   */
  async deleteItem(id) {
    try {
      const response = await this.api.delete(`/items/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  /**
   * Format price for display
   */
  static formatPrice(price) {
    return `₹${Number(price).toLocaleString('en-IN')}`;
  }

  /**
   * Format date
   */
  static formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Format condition text
   */
  static formatCondition(condition) {
    const conditionMap = {
      'like-new': 'Like New',
      'excellent': 'Excellent',
      'good': 'Good',
      'fair': 'Fair'
    };
    return conditionMap[condition] || condition;
  }

  /**
   * Get condition badge color
   */
  static getConditionColor(condition) {
    const colorMap = {
      'like-new': '#10b981',
      'excellent': '#3b82f6',
      'good': '#f59e0b',
      'fair': '#ef4444'
    };
    return colorMap[condition] || '#6b7280';
  }

  /**
   * Get status badge color
   */
  static getStatusColor(status) {
    const colorMap = {
      'available': '#10b981',
      'reserved': '#f59e0b',
      'sold': '#ef4444'
    };
    return colorMap[status] || '#6b7280';
  }
}

export default ItemService;
