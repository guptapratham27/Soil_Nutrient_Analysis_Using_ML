import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pydantic import BaseModel
from src.preprocess import feature_engineering
from fertilizer_logic import recommend_fertilizer
from fastapi.responses import StreamingResponse
from report_generator import generate_report_pdf

app = FastAPI()

# for react to access backend API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load ML Models 
try:
    nitrogen_model = joblib.load("../models/nitrogen_final_model.pkl")
    phosphorous_model = joblib.load("../models/phosphorous_final_model.pkl")
    potassium_model = joblib.load("../models/potassium_final_model.pkl")
    print("✅ Models loaded successfully!")
except Exception as e:
    print("❌ Error loading models:", e)


# Request Schema

class SoilInput(BaseModel):
    Temperature: float
    Humidity: float
    Moisture: float
    SoilType: str
    CropType: str


# Prediction Endpoint

@app.post("/predict")
def predict_soil(data: SoilInput):

    # Convert input to dataframe (models expect DataFrame)
    input_df = pd.DataFrame([{
        "Temperature": data.Temperature,
        "Humidity": data.Humidity,
        "Moisture": data.Moisture,
        "Soil Type": data.SoilType,
        "Crop Type": data.CropType
    }])
    input_df = feature_engineering(input_df)

    # Predictions
    n_pred = nitrogen_model.predict(input_df)[0]
    p_pred = phosphorous_model.predict(input_df)[0]
    k_pred = potassium_model.predict(input_df)[0]

    fertilizer, reason = recommend_fertilizer(n_pred, p_pred, k_pred)


    return {
        "nitrogen": float(n_pred),
        "phosphorous": float(p_pred),
        "potassium": float(k_pred),
        "fertilizer": fertilizer,
        "explanation": reason
    }

@app.post("/download-report")
def download_report(data: dict):
    n = data["nitrogen"]
    p = data["phosphorous"]
    k = data["potassium"]
    fertilizer = data["fertilizer"]
    explanation = data["explanation"]

    features = data.get("features", {})

    pdf_buffer = generate_report_pdf(n, p, k, fertilizer, explanation,features)

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=soil_report.pdf"}
    )


@app.get("/")
def root():
    return {"message": "Soil Nutrient Prediction API is running!"}
