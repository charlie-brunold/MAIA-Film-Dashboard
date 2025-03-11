# backend/app/main.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models.user import db, bcrypt
import os

app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///maia_film_dashboard.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'dev-secret-key')

# OAuth configuration
app.config['GOOGLE_CLIENT_ID'] = os.environ.get('GOOGLE_CLIENT_ID', 'your-google-client-id')
app.config['GOOGLE_CLIENT_SECRET'] = os.environ.get('GOOGLE_CLIENT_SECRET', 'your-google-client-secret')
app.config['GITHUB_CLIENT_ID'] = os.environ.get('GITHUB_CLIENT_ID', 'your-github-client-id')
app.config['GITHUB_CLIENT_SECRET'] = os.environ.get('GITHUB_CLIENT_SECRET', 'your-github-client-secret')

# Initialize extensions
jwt = JWTManager(app)
db.init_app(app)
bcrypt.init_app(app)

# Create all tables
with app.app_context():
    db.create_all()

# Import and register api routes
from api.endpoints import scriptwriter, storyboard, budget, analysis, auth

# Register blueprints
app.register_blueprint(auth.router, url_prefix='/api/auth')
app.register_blueprint(scriptwriter.router, url_prefix='/api/scriptwriter')
app.register_blueprint(storyboard.router, url_prefix='/api/storyboard')
app.register_blueprint(budget.router, url_prefix='/api/budget')
app.register_blueprint(analysis.router, url_prefix='/api/analysis')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)