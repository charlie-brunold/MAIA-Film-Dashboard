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


# main.py

import os
import openai
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
import uvicorn

# Set your OpenAI API key.
# Ensure you have exported your API key in your environment variables (or you can set it directly here, though it's not recommended for security reasons).
openai.api_key = os.getenv("OPENAI_API_KEY")  # Replace with your API key if not using env variable

# Pydantic model for the incoming request payload.
class ScriptRequest(BaseModel):
    prompt: str
    style: str = "default"  # You can use this to modify the tone or style of the output

# Initialize the FastAPI app.
app = FastAPI(title="ChatGPT Scriptwriter API")

# This function integrates with the OpenAI API to generate a script using ChatGPT.
# Customize the prompt adjustments or model parameters if needed.
def generate_script(prompt: str, style: str) -> str:
    """
    Generate a movie script using ChatGPT via the OpenAI API.
    
    Customize this function's logic as desired. For instance, you may adjust:
      - The prompt to include specific stylistic instructions.
      - The model (e.g., "gpt-3.5-turbo" or "gpt-4") if available.
      - Other parameters such as max_tokens, temperature, etc.
    """
    # Compose a detailed prompt that instructs ChatGPT to generate a script in the specified style.
    adjusted_prompt = f"Write a detailed movie script in a {style} style. The story prompt is: {prompt}"
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Change the model if you have access to GPT-4 or another model
            messages=[
                {"role": "system", "content": "You are a creative screenwriter who writes engaging movie scripts."},
                {"role": "user", "content": adjusted_prompt}
            ],
            max_tokens=1000,         # Adjust as necessary; more tokens allow for longer scripts
            temperature=0.7,         # Controls creativity; adjust between 0.0 (more deterministic) to 1.0 (more creative)
        )
        # Extract the generated script from the API response.
        script = response.choices[0].message["content"].strip()
        return script
    except Exception as e:
        # Here, you might add logging or additional error-handling as needed.
        raise Exception(f"OpenAI API error: {str(e)}")

# API endpoint to generate a script.
@app.post("/generate-script")
async def create_script(request: ScriptRequest):
    try:
        # Call the function that communicates with the OpenAI API.
        script_text = generate_script(request.prompt, request.style)
        return {"script": script_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Optional health-check endpoint to verify that the API is running.
@app.get("/status")
async def api_status():
    return {"status": "API is running."}

if __name__ == "__main__":
    # Change the host and port if necessary.
    uvicorn.run(app, host="0.0.0.0", port=8000)

