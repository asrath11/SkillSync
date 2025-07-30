import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
interface signinData {
  email: string;
  password: string;
}
interface signupData extends signinData {
  fullName: string;
  confirmPassword: string;
}

export const signup = async (userData: signupData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data.user;
};

export const signin = async (userData: signinData) => {
  const response = await axios.post(`${API_URL}/auth/signin`, userData);
  console.log(response);
  return response.data.user;
};

export const signout = async () => {
  const response = await axios.post(`${API_URL}/auth/signout`);
  console.log(response);
  return response.data.user;
};

export const getUser = async () => {
  const response = await axios.get(`${API_URL}/auth/profile`);
  return response.data.user;
};

export const test = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};
