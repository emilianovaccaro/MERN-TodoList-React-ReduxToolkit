import axios from 'axios';

const API_URL = '/api/users/';

// Register user service
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

// Login user service
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}


// Logout service - delete localStorage user info
const logout = async () => {
  localStorage.removeItem('user');
};



const authService = {
  register,
  login,
  logout
}

export default authService;