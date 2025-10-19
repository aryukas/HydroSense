import joblib
import os
import numpy as np

MODEL_DIR = os.path.join(os.path.dirname(__file__), "../models")
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))

def predict_rainfall(features, model_name):
    from glob import glob
    # Load selected model
    model_path = os.path.join(MODEL_DIR, f"{model_name}.pkl")
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found: {model_name}")
    model = joblib.load(model_path)

    # Scale features
    X_scaled = scaler.transform(np.array([features]))
    prediction = model.predict(X_scaled)[0]
    return float(prediction)
