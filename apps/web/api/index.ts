import axios from 'axios';
import { API_URL } from './config';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
