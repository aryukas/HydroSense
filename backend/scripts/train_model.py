# backend/scripts/train_model.py
import pandas as pd
import os
import joblib
from datetime import datetime
import math
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from xgboost import XGBRegressor

# Paths
PROCESSED_DIR = "data/processed"
MODEL_DIR = "backend/models"

os.makedirs(MODEL_DIR, exist_ok=True)

# --- Load latest processed data ---
files = [f for f in os.listdir(PROCESSED_DIR) if f.endswith(".csv")]
if not files:
    raise FileNotFoundError(f"No processed CSV files found in {PROCESSED_DIR}. Run preprocessing first.")
latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(PROCESSED_DIR, f)))
data_path = os.path.join(PROCESSED_DIR, latest_file)
print(f"📂 Using dataset: {data_path}")

df = pd.read_csv(data_path)

# --- Minimal sanity checks ---
if df.empty:
    raise ValueError("Loaded dataframe is empty.")
required_cols = ["Month", "Mean_Normalized"]
for c in required_cols:
    if c not in df.columns:
        raise ValueError(f"Required column missing: {c}")

# Ensure numeric types
df["Month"] = pd.to_numeric(df["Month"], errors="coerce")
df["Mean_Normalized"] = pd.to_numeric(df["Mean_Normalized"], errors="coerce")
df = df.dropna(subset=["Month", "Mean_Normalized"]).reset_index(drop=True)

# Features & target (simple demo using Month); expand later with more features
X = df[["Month"]]
y = df["Mean_Normalized"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, shuffle=False)
print(f"📊 Training samples: {len(X_train)}, Testing samples: {len(X_test)}")

# Models to try
models = {
    "LinearRegression": LinearRegression(),
    "RandomForest": RandomForestRegressor(n_estimators=100, random_state=42),
    "XGBoost": XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42, verbosity=0)
}

results = {}

# Train & evaluate
for name, model in models.items():
    print(f"\n⚙️ Training {name}...")
    try:
        model.fit(X_train, y_train)
    except Exception as e:
        print(f"❌ Training failed for {name}: {e}")
        continue

    y_pred = model.predict(X_test)

    # Compute RMSE in a way compatible with multiple sklearn versions
    mse = mean_squared_error(y_test, y_pred)
    rmse = math.sqrt(mse)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    results[name] = {"RMSE": rmse, "MAE": mae, "R2": r2}

    # Save model
    model_path = os.path.join(MODEL_DIR, f"{name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pkl")
    joblib.dump(model, model_path)
    print(f"✅ {name} model saved at: {model_path}")

# Display metrics
print("\n📈 Evaluation Results:")
for name, metrics in results.items():
    print(f"{name}: RMSE={metrics['RMSE']:.6f}, MAE={metrics['MAE']:.6f}, R²={metrics['R2']:.6f}")

# Save a simple CSV summary of results
summary_path = os.path.join(MODEL_DIR, f"metrics_summary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv")
pd.DataFrame.from_dict(results, orient="index").to_csv(summary_path)
print(f"\n📁 Metrics summary saved to: {summary_path}")
