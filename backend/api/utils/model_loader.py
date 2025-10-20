import os
import joblib

# Get base directory dynamically
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # goes up from utils/ to api/
MODELS_DIR = os.path.join(BASE_DIR, "models")

# Define path to scaler
scaler_path = os.path.join(MODELS_DIR, "scaler.pkl")

try:
    scaler = joblib.load(scaler_path)
    print("✅ Scaler loaded successfully!")
except Exception as e:
    print(f"❌ Failed to load scaler: {e}")
