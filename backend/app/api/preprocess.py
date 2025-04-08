import pandas as pd

TOP_GENRES = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Documentary", "Drama", "Family", "Fantasy", "History",
    "Horror", "Music", "Mystery", "Romance", "Science Fiction"
]

def preprocess_input(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    numeric_cols = ['budget', 'popularity', 'runtime', 'release_year', 'release_month', 'release_day']
    for col in numeric_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    for genre in TOP_GENRES:
        df[f'genre_{genre}'] = df['genres'].apply(lambda x: int(genre in x))
    df.drop(columns=['genres'], inplace=True)
    feature_order = numeric_cols + [f'genre_{g}' for g in TOP_GENRES]
    return df[feature_order]
