from sklearn.linear_model import LinearRegression
from sklearn.datasets import make_regression
import joblib
import os

# Ensure the models folder exists
os.makedirs("../models", exist_ok=True)  # Relative to scripts folder

# Create dummy regression data
X, y = make_regression(n_samples=100, n_features=1, noise=0.1)

# Train LinearRegression model
model = LinearRegression()
model.fit(X, y)

# Save model to backend/models/
joblib.dump(model, "../models/model.pkl")

print("✅ Dummy model created and saved successfully at backend/models/model.pkl")
