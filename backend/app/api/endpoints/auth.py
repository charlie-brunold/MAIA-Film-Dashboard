# backend/app/api/endpoints/auth.py
from flask import Blueprint, request, jsonify, current_app
import requests
import json
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import db, User
from datetime import timedelta

router = Blueprint('auth', __name__)

# Regular login and registration routes...

@router.route('/google/callback', methods=['POST'])
def google_callback():
    code = request.json.get('code')
    
    # Exchange code for token
    token_url = 'https://oauth2.googleapis.com/token'
    data = {
        'code': code,
        'client_id': current_app.config['GOOGLE_CLIENT_ID'],
        'client_secret': current_app.config['GOOGLE_CLIENT_SECRET'],
        'redirect_uri': 'http://localhost:3000/login',
        'grant_type': 'authorization_code'
    }
    
    response = requests.post(token_url, data=data)
    token_data = response.json()
    
    if 'error' in token_data:
        return jsonify({"msg": "Failed to authenticate with Google"}), 401
    
    # Get user info with access token
    user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
    headers = {'Authorization': f"Bearer {token_data['access_token']}"}
    user_info_response = requests.get(user_info_url, headers=headers)
    user_info = user_info_response.json()
    
    # Check if user exists
    email = user_info.get('email')
    user = User.query.filter_by(email=email).first()
    
    if not user:
        # Create new user
        user = User(
            username=user_info.get('name'),
            email=email,
            provider='google',
            avatar=user_info.get('picture')
        )
        # Set a random password for OAuth users
        user.set_password(current_app.config['SECRET_KEY'] + email)
        db.session.add(user)
        db.session.commit()
    
    # Create access token
    access_token = create_access_token(
        identity=user.id,
        expires_delta=timedelta(days=1)
    )
    
    return jsonify({
        "msg": "Google login successful",
        "user": user.to_dict(),
        "access_token": access_token
    }), 200

@router.route('/github/callback', methods=['POST'])
def github_callback():
    code = request.json.get('code')
    
    # Exchange code for token
    token_url = 'https://github.com/login/oauth/access_token'
    data = {
        'client_id': current_app.config['GITHUB_CLIENT_ID'],
        'client_secret': current_app.config['GITHUB_CLIENT_SECRET'],
        'code': code,
        'redirect_uri': 'http://localhost:3000/login'
    }
    headers = {'Accept': 'application/json'}
    
    response = requests.post(token_url, data=data, headers=headers)
    token_data = response.json()
    
    if 'error' in token_data:
        return jsonify({"msg": "Failed to authenticate with GitHub"}), 401
    
    # Get user info with access token
    user_info_url = 'https://api.github.com/user'
    headers = {'Authorization': f"token {token_data['access_token']}"}
    user_info_response = requests.get(user_info_url, headers=headers)
    user_info = user_info_response.json()
    
    # Get user email
    emails_url = 'https://api.github.com/user/emails'
    emails_response = requests.get(emails_url, headers=headers)
    emails = emails_response.json()
    
    # Find primary email
    primary_email = None
    for email_data in emails:
        if email_data.get('primary'):
            primary_email = email_data.get('email')
            break
    
    if not primary_email:
        return jsonify({"msg": "Failed to retrieve GitHub email"}), 401
    
    # Check if user exists
    user = User.query.filter_by(email=primary_email).first()
    
    if not user:
        # Create new user
        user = User(
            username=user_info.get('login'),
            email=primary_email,
            provider='github',
            avatar=user_info.get('avatar_url')
        )
        # Set a random password for OAuth users
        user.set_password(current_app.config['SECRET_KEY'] + primary_email)
        db.session.add(user)
        db.session.commit()
    
    # Create access token
    access_token = create_access_token(
        identity=user.id,
        expires_delta=timedelta(days=1)
    )
    
    return jsonify({
        "msg": "GitHub login successful",
        "user": user.to_dict(),
        "access_token": access_token
    }), 200