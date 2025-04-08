from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from preprocess import preprocess_input

app = FastAPI()
model = joblib.load("model.pkl")

class MovieFeatures(BaseModel):
    budget: float
    popularity: float
    runtime: float
    release_year: int
    release_month: int
    release_day: int
    genres: list[str]

@app.post("/predict")
def predict_revenue(movie: MovieFeatures):
    input_df = pd.DataFrame([movie.dict()])
    input_processed = preprocess_input(input_df)
    prediction = model.predict(input_processed)[0]
    return {"predicted_revenue": round(prediction)}
