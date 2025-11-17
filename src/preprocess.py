# src/preprocess.py
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer

def load_data(filepath):
    """Load CSV dataset."""
    return pd.read_csv(filepath)

def feature_engineering(df):
    """
    Create new features based on correlation insights:
    - Interaction terms (Temperature × Humidity)
    - Polynomial terms (Humidity^2, Temperature^2)
    - Ratios (Moisture / Humidity + 1 to avoid div/0)
    """

    df = df.copy()

    # Interaction terms
    df["Temp_Humidity"] = df["Temperature"] * df["Humidity"]

    # Polynomial terms
    df["Humidity_Sq"] = df["Humidity"] ** 2
    df["Temperature_Sq"] = df["Temperature"] ** 2

    # Ratio features (avoid divide by zero with +1)
    df["Moisture_Humidity_Ratio"] = df["Moisture"] / (df["Humidity"] + 1)

    return df

def build_preprocessing_pipeline():
    """
    Build preprocessing pipeline for features (not targets).
    - Scale numeric features
    - Impute missing values
    - One-hot encode categorical features
    """
    numeric_features = [
        "Temperature", "Humidity", "Moisture",
        "Temp_Humidity", "Humidity_Sq", "Temperature_Sq", "Moisture_Humidity_Ratio"
    ]
    categorical_features = ["Soil Type", "Crop Type"]

    numeric_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="mean")),
        ("scaler", StandardScaler())
    ])

    categorical_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("encoder", OneHotEncoder(handle_unknown="ignore"))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features)
        ]
    )

    return preprocessor

def split_features_targets(df):
    """
    Splits features and targets per nutrient.
    Returns dicts: X_dict[target], y_dict[target]
    """

    # Replace 0 with NaN in nutrients
    nutrient_cols = ["Nitrogen", "Phosphorous", "Potassium"]
    df[nutrient_cols] = df[nutrient_cols].replace(0, np.nan)

    X_dict, y_dict = {}, {}

    for target in nutrient_cols:
        df_target = df.dropna(subset=[target])  # keep rows where target is not NaN

        X_dict[target] = df_target.drop(columns=nutrient_cols + ["Fertilizer Name"])
        y_dict[target] = df_target[target]  # return as Series, not DataFrame

    return X_dict, y_dict
