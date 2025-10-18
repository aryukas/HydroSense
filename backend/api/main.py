# backend/api/main.py
import os
import joblib
from fastapi import FastAPI
from pydantic import BaseModel

# Choose your model file
model_path = os.path.join(os.path.dirname(__file__), "../models/LinearRegression_20251017_185006.pkl")
model = joblib.load(model_path)

app = FastAPI()

class InputData(BaseModel):
    feature1: float
    feature2: float

@app.post("/predict")
def predict(data: InputData):
    X = [[data.feature1, data.feature2]]  # match model features
    y_pred = model.predict(X)
    return {"prediction": y_pred.tolist()}
@app.get("/")
def read_root():
    return {"message": "HydroSense API is running!"}
