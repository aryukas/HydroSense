import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend

export const getMetrics = async () => {
  const res = await axios.get(`${BASE_URL}/metrics`);
  return res.data;
};

export const getPrediction = async (inputData) => {
  const res = await axios.post(`${BASE_URL}/predict`, inputData);
  return res.data.predictions;
};
