# backend/app/api/endpoints/scriptwriter.py
from flask import Blueprint, request, jsonify

router = Blueprint('scriptwriter', __name__)

@router.route('/generate', methods=['POST'])
def generate_script():
    data = request.json
    prompt = data.get('prompt', '')
    
    # In a real implementation, this would call an AI service
    # For now, we'll return a simple mock response
    
    generated_script = f"""
INT. COFFEE SHOP - DAY

Two characters sit across from each other at a small table. The atmosphere is tense.

CHARACTER 1
(nervously)
I've been meaning to talk to you about something.

CHARACTER 2
(suspicious)
What's this about?

CHARACTER 1
It's about that screenplay we've been working on.
I think we need to take it in a different direction.

CHARACTER 2
(defensive)
Different how? We've been working on this for months!

Based on prompt: "{prompt}"
"""
    
    return jsonify({
        "script": generated_script
    })