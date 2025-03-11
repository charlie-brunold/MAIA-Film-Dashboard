import axios from 'axios';

// Define base URL for API - in a real app, use environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Script Writer API calls
export const generateScriptSuggestions = async (prompt) => {
  try {
    const response = await api.post('/ai/script-suggestions', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error generating script suggestions:', error);
    throw error;
  }
};

// Storyboard API calls
export const generateStoryboardFrame = async (scriptContent) => {
  try {
    const response = await api.post('/ai/storyboard-frame', { scriptContent });
    return response.data;
  } catch (error) {
    console.error('Error generating storyboard frame:', error);
    throw error;
  }
};

// Budget API calls
export const analyzeBudget = async (budgetData) => {
  try {
    const response = await api.post('/analysis/budget', budgetData);
    return response.data;
  } catch (error) {
    console.error('Error analyzing budget:', error);
    throw error;
  }
};

// ROI Analysis API calls
export const predictROI = async (filmData) => {
  try {
    const response = await api.post('/analysis/roi-prediction', filmData);
    return response.data;
  } catch (error) {
    console.error('Error predicting ROI:', error);
    throw error;
  }
};

export default api;