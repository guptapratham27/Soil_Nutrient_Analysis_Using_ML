import joblib
import matplotlib.pyplot as plt
import numpy as np
from preprocess import load_data, feature_engineering, split_features_targets

df = load_data(r"C:/Users/prath/OneDrive/Desktop/Snaagain/data/data_core.csv")
df = feature_engineering(df)
X_dict, y_dict = split_features_targets(df)

targets = ["Nitrogen", "Phosphorous", "Potassium"]

for target in targets:
    print(f"\n📊 Feature importance for {target}...")
    
    model = joblib.load(f"../models/{target.lower()}_final_model.pkl")
    
    # Get the trained XGBRegressor inside pipeline
    xgb_model = model.named_steps['regressor']
    preprocessor = model.named_steps['preprocessor']
    
    # Get transformed feature names
    numeric_features = preprocessor.transformers_[0][2]
    cat_features = preprocessor.transformers_[1][1].named_steps['encoder'].get_feature_names_out(preprocessor.transformers_[1][2])
    all_features = np.concatenate([numeric_features, cat_features])
    
    # Get feature importances
    importances = xgb_model.feature_importances_
    
    # Sort & plot
    sorted_idx = np.argsort(importances)[::-1]
    plt.figure(figsize=(10,6))
    plt.bar(range(len(importances)), importances[sorted_idx])
    plt.xticks(range(len(importances)), all_features[sorted_idx], rotation=90)
    plt.title(f"Feature Importance for {target}")
    plt.tight_layout()
    plt.show()
 