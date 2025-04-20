import os
import ast
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_error
from sklearn.impute import SimpleImputer
import numpy as np
import joblib

base_dir = os.path.dirname(os.path.abspath(__file__))
csv_filename = "train.csv"          
csv_path     = os.path.join(base_dir, csv_filename)
df = pd.read_csv(csv_path)
df["release_month"] = (pd.to_datetime(df["release_date"], errors="coerce")
                       .dt.month.fillna(0).astype(int))
df["release_year"] = (pd.to_datetime(df["release_date"], errors="coerce")
                       .dt.year.fillna(0).astype(int))
df["crew_count"] = df["crew"].fillna("[]").apply(lambda x: len(ast.literal_eval(x)))
df["cast_count"] = df["cast"].fillna("[]").apply(lambda x: len(ast.literal_eval(x)))
df["genres_count"] = df["genres"].fillna("[]").apply(lambda x: len(ast.literal_eval(x)))

possible_genres = (r"(Comedy|Horror|Action|Drama|Documentary|Science Fiction|"
    r"Crime|Fantasy|Thriller|Animation|Adventure|Mystery|War|"
    r"Romance|Music|Family|Western|History|TV Movie|Foreign)")

df["main_genre"] = (df["genres"].fillna('').str.extract(possible_genres, expand=False))
df["budget_year_ratio"] = df["budget"] / (df["release_year"] + 1)

features = ["budget", "popularity", "runtime", "release_month", "release_year", "genres_count", "crew_count", "cast_count", "original_language", "main_genre", "budget_year_ratio"]

X = df[features]
y = df["revenue"]   
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

numeric_feats = ["budget", "popularity", "runtime", "release_month", "genres_count", "crew_count", "cast_count", "release_year", "budget_year_ratio"]
categorical_feats = ["original_language", "main_genre"]

numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
])

categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="constant", fill_value="missing")),
    ("onehot", OneHotEncoder(handle_unknown="ignore")),
])
categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="constant", fill_value="missing")),
    ("onehot", OneHotEncoder(handle_unknown="ignore")),
])

preprocessor = ColumnTransformer([
    ("num", numeric_pipeline, numeric_feats),
    ("cat", categorical_pipeline, categorical_feats),
])

model_pipeline = Pipeline([
    ("preproc", preprocessor),
    ("rf", RandomForestRegressor(n_estimators=100, random_state=42)),
])
model_pipeline.fit(X_train, y_train)
val_preds = model_pipeline.predict(X_test)
mse = mean_squared_error(y_test, val_preds)
print("Validation MSE:", mse)
mae = mean_absolute_error(y_test, val_preds)
print("Validation MAE:", mae)

out_dir = os.path.join(base_dir, "../revenue_model.pkl")
joblib.dump(model_pipeline, out_dir)

print("Model trained and saved to:", os.path.join(out_dir, "revenue_model.pkl"))


# feature importance
# ohe = model_pipeline.named_steps["preproc"]\
#       .transformers_[1][1]\
#       .named_steps["onehot"]
# ohe_names = list(ohe.get_feature_names_out(categorical_feats))

# # 4) Combine into a single list
# feature_names = numeric_feats + ohe_names

# # 5) Grab importances
# importances = model_pipeline.named_steps["rf"].feature_importances_

# # 6) Build & sort a DataFrame
# fi = pd.DataFrame({
#     "feature":    feature_names,
#     "importance": importances
# }).sort_values("importance", ascending=False)

# print(fi.to_string(index=False))
