# backend/app/main.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow frontend to connect

@app.route('/')
def home():
    return jsonify({
        "status": "success",
        "message": "MAIA Film Dashboard API is running"
    })

# Import and register api routes
from api.endpoints import scriptwriter, storyboard, budget, analysis

# Register blueprints
app.register_blueprint(scriptwriter.router, url_prefix='/api/scriptwriter')
app.register_blueprint(storyboard.router, url_prefix='/api/storyboard')
app.register_blueprint(budget.router, url_prefix='/api/budget')
app.register_blueprint(analysis.router, url_prefix='/api/analysis')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)