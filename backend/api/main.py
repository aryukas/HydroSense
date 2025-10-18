from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
import pandas as pd

# === CONFIG ===
MODELS_DIR = "../models"
METRICS_FILE = os.path.join(MODELS_DIR, "metrics_summary_20251017_185009.csv")

# === Load Models ===
models = {}
for f in os.listdir(MODELS_DIR):
    if f.endswith(".pkl"):
        model_name = f.replace(".pkl", "")
        models[model_name] = joblib.load(os.path.join(MODELS_DIR, f))

# === FastAPI App ===
app = FastAPI(title="HydroSense API", version="1.0")

# === Input Schema ===
class InputData(BaseModel):
    Mean_Normalized: float
    # You can add more features later, e.g., Month, NDVI, Temp, etc.

# === ROUTES ===
@app.get("/")
def read_root():
    return {"message": "Welcome to HydroSense API! Use /predict endpoint to get rainfall predictions."}

@app.get("/metrics")
def get_metrics():
    if os.path.exists(METRICS_FILE):
        df = pd.read_csv(METRICS_FILE)
        return df.to_dict(orient="records")
    else:
        raise HTTPException(status_code=404, detail="Metrics file not found")

@app.post("/predict")
def predict(data: InputData):
    input_df = pd.DataFrame([data.dict()])
    predictions = {}
    for name, model in models.items():
        try:
            pred = model.predict(input_df)[0]
            predictions[name] = float(pred)
        except Exception as e:
            predictions[name] = f"Error: {str(e)}"
    return {"predictions": predictions}
