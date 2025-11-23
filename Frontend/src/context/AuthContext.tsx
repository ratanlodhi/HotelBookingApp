import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:8000';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true); // Start with loading true to prevent premature checks

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Verify token and get user info
        await fetchUser();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/user/');
      setUser(response.data);
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login/', {
        username,
        password,
      });
      
      const { access, user: userData } = response.data;
      
      if (!access) {
        console.error('No access token received');
        setLoading(false);
        return false;
      }
      
      setToken(access);
      setUser(userData);
      localStorage.setItem('token', access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      setLoading(false);
      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      setLoading(false);
      return false;
    }
  };

    const register = async (userData: RegisterData): Promise<boolean> => {
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/register/', userData);
            const { access, user: newUser } = response.data;
            
            setToken(access);
            setUser(newUser);
            localStorage.setItem('token', access);
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            
            setLoading(false);
            return true;
        } catch (error: any) {
            console.error('Registration failed:', error);
            
            // Handle specific error responses
            if (error.response?.data) {
                const errorData = error.response.data;
                if (errorData.username) {
                    alert(`Username error: ${errorData.username[0]}`);
                } else if (errorData.email) {
                    alert(`Email error: ${errorData.email[0]}`);
                } else if (errorData.password) {
                    alert(`Password error: ${errorData.password[0]}`);
                } else {
                    alert(`Registration failed: ${JSON.stringify(errorData)}`);
                }
            } else {
                alert('Registration failed. Please try again.');
            }
            
            setLoading(false);
            return false;
        }
    };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};