# src/train.py
import json
import joblib
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor
from preprocess import load_data, feature_engineering, build_preprocessing_pipeline, split_features_targets

# Load tuned params
with open("../models/best_params.json", "r") as f:
    best_params_dict = json.load(f)

# Load data
df = load_data(r"C:/Users/prath/OneDrive/Desktop/Snaagain/data/data_core.csv")
df = feature_engineering(df)
X_dict, y_dict = split_features_targets(df)
preprocessor = build_preprocessing_pipeline()

targets = ["Nitrogen", "Phosphorous", "Potassium"]

for target in targets:
    print(f"\n Training final model for {target}...")

    X = X_dict[target]
    y = y_dict[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Use best tuned params
    params = {k.replace("regressor__", ""): v for k, v in best_params_dict[target].items()}

    model = Pipeline([
        ("preprocessor", preprocessor),
        ("regressor", XGBRegressor(**params, random_state=42, n_jobs=-1, tree_method="hist"))
    ])

    model.fit(X_train, y_train)

    # Save trained model
    joblib.dump(model, f"../models/{target.lower()}_final_model.pkl")
    print(f"✅ Saved final {target} model")
