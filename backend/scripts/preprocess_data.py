import pandas as pd
import os
from datetime import datetime

# Paths
RAW_DIR = "data/raw"
PROCESSED_DIR = "data/processed"

# Ensure directory exists
os.makedirs(PROCESSED_DIR, exist_ok=True)

# Find latest raw file
files = [f for f in os.listdir(RAW_DIR) if f.endswith(".csv")]
latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(RAW_DIR, f)))
raw_path = os.path.join(RAW_DIR, latest_file)

print(f"📂 Using raw dataset: {raw_path}")

# Load data
df = pd.read_csv(raw_path)

# --- Cleaning ---
print("🧹 Cleaning data...")
df = df.dropna()  # remove missing values

# --- Feature Engineering ---
print("🧠 Adding features...")
if "Year" in df.columns:
    df["Date"] = pd.to_datetime(df["Year"], errors='coerce')
    df["Month"] = df["Date"].dt.month
    df["Season"] = df["Month"].map({
        12: "Winter", 1: "Winter", 2: "Winter",
        3: "Summer", 4: "Summer", 5: "Summer",
        6: "Monsoon", 7: "Monsoon", 8: "Monsoon",
        9: "Post-Monsoon", 10: "Post-Monsoon", 11: "Post-Monsoon"
    })

# --- Normalization (example for Mean column) ---
if "Mean" in df.columns:
    df["Mean_Normalized"] = (df["Mean"] - df["Mean"].min()) / (df["Mean"].max() - df["Mean"].min())

# --- Save processed file ---
processed_path = os.path.join(PROCESSED_DIR, f"processed_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv")
df.to_csv(processed_path, index=False)

print(f"✅ Processed data saved to: {processed_path}")
print(f"📊 Final Columns: {list(df.columns)}")
print(f"📈 Records: {len(df)}")
