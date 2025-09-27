from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer

def get_preprocessor():
    # All features from frontend are numeric
    numeric_features = [
        'age', 'attendance_percent', 'avg_marks', 'prev_failures',
        'parents_education', 'family_income', 'extracurricular', 'behavior_issues'
    ]

    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    preprocessor = ColumnTransformer(transformers=[
        ('num', numeric_transformer, numeric_features)
    ])

    return preprocessor
