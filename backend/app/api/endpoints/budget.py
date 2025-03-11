# backend/app/api/endpoints/budget.py
from flask import Blueprint, request, jsonify

router = Blueprint('budget', __name__)

@router.route('/estimate', methods=['POST'])
def estimate_budget():
    data = request.json
    project_details = data.get('project_details', {})
    
    # In a real implementation, this would use a more sophisticated model
    # For now, we'll use some simple calculations
    
    # Example budget estimation based on project details
    genre = project_details.get('genre', 'Drama')
    runtime = project_details.get('runtime', 90)
    locations = project_details.get('locations', 3)
    cast_size = project_details.get('cast_size', 5)
    
    # Simple budget calculations (just for demonstration)
    base_costs = {
        'Drama': 50000,
        'Comedy': 60000,
        'Action': 120000,
        'Thriller': 70000,
        'Horror': 40000,
        'Sci-Fi': 150000,
        'Romance': 55000,
        'Documentary': 30000
    }
    
    base_cost = base_costs.get(genre, 50000)
    runtime_factor = runtime / 90  # Normalize to 90 minutes
    location_cost = locations * 5000
    cast_cost = cast_size * 8000
    
    estimated_budget = base_cost * runtime_factor + location_cost + cast_cost
    
    # Generate budget breakdown
    budget_breakdown = {
        'pre_production': estimated_budget * 0.15,
        'production': estimated_budget * 0.6,
        'post_production': estimated_budget * 0.2,
        'marketing': estimated_budget * 0.05
    }
    
    return jsonify({
        "estimated_total": round(estimated_budget, 2),
        "breakdown": {k: round(v, 2) for k, v in budget_breakdown.items()}
    })