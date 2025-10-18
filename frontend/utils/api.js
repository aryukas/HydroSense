import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000"; // Your FastAPI backend

export const predictRainfall = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, payload);
    return response.data;
  } catch (error) {
    console.error("Prediction API error:", error);
    throw error;
  }
};
