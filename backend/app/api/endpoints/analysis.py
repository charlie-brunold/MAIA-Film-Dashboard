# backend/app/api/endpoints/analysis.py

from flask import Blueprint, request, jsonify
import os, ast
import pandas as pd
import joblib

router = Blueprint("analysis", __name__)

# 1) Load your trained pipeline once at startup
MODEL_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../../models/revenue_model.pkl")
)
model = joblib.load(MODEL_PATH)

@router.route("/predict", methods=["POST"])
def predict_revenue():
    data = request.get_json(force=True)

    # 2) Build a DataFrame with exactly the features your model expects
    df = pd.DataFrame([{
        "budget":            data["budget"],
        "popularity":        data["popularity"],
        "runtime":           data["runtime"],
        "release_month":     data["release_month"],
        "release_year":      data["release_year"],
        "main_genre":        data["main_genre"],
        "budget_year_ratio": data["budget_year_ratio"],
        "cast_count":        data["cast_count"],
        "genres_count":      data["genres_count"],
        "crew_count":        data["crew_count"],
        "original_language": data["original_language"],
    }])

    # 3) Make the revenue prediction
    pred = float(model.predict(df)[0])

    # 4) Compute ROI (%)
    budget = data["budget"]
    roi = ((pred - budget) / budget) * 100 if budget else 0


    # 6) Simple dynamic recommendations
    recs = []
    if roi < 0:
        recs.append("Projected loss—consider cutting budget or boosting appeal.")
    elif roi < 50:
        recs.append("Modest ROI—consider increasing marketing or star power.")
    else:
        recs.append("Strong ROI—production budget looks well‑spent.")

    return jsonify({
        "predictedRevenue":   round(pred, 2),
        "roi":                round(roi, 1),
        "recommendations":    recs
    })