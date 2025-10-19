import os
import math
import joblib
import pandas as pd
import numpy as np
from datetime import datetime
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from xgboost import XGBRegressor

# ---------------------------
# Paths and setup
# ---------------------------
PROCESSED_DIR = "data/processed"
MODEL_DIR = "backend/models"
os.makedirs(MODEL_DIR, exist_ok=True)

# ---------------------------
# Load latest processed data
# ---------------------------
files = [f for f in os.listdir(PROCESSED_DIR) if f.endswith(".csv")]
if not files:
    raise FileNotFoundError(f"No processed CSV files found in {PROCESSED_DIR}.")

latest_file = max(files, key=lambda f: os.path.getctime(os.path.join(PROCESSED_DIR, f)))
data_path = os.path.join(PROCESSED_DIR, latest_file)
print(f"📂 Using dataset: {data_path}")

df = pd.read_csv(data_path)

# ---------------------------
# Data sanity checks
# ---------------------------
if df.empty:
    raise ValueError("Loaded DataFrame is empty.")

target_col = "Mean_Normalized"
if target_col not in df.columns:
    raise ValueError(f"Target column '{target_col}' not found in dataset.")

# Possible feature columns
possible_features = ["Month", "NDVI", "Moisture", "Temperature", "Humidity", "Rainfall", "WindSpeed"]
features = [col for col in possible_features if col in df.columns]

if not features:
    raise ValueError("No valid feature columns found in the dataset.")

print(f"✅ Using features: {features}")
print(f"🎯 Target: {target_col}")

# ---------------------------
# Prepare data
# ---------------------------
df = df.dropna(subset=features + [target_col])
X = df[features]
y = df[target_col]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, shuffle=True
)

# Standardize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Save scaler for later use
scaler_path = os.path.join(MODEL_DIR, "scaler.pkl")
joblib.dump(scaler, scaler_path)
print(f"🧮 Scaler saved at: {scaler_path}")

# ---------------------------
# Define models
# ---------------------------
models = {
    "LinearRegression": LinearRegression(),
    "RandomForest": RandomForestRegressor(n_estimators=200, random_state=42),
    "XGBoost": XGBRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=6,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        verbosity=0
    ),
    "GradientBoosting": GradientBoostingRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=5,
        random_state=42
    )
}

results = {}
best_model_name = None
best_rmse = float("inf")
best_model = None

# ---------------------------
# Train, evaluate, and compare
# ---------------------------
for name, model in models.items():
    print(f"\n⚙️ Training {name}...")

    try:
        model.fit(X_train_scaled, y_train)

        # Predictions
        y_pred = model.predict(X_test_scaled)

        # Metrics
        mse = mean_squared_error(y_test, y_pred)
        rmse = math.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)

        # Cross-validation
        cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring="r2")
        cv_mean = np.mean(cv_scores)

        results[name] = {
            "RMSE": rmse,
            "MAE": mae,
            "R2": r2,
            "CV_R2_Mean": cv_mean
        }

        print(f"✅ {name} Metrics → RMSE: {rmse:.4f}, MAE: {mae:.4f}, R²: {r2:.4f}, CV_R²: {cv_mean:.4f}")

        # Save model
        model_path = os.path.join(MODEL_DIR, f"{name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pkl")
        joblib.dump(model, model_path)
        print(f"💾 Model saved: {model_path}")

        # Track best model
        if rmse < best_rmse:
            best_rmse = rmse
            best_model_name = name
            best_model = model

    except Exception as e:
        print(f"❌ Error training {name}: {e}")

# ---------------------------
# Save best model
# ---------------------------
if best_model:
    best_path = os.path.join(MODEL_DIR, f"BEST_MODEL_{best_model_name}.pkl")
    joblib.dump(best_model, best_path)
    print(f"\n🏆 Best model: {best_model_name} (RMSE: {best_rmse:.4f}) saved at {best_path}")
else:
    print("❌ No model trained successfully.")

# ---------------------------
# Save results summary
# ---------------------------
summary_path = os.path.join(MODEL_DIR, f"metrics_summary_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv")
pd.DataFrame.from_dict(results, orient="index").to_csv(summary_path)
print(f"\n📊 Metrics summary saved: {summary_path}")

print("\n🎉 Training completed successfully!")