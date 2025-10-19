from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import os
import numpy as np
import logging
import glob
import pandas as pd

# -----------------------------------------------------
# 🌧️ HydroSense - Advanced Rainfall Prediction API
# -----------------------------------------------------
app = FastAPI(
    title="HydroSense API",
    version="2.2",
    description="""
    🌾 HydroSense provides rainfall predictions based on environmental 
    indicators like NDVI, temperature, humidity, wind, soil moisture, past precipitation, and seasonal data.
    """
)

# -----------------------------------------------------
# 🧩 Enable CORS for Frontend Integration
# -----------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------
# ⚙️ Logging Setup
# -----------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - [%(levelname)s] - %(message)s",
)
logger = logging.getLogger(__name__)

# -----------------------------------------------------
# 🧠 Load all models in models folder
# -----------------------------------------------------
MODEL_DIR = os.path.join(os.path.dirname(__file__), "../models")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")

models = {}
for file in glob.glob(os.path.join(MODEL_DIR, "*.pkl")):
    model_name = os.path.basename(file).replace(".pkl", "")
    if model_name != "scaler":
        try:
            models[model_name] = joblib.load(file)
            logger.info(f"✅ Loaded model: {model_name}")
        except Exception as e:
            logger.error(f"❌ Failed to load model {model_name}: {e}")

# Load scaler
try:
    scaler = joblib.load(SCALER_PATH)
    logger.info("✅ Scaler loaded successfully")
except Exception as e:
    logger.error(f"❌ Failed to load scaler: {e}")
    scaler = None

# -----------------------------------------------------
# 🧾 Input Data Schema
# -----------------------------------------------------
class InputData(BaseModel):
    NDVI: float = Field(..., ge=-1.0, le=1.0)
    Temperature: float = Field(..., description="Temperature in °C")
    Humidity: float = Field(..., ge=0, le=100)
    WindSpeed: float = Field(..., ge=0)
    SoilMoisture: float = Field(..., ge=0, le=1)
    PrecipitationPrev: float = Field(..., ge=0)
    Season: int = Field(..., ge=1, le=4, description="Season index (1-4)")

# -----------------------------------------------------
# 🌦️ Predict Endpoint with dynamic model selection
# -----------------------------------------------------
@app.post("/predict")
def predict(data: InputData, model_name: str = Query("BEST_MODEL_RandomForest")):
    if model_name not in models:
        raise HTTPException(status_code=404, detail=f"Model '{model_name}' not found. Available: {list(models.keys())}")
    if scaler is None:
        raise HTTPException(status_code=500, detail="Scaler not loaded. Check backend configuration.")

    try:
        features = np.array([[data.NDVI, data.Temperature, data.Humidity, data.WindSpeed, data.SoilMoisture, data.PrecipitationPrev, data.Season]])
        features_scaled = scaler.transform(features)
        prediction = models[model_name].predict(features_scaled)[0]

        logger.info(f"📊 Prediction using {model_name}: {data.dict()} → {prediction:.2f}")
        return {
            "PredictedRainfall_mm": round(float(prediction), 2),
            "ModelUsed": model_name,
            "Status": "Success ✅"
        }
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# -----------------------------------------------------
# 📊 Metrics Endpoint
# -----------------------------------------------------
@app.get("/metrics")
def get_metrics():
    metrics_files = glob.glob(os.path.join(MODEL_DIR, "metrics_summary_*.csv"))
    if not metrics_files:
        raise HTTPException(status_code=404, detail="No metrics summaries found.")
    latest_file = max(metrics_files, key=os.path.getctime)
    metrics_df = pd.read_csv(latest_file, index_col=0)
    return {"metrics_file": os.path.basename(latest_file), "metrics": metrics_df.to_dict(orient="index")}

# -----------------------------------------------------
# 🏠 Root Endpoint
# -----------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "🌧️ HydroSense API is running successfully!",
        "version": "2.2",
        "available_endpoints": ["/", "/predict", "/metrics"],
        "available_models": list(models.keys())
    }

# -----------------------------------------------------
# 🧪 Health Check Endpoint
# -----------------------------------------------------
@app.get("/health")
def health_check():
    return {
        "models_loaded": list(models.keys()),
        "scaler_loaded": scaler is not None,
        "status": "Healthy" if models and scaler else "Error"
    }
