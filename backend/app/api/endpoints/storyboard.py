# backend/app/api/endpoints/storyboard.py
from flask import Blueprint, request, jsonify
import os
from openai import OpenAI
from dotenv import load_dotenv

router = Blueprint('storyboard', __name__)

@router.route('/generate', methods=['POST'])
def generate_storyboard():
    # Load environment variables (for OpenAI API key)
    load_dotenv()
    
    # Create OpenAI client
    client = OpenAI()
    
    # Get request data
    data = request.json
    script = data.get('script', '')
    num_images = min(data.get('num_images', 1), 5)  # Limit to 5 images max
    style = data.get('style', 'traditional')
    
    if not script:
        return jsonify({"error": "Please provide a script or scene description"}), 400
    
    try:
        # Base storyboard instructions
        storyboard_base = f"""
        Create a professional film storyboard image for the following scene:

        {script}

        Important storyboarding instructions:
        - Frame the shot like a film camera would capture it
        - Use cinematic composition and framing
        - Include clear visual storytelling elements
        - Show character positioning and important scene elements
        """
        
        # Add style-specific instructions
        style_instructions = {
            'traditional': """
                - Use a hand-drawn, sketched appearance with clean lines
                - Include framing markers in the corners
                - Use black and white or minimal color
                - Focus on composition and character placement
                - Show clear, defined shapes and silhouettes
            """,
            'noir': """
                - Use high contrast black and white
                - Create dramatic shadows and lighting
                - Include film noir elements like venetian blinds, dramatic angles
                - Emphasize shadows and silhouettes
                - Create a moody, atmospheric feeling
            """,
            'colorScript': """
                - Focus primarily on color palette and mood
                - Use bold color combinations to establish emotional tone
                - Simplify details but emphasize lighting and atmosphere
                - Show how color directs the viewer's eye
                - Create a cohesive color narrative
            """,
            'animatic': """
                - Create simplified, animation-ready illustrations
                - Use clean lines and solid shapes
                - Focus on key poses and movement
                - Include visual indicators for camera movements
                - Keep details minimal but clear
            """,
            'conceptArt': """
                - Create a detailed, artistic rendering of the scene
                - Include atmospheric elements and textural details
                - Focus on world-building and environmental storytelling
                - Use more detailed rendering than typical storyboards
                - Establish a strong sense of mood and place
            """
        }
        
        # Create the complete prompt
        style_instruction = style_instructions.get(style, style_instructions['traditional'])
        complete_prompt = storyboard_base + style_instruction
        
        # Call the OpenAI DALL·E API
        response = client.images.generate(
            model="dall-e-3",
            prompt=complete_prompt,
            n=num_images,
            size="1024x1024"
        )
        
        # Extract image URLs and return them
        storyboard_frames = []
        for i, img in enumerate(response.data):
            storyboard_frames.append({
                "scene_number": i + 1,
                "image_url": img.url,
                "description": script[:150] + "..." if len(script) > 150 else script
            })
        
        return jsonify({
            "storyboard": storyboard_frames
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500