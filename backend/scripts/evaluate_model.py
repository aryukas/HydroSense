import os
import joblib
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# === CONFIG ===
PROCESSED_DIR = "data/processed"
MODELS_DIR = "backend/models"
OUTPUT_DIR = "backend/models/plots"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# === 1️⃣ Load the latest processed data ===
processed_files = sorted(os.listdir(PROCESSED_DIR))
latest_file = os.path.join(PROCESSED_DIR, processed_files[-1])
print(f"📂 Using dataset: {latest_file}")

df = pd.read_csv(latest_file)
X = df[['Mean_Normalized']].values
y = df['Mean'].values

# === 2️⃣ Train-test split (same ratio for fair comparison) ===
split = int(0.8 * len(X))
X_train, X_test, y_train, y_test = X[:split], X[split:], y[:split], y[split:]

# === 3️⃣ Load models ===
model_files = [f for f in os.listdir(MODELS_DIR) if f.endswith('.pkl')]
models = {name.replace('.pkl', ''): joblib.load(os.path.join(MODELS_DIR, name)) for name in model_files}

results = []

# === 4️⃣ Evaluate each model ===
for model_name, model in models.items():
    print(f"\n🔍 Evaluating {model_name}...")
    y_pred = model.predict(X_test)
    
    rmse = mean_squared_error(y_test, y_pred, squared=False)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    results.append([model_name, rmse, mae, r2])

    # === Plot: Actual vs Predicted ===
    plt.figure(figsize=(8, 5))
    plt.scatter(y_test, y_pred, alpha=0.6, label='Predictions', color='blue')
    plt.plot(y_test, y_test, 'r--', label='Perfect Fit')
    plt.title(f"{model_name}: Actual vs Predicted")
    plt.xlabel("Actual Mean Temp Anomaly")
    plt.ylabel("Predicted Mean Temp Anomaly")
    plt.legend()
    plot_path = os.path.join(OUTPUT_DIR, f"{model_name}_actual_vs_pred.png")
    plt.savefig(plot_path)
    plt.close()
    print(f"📊 Saved plot to: {plot_path}")

# === 5️⃣ Save evaluation summary ===
results_df = pd.DataFrame(results, columns=['Model', 'RMSE', 'MAE', 'R²'])
summary_path = os.path.join(OUTPUT_DIR, 'evaluation_summary.csv')
results_df.to_csv(summary_path, index=False)

print("\n✅ Evaluation completed!")
print(results_df)
print(f"📁 Summary saved to: {summary_path}")
