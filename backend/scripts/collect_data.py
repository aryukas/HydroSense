"""
collect_data.py
HydroSense - Data Collection Script
-----------------------------------
Downloads sample rainfall and weather data for demonstration.
Later you can replace the data source with real APIs (IMD, NASA POWER, NOAA).
"""

import os
import pandas as pd
import requests
from datetime import datetime

# --- Configurations ---
RAW_DATA_DIR = os.path.join("data", "raw")
os.makedirs(RAW_DATA_DIR, exist_ok=True)

# Sample Open Data (Global Weather Data)
DATA_URL = "https://raw.githubusercontent.com/datasets/global-temp/master/data/monthly.csv"

def download_weather_data(url=DATA_URL):
    """Downloads sample global temperature dataset."""
    print("🌍 Downloading sample weather dataset...")
    response = requests.get(url)
    if response.status_code == 200:
        filename = os.path.join(RAW_DATA_DIR, f"weather_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv")
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"✅ Data saved to: {filename}")
        return filename
    else:
        print("❌ Failed to fetch data:", response.status_code)
        return None

def preview_data(file_path):
    """Loads and shows first few rows."""
    df = pd.read_csv(file_path)
    print("\n📊 Sample Preview:")
    print(df.head())
    print(f"\n✅ Total records: {len(df)}")

if __name__ == "__main__":
    file_path = download_weather_data()
    if file_path:
        preview_data(file_path)
