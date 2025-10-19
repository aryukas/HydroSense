import os
import joblib
import glob
import pandas as pd

MODELS_DIR = os.path.join(os.path.dirname(__file__), "../../models")

def load_models():
    """Load all models and scaler into a dictionary."""
    models = {}
    scaler_path = os.path.join(MODELS_DIR, "scaler.pkl")
    try:
        scaler = joblib.load(scaler_path)
    except Exception:
        scaler = None

    model_files = glob.glob(os.path.join(MODELS_DIR, "*.pkl"))
    for mf in model_files:
        name = os.path.basename(mf).replace(".pkl", "")
        try:
            models[name] = joblib.load(mf)
        except Exception:
            continue

    return models, scaler

def load_metrics():
    """Load latest metrics summary CSV."""
    files = glob.glob(os.path.join(MODELS_DIR, "metrics_summary_*.csv"))
    if not files:
        return None
    latest_file = max(files, key=os.path.getctime)
    return pd.read_csv(latest_file, index_col=0)
