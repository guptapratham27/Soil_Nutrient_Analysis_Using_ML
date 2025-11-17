# src/evaluate.py
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from preprocess import load_data, feature_engineering, split_features_targets

# Load data
df = load_data(r"C:/Users/prath/OneDrive/Desktop/Snaagain/data/data_core.csv")
df = feature_engineering(df)
X_dict, y_dict = split_features_targets(df)

targets = ["Nitrogen", "Phosphorous", "Potassium"]

for target in targets:
    print(f"\n📊 Evaluating {target} model...")

    X = X_dict[target]
    y = y_dict[target]
    _, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = joblib.load(f"../models/{target.lower()}_final_model.pkl")

    preds = model.predict(X_test)
    mse = mean_squared_error(y_test, preds)

    print(f"✅ {target} MSE: {mse:.2f}")
