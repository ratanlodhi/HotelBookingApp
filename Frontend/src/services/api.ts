import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include Authorization header
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header added with token');
    } else {
      console.log('No token found in localStorage');
    }
    
    console.log('Making request to:', config.url);
    console.log('Request method:', config.method);
    console.log('Request data:', config.data);
    console.log('Authorization header:', config.headers.Authorization ? 'Present' : 'Missing');
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    console.log('Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status);
    console.error('Response error data:', error.response?.data);
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/api/auth/login/', { username, password }),
  
  register: (userData: any) =>
    api.post('/api/auth/register/', userData),
  
  getUser: () =>
    api.get('/api/auth/user/'),
};

// Hotels API calls
export const hotelsAPI = {
  getHotels: (params?: any) =>
    api.get('/api/hotels/', { params }),
  
  getHotel: (id: number) =>
    api.get(`/api/hotels/${id}/`),
  
  searchHotels: (searchParams: any) =>
    api.get('/api/hotels/search/', { params: searchParams }),
  
  createHotel: (hotelData: any) =>
    api.post('/api/hotels/', hotelData),
  
  updateHotel: (id: number, hotelData: any) =>
    api.put(`/api/hotels/${id}/`, hotelData),
  
  deleteHotel: (id: number) =>
    api.delete(`/api/hotels/${id}/`),
};

// Rooms API calls
export const roomsAPI = {
  getRooms: (hotelId: number) =>
    api.get('/api/rooms/', { params: { hotel: hotelId } }),
  
  getRoom: (id: number) =>
    api.get(`/api/rooms/${id}/`),
  
  createRoom: (roomData: any) =>
    api.post('/api/rooms/', roomData),
  
  updateRoom: (id: number, roomData: any) =>
    api.put(`/api/rooms/${id}/`, roomData),
  
  deleteRoom: (id: number) =>
    api.delete(`/api/rooms/${id}/`),
};

// Bookings API calls
export const bookingsAPI = {
  getBookings: () =>
    api.get('/api/bookings/'),
  
  getBooking: (id: number) =>
    api.get(`/api/bookings/${id}/`),
  
  createBooking: (bookingData: any) =>
    api.post('/api/bookings/', bookingData),
  
  updateBooking: (id: number, bookingData: any) =>
    api.put(`/api/bookings/${id}/`, bookingData),
  
  cancelBooking: (id: number) =>
    api.delete(`/api/bookings/${id}/`),
};

// Payments API calls
export const paymentsAPI = {
  createPaymentIntent: (amount: number) =>
    api.post('/api/payments/create-intent/', { amount }),
  
  confirmPayment: (paymentData: any) =>
    api.post('/api/payments/confirm/', paymentData),
};

export default api;
