import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getPrediction = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/predict`, {
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};
