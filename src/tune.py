# src/tune.py
import json
import numpy as np
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor
from preprocess import load_data, feature_engineering, build_preprocessing_pipeline, split_features_targets

# Load data
df = load_data(r"C:/Users/prath/OneDrive/Desktop/Snaagain/data/data_core.csv")
df = feature_engineering(df)
X_dict, y_dict = split_features_targets(df)
preprocessor = build_preprocessing_pipeline()

param_distributions = {
    "regressor__n_estimators": [100, 200, 300, 500],
    "regressor__max_depth": [3, 5, 7, 10],
    "regressor__learning_rate": [0.01, 0.05, 0.1, 0.2],
    "regressor__subsample": [0.6, 0.8, 1.0],
    "regressor__colsample_bytree": [0.6, 0.8, 1.0],
    "regressor__gamma": [0, 0.1, 0.2, 0.5],
    "regressor__min_child_weight": [1, 3, 5]
}

best_params_dict = {}
targets = ["Nitrogen", "Phosphorous", "Potassium"]

for target in targets:
    print(f"\n🔎 Tuning {target}...")

    X = X_dict[target]
    y = y_dict[target]
    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline = Pipeline([
        ("preprocessor", preprocessor),
        ("regressor", XGBRegressor(random_state=42, n_jobs=-1, tree_method="hist"))
    ])

    search = RandomizedSearchCV(
        pipeline,
        param_distributions=param_distributions,
        n_iter=20,
        cv=3,
        scoring="neg_mean_squared_error",
        verbose=1,
        random_state=42,
        n_jobs=-1
    )
    search.fit(X_train, y_train)

    best_params_dict[target] = search.best_params_
    print(f"✅ Best params for {target}: {search.best_params_}")

# Save best params to JSON
with open("../models/best_params.json", "w") as f:
    json.dump(best_params_dict, f, indent=4)

