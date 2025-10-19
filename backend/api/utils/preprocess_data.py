# backend/scripts/preprocess_data.py

import pandas as pd
import os
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime

# ----------------------------
# Paths
# ----------------------------
RAW_DIR = "data/raw"  # folder with raw CSVs
PROCESSED_DIR = "data/processed"  # folder to save processed data
SCALER_PATH = "backend/models/scaler.pkl"

os.makedirs(PROCESSED_DIR, exist_ok=True)

# ----------------------------
# Helper Functions
# ----------------------------
def add_month_season(df):
    """Extract Month and Season from Date column"""
    df["Date"] = pd.to_datetime(df["Date"])
    df["Month"] = df["Date"].dt.month
    df["Season"] = df["Month"].apply(
        lambda x: "Winter" if x in [12, 1, 2] else
                  "Spring" if x in [3, 4, 5] else
                  "Summer" if x in [6, 7, 8] else
                  "Autumn"
    )
    return df

def normalize_column(df, col_name):
    """Normalize a numeric column to 0-1 range"""
    scaler = MinMaxScaler()
    df[col_name + "_Normalized"] = scaler.fit_transform(df[[col_name]])
    return df, scaler

# ----------------------------
# Load latest raw CSV
# ----------------------------
files = [f for f in os.listdir(RAW_DIR) if f.endswith(".csv")]
if not files:
    raise FileNotFoundError(f"No raw CSV files found in {RAW_DIR}")
latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(RAW_DIR, f)))
data_path = os.path.join(RAW_DIR, latest_file)
print(f"📂 Using raw dataset: {data_path}")

df = pd.read_csv(data_path)

# ----------------------------
# Basic Cleaning
# ----------------------------
df.dropna(subset=["Date", "Mean"], inplace=True)
df["Mean"] = pd.to_numeric(df["Mean"], errors="coerce")
df.dropna(subset=["Mean"], inplace=True)

# ----------------------------
# Feature Engineering
# ----------------------------
df = add_month_season(df)
df, scaler = normalize_column(df, "Mean")

# ----------------------------
# Save processed data
# ----------------------------
processed_file = f"processed_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
df.to_csv(os.path.join(PROCESSED_DIR, processed_file), index=False)
print(f"✅ Processed data saved to: {os.path.join(PROCESSED_DIR, processed_file)}")

# Save the scaler for later use in predictions
import joblib
os.makedirs(os.path.dirname(SCALER_PATH), exist_ok=True)
joblib.dump(scaler, SCALER_PATH)
print(f"💾 Scaler saved to: {SCALER_PATH}")
