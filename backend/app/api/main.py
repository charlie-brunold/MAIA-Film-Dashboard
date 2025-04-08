from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import os

app = FastAPI()
model_path = os.path.join(os.path.dirname(__file__), 'models/revenue_model.pkl')
model = joblib.load(model_path)

class MovieFeatures(BaseModel):
    score: float
    genre: str
    crew: str
    orig_lang: str
    budget: float
    country: str
    budget_std: float

@app.post("/predict")
def predict_revenue(movie: MovieFeatures):
    input_data = pd.DataFrame([movie.dict()])
    prediction = model.predict(input_data)[0]
    return {"predicted_revenue": round(prediction)}
