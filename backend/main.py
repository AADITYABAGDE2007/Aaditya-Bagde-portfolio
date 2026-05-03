from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI(title="AI Engineer Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for the demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HRData(BaseModel):
    age: int
    monthly_income: int
    job_satisfaction: int
    years_at_company: int

class MusicData(BaseModel):
    mood: str

@app.get("/")
def read_root():
    return {"status": "ok", "message": "ML API is running"}

@app.post("/api/predict/hr-attrition")
def predict_attrition(data: HRData):
    # Mock prediction logic based on inputs
    score = 0
    if data.job_satisfaction < 3:
        score += 40
    if data.monthly_income < 4000:
        score += 30
    if data.years_at_company < 2:
        score += 20
    if data.age < 25:
        score += 10
        
    attrition_prob = min(95, score + random.randint(-5, 5))
    prediction = "Yes" if attrition_prob > 50 else "No"
    
    return {
        "prediction": prediction,
        "probability": f"{attrition_prob}%",
        "key_factors": ["Low Job Satisfaction", "Low Income"] if prediction == "Yes" else ["Good Income", "High Satisfaction"]
    }

@app.post("/api/predict/music-recommendation")
def recommend_music(data: MusicData):
    mood = data.mood.lower()
    recommendations = {
        "happy": ["Walking on Sunshine - Katrina & The Waves", "Happy - Pharrell Williams", "Don't Stop Me Now - Queen"],
        "sad": ["Someone Like You - Adele", "Fix You - Coldplay", "The Sound of Silence - Simon & Garfunkel"],
        "energetic": ["Eye of the Tiger - Survivor", "Stronger - Kanye West", "Can't Hold Us - Macklemore"],
        "calm": ["Weightless - Marconi Union", "Clair de Lune - Debussy", "Sunset Lover - Petit Biscuit"]
    }
    
    # Default to energetic if not matched
    songs = recommendations.get(mood, recommendations["energetic"])
    
    return {
        "mood_detected": mood,
        "recommended_songs": songs,
        "confidence_score": f"{random.randint(85, 99)}%"
    }
