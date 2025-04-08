import pandas as pd
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline


movie_data_file_path = 'Movie_Data.csv'
movie_data = pd.read_csv(movie_data_file_path)

y = movie_data.revenue
movie_features = ['score', 'genre', 'crew', 'orig_lang', 'budget', 'country', 'budget_std']
X = movie_data[movie_features]

numeric_features = ['score', 'budget', 'budget_std']
categorical_features = ['genre', 'crew', 'orig_lang', 'country']

numeric_transformer = Pipeline(steps = [('onehot', OneHotEncoder(handle_unknown='ignore'))])
categorical_transformer = Pipeline(steps = [('onehot', OneHotEncoder(handle_unknown='ignore'))])

preprocessor = ColumnTransformer(transformers= [
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

model = Pipeline(steps = [
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(random_state=1))
])

train_X, val_X, train_y, val_y = train_test_split(X, y, random_state=1)

model.fit(train_X, train_y)
movie_preds = model.predict(val_X)
print(mean_absolute_error(val_y, movie_preds))

import joblib

output_path = os.path.join(os.path.dirname(__file__), '../app/models/revenue_model.pkl')
joblib.dump(model, output_path)

