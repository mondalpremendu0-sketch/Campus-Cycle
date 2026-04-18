import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
  });

  // Add token to headers
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          const response = await api.get('/users/profile');
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const register = async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      const { token: newToken, user: newUser } = response.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      const { token: newToken, user: newUser } = response.data;
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/users/logout');
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Google OAuth login - initiates the OAuth flow
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  // Google OAuth signup - same flow as login
  const signupWithGoogle = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google';
  };

  // Set auth data from Google callback
  const setAuthFromGoogle = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        loginWithGoogle,
        signupWithGoogle,
        setAuthFromGoogle,
        isAuthenticated: !!user,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
