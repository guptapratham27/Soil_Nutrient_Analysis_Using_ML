🌱 Soil Nutrient Analysis using Machine Learning
📌 Overview

Soil Nutrient Analysis is a full-stack machine learning application that predicts soil nutrient levels (Nitrogen, Phosphorus, and Potassium) based on environmental and soil parameters.

Using these predicted NPK values, the system recommends the most suitable fertilizer by comparing them against predefined fertilizer compositions.

This project combines:

Machine Learning (Regression)

Rule-Based Recommendation Logic

FastAPI Backend

React Frontend

Automated PDF Reporting

🚀 Problem Statement

In agriculture, improper fertilizer usage due to lack of precise soil nutrient analysis leads to:

Over-fertilization

Increased farming costs

Reduced crop productivity

Soil degradation

Environmental pollution

This system provides data-driven fertilizer recommendations by predicting soil nutrient levels and mapping them to appropriate fertilizers.

🧠 Project Architecture
User Input (Temperature, Humidity, Moisture, Soil Type, Crop Type)
                ↓
        Preprocessing Layer
                ↓
        ML Regression Model
                ↓
     Predicted N, P, K Values
                ↓
 Rule-Based Fertilizer Recommendation Engine
                ↓
      Fertilizer Suggestion + Report
⚙️ Tech Stack
🔹 Backend

Python

FastAPI

Scikit-learn

XGBoost

Pandas

NumPy

🔹 Frontend

React.js

JavaScript

HTML/CSS

🔹 Other Tools

Matplotlib (Visualization)

Jupyter Notebook (Model Development)

Postman (API Testing)

📊 Machine Learning Approach
🔹 Problem Type

Regression — predicting continuous NPK values.

🔹 Input Features

Temperature

Humidity

Moisture

Soil Type

Crop Type

🔹 Target Variables

Nitrogen (N)

Phosphorus (P)

Potassium (K)

🔹 Model Used

XGBoost Regressor

Tree-based models for handling nonlinear relationships

🔹 Performance

Achieved 30–35% improvement over baseline models using:

Advanced feature engineering

Hyperparameter tuning

Model optimization

🌾 Fertilizer Recommendation Logic

Instead of directly predicting fertilizer names using ML, the system:

Predicts soil NPK values.

Compares predicted NPK values with predefined fertilizer compositions.

Selects the fertilizer with the minimum deviation.

Example:
Fertilizer	N	P	K
Urea	46	0	0
DAP	18	46	0
14-35-14	14	35	14

If predicted values are:

N = 20, P = 40, K = 10

The closest fertilizer is selected based on comparison logic.

Why This Approach?

Flexible and scalable

No need to retrain ML model when fertilizer rules change

More explainable system design

🌐 Features

Real-time user input via web interface

ML-based NPK prediction

Rule-based fertilizer recommendation

Clean UI with 10+ components

Automated PDF report generation

Modular backend architecture

Extendable fertilizer database

📁 Project Structure
├── data_core.csv
├── preprocess.py
├── train.py
├── tune.py
├── evaluate.py
├── feature_importance.py
├── models.py
├── fertilizer_logic.py
├── main.py
├── database.py
├── auth.py
├── report_generator.py
├── frontend/
│   ├── App.jsx
│   ├── predictionpage.jsx
│   ├── resultspage.jsx
│   └── ...
🛠️ How to Run the Project
Backend Setup
pip install -r requirements.txt
uvicorn main:app --reload
Frontend Setup
cd frontend
npm install
npm start
📈 Future Improvements

Integrate real-time soil sensor data

Add regional fertilizer databases

Deploy on cloud (AWS / Azure)

Add mobile app support

Improve recommendation logic using weighted scoring

🎯 Key Learning Outcomes

End-to-end ML pipeline development

Regression model building and optimization

Feature engineering and model evaluation

Full-stack integration (React + FastAPI)

Modular system design

Real-world problem solving using ML

👨‍💻 Author

Sanat Singh
Information Science Engineering
CMR Institute of Technology

⭐ Why This Project Matters

By separating nutrient prediction from fertilizer recommendation logic, this system remains:

Flexible

Explainable

Scalable

Practical for real-world agricultural use
