import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, roc_auc_score
import joblib
from preprocess import get_preprocessor

def train(path_csv= r'guardian-insight-ui-main\data\synthetic_student_data.csv',save_path=r'backend\ml\models\dropout_model_v1.joblib'):
    # Ensure save directory exists
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    # Load data
    df = pd.read_csv(path_csv)
    X = df.drop(columns=['dropout'])
    y = df['dropout']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Preprocessing pipeline
    preprocessor = get_preprocessor()

    pipe_rf = Pipeline([
        ('pre', preprocessor),
        ('clf', RandomForestClassifier(
            n_estimators=200, random_state=42, n_jobs=-1
        ))
    ])

    # Train model
    pipe_rf.fit(X_train, y_train)

    # Evaluation
    preds = pipe_rf.predict(X_test)
    probs = pipe_rf.predict_proba(X_test)[:, 1]

    print(classification_report(y_test, preds))
    print("ROC-AUC:", roc_auc_score(y_test, probs))

    # Save model
    joblib.dump(pipe_rf, save_path)
    print("Model saved to", save_path)

if __name__ == "__main__":
    train()
