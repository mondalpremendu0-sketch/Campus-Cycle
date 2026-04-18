/**
 * Google OAuth Service
 * Handles all Google authentication related operations
 */

const GOOGLE_AUTH_BASE_URL = 'http://localhost:3000/api/v1/auth';

class GoogleAuthService {
  /**
   * Initiates Google OAuth flow
   */
  static initiateGoogleLogin() {
    window.location.href = `${GOOGLE_AUTH_BASE_URL}/auth/google`;
  }

  /**
   * Initiates Google OAuth flow for signup
   */
  static initiateGoogleSignup() {
    window.location.href = `${GOOGLE_AUTH_BASE_URL}/auth/google`;
  }

  /**
   * Extract token from URL parameters
   */
  static getTokenFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
  }

  /**
   * Extract user data from URL parameters
   */
  static getUserFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const userString = params.get('user');
    try {
      return userString ? JSON.parse(decodeURIComponent(userString)) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Store auth token in localStorage
   */
  static storeToken(token) {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('tokenTimestamp', new Date().getTime().toString());
    }
  }

  /**
   * Retrieve stored auth token
   */
  static getStoredToken() {
    return localStorage.getItem('token');
  }

  /**
   * Clear auth token from storage
   */
  static clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
  }

  /**
   * Check if token is still valid (not expired)
   */
  static isTokenValid() {
    const token = this.getStoredToken();
    if (!token) return false;

    const timestamp = localStorage.getItem('tokenTimestamp');
    if (!timestamp) return false;

    // Check if token is older than 7 days (604800000 ms)
    const age = new Date().getTime() - parseInt(timestamp);
    return age < 7 * 24 * 60 * 60 * 1000;
  }

  /**
   * Get authorization header for API requests
   */
  static getAuthHeader() {
    const token = this.getStoredToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Validate the callback URL parameters
   */
  static validateCallback() {
    const token = this.getTokenFromUrl();
    if (!token) {
      throw new Error('No authentication token received');
    }
    return {
      token,
      user: this.getUserFromUrl(),
    };
  }
}

export default GoogleAuthService;
