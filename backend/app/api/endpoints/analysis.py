# @router.route('/predict', methods=['POST'])
# def predict_roi():
#     data = request.get_json()

#     input_dict = {
#         'score': [data.get('score', 6.0)],
#         'genre': [data.get('genre', 'Drama')],
#         'crew': [data.get('crew', 'Unknown')],
#         'orig_lang': [data.get('orig_lang', 'English')],
#         'budget': [data.get('budget', 1000000)],
#         'country': [data.get('country', 'USA')],
#         'budget_std': [data.get('budget_std', 0.0)]
#     }

#     input_df = pd.DataFrame(input_dict)

#     predicted_revenue = model.predict(input_df)[0]

#     budget = data.get('budget', 1000000)
#     marketing_budget = data.get('marketingBudget', budget * 0.5)
#     total_investment = budget + marketing_budget
#     roi = ((predicted_revenue - total_investment) / total_investment) * 100
#     success_probability = min(90, max(10, 50 + roi / 4))

#     return jsonify({
#         "film": data.get("title", ""),
#         "predictedRevenue": round(predicted_revenue, 2),
#         "totalInvestment": round(total_investment, 2),
#         "roi": round(roi, 1),
#         "successProbability": round(success_probability, 1),
#         "recommendations": []
#     })

# # # backend/app/api/endpoints/analysis.py
# # from flask import Blueprint, request, jsonify
# # import random  # Just for demonstration purposes

# # router = Blueprint('analysis', __name__)

# # @router.route('/predict', methods=['POST'])
# # def predict_roi():
# #     data = request.json
    
# #     # Extract film details
# #     title = data.get('title', '')
# #     genre = data.get('genre', 'Drama')
# #     budget = data.get('budget', 1000000)
# #     cast_rating = data.get('castRating', 5)
# #     runtime = data.get('runtime', 120)
# #     release_month = data.get('releaseMonth', 'June')
# #     marketing_budget = data.get('marketingBudget', budget * 0.5)
    
# #     # In a real implementation, this would use a trained model
# #     # For now, we'll generate a simplified prediction
    
# #     # Base revenue multiplier by genre
# #     genre_multipliers = {
# #         'Drama': 2.0,
# #         'Comedy': 2.5,
# #         'Action': 3.0,
# #         'Thriller': 2.2,
# #         'Horror': 3.5,  # Horror often has high ROI due to low budgets
# #         'Sci-Fi': 2.8,
# #         'Romance': 2.1,
# #         'Documentary': 1.5
# #     }
    
# #     # Month seasonality factor
# #     month_factors = {
# #         'January': 0.8, 'February': 0.9, 'March': 1.0, 
# #         'April': 1.1, 'May': 1.2, 'June': 1.3,
# #         'July': 1.4, 'August': 1.3, 'September': 1.1,
# #         'October': 1.0, 'November': 1.2, 'December': 1.4
# #     }
    
# #     # Simple revenue prediction formula
# #     base_multiplier = genre_multipliers.get(genre, 2.0)
# #     month_multiplier = month_factors.get(release_month, 1.0)
# #     cast_multiplier = 0.8 + (cast_rating / 10) * 0.6  # Range from 0.8 to 1.4
    
# #     # Marketing impact (simplified)
# #     marketing_ratio = marketing_budget / budget
# #     marketing_factor = 0.7 + (marketing_ratio * 0.6)  # Range from 0.7 to 1.3
    
# #     # Calculate predicted revenue
# #     total_investment = budget + marketing_budget
# #     predicted_revenue = budget * base_multiplier * month_multiplier * cast_multiplier * marketing_factor
    
# #     # Add some randomness to make it more realistic (would be model uncertainty in real system)
# #     predicted_revenue *= random.uniform(0.9, 1.1)
    
# #     # Calculate ROI
# #     roi = ((predicted_revenue - total_investment) / total_investment) * 100
    
# #     # Success probability (simplified)
# #     success_probability = min(90, max(10, 50 + roi / 4))  # Range from 10% to 90%
    
# #     # Generate recommendations based on the analysis
# #     recommendations = []
    
# #     if marketing_ratio < 0.3:
# #         recommendations.append("Consider increasing marketing budget for better visibility")
# #     elif marketing_ratio > 0.7:
# #         recommendations.append("Marketing budget is high, consider reallocating some funds to production quality")
    
# #     if cast_rating < 5:
# #         recommendations.append("Consider casting more recognizable actors to improve box office potential")
    
# #     # Add genre-specific recommendation
# #     if genre == "Horror" and release_month not in ["October", "January"]:
# #         recommendations.append("Horror films tend to perform better in October or January")
# #     elif genre == "Action" and release_month not in ["May", "June", "July"]:
# #         recommendations.append("Action films typically perform better during summer months")
    
# #     # Runtime recommendation
# #     if runtime > 150:
# #         recommendations.append("Consider a shorter runtime; films over 150 minutes may limit daily screenings")
    
# #     return jsonify({
# #         "film": title,
# #         "predictedRevenue": round(predicted_revenue, 2),
#     #     "totalInvestment": round(total_investment, 2),
#     #     "roi": round(roi, 1),
#     #     "successProbability": round(success_probability, 1),
#     #     "recommendations": recommendations
#     # })
