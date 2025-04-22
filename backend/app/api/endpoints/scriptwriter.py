from flask import Blueprint, request, jsonify
import os
import openai

router = Blueprint("scriptwriter", __name__)

openai.api_key = os.environ["OPENAI_API_KEY"]

@router.route("/generate", methods=["POST"])
def generate_script():
    data = request.get_json(force=True)
    req  = data.get("requirements", "").strip()
    tone = data.get("tone", "dramatic").strip()
    if not req:
        return jsonify({"error": "Please provide requirements"}), 400

    prompt = (
        f"You are a professional screenwriter.\n\n"
        f"Requirements:\n{req}\n\n"
        f"Tone/style: {tone}\n\n"
        f"Write a short scene (dialogue + action)."
    )

    try:
        resp = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role":"system", "content":"You are an expert screenwriter."},
                {"role":"user",   "content":prompt}
            ],
            temperature=0.7,
            max_tokens=800
        )
        script = resp.choices[0].message.content.strip()
        return jsonify({"script": script})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
