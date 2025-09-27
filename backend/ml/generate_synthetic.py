import os
import numpy as np
import pandas as pd


def make_data(n=3000, seed=42):
    """
    Generate synthetic student data that matches the frontend structure exactly
    
    Frontend data structure (8 numeric features):
    - age: student age (16-25)
    - attendance_percent: attendance percentage (0-100)
    - avg_marks: average marks percentage (0-100)
    - prev_failures: number of previous failures (0-3)
    - parents_education: education level (0-7)
    - family_income: income range (0-5)
    - extracurricular: number of activities (0-10)
    - behavior_issues: behavior score (0-4)
    - dropout: target variable (0=low risk, 1=high risk)
    """
    
    np.random.seed(seed)
    
    # Generate realistic student data matching frontend exactly
    age = np.random.choice(range(16, 26), n)  # 16-25 years
    
    # Attendance percentage (0-100)
    attendance_percent = np.clip(np.random.normal(80, 15, size=n), 30, 100)
    
    # Average marks percentage (0-100)
    avg_marks = np.clip(np.random.normal(70, 20, size=n), 20, 100)
    
    # Previous failures (0-3: none, one, two, multiple)
    prev_failures = np.random.choice([0, 1, 2, 3], n, p=[0.6, 0.25, 0.1, 0.05])
    
    # Parents education (0-7: no-formal to PhD)
    # 0=no-formal, 1=primary, 2=secondary, 3=high-school, 4=diploma, 5=bachelor, 6=master, 7=phd
    parents_education = np.random.choice([0, 1, 2, 3, 4, 5, 6, 7], n, 
                                       p=[0.05, 0.1, 0.15, 0.25, 0.2, 0.15, 0.08, 0.02])
    
    # Family income categories (0-5)
    # 0=below-10k, 1=10k-25k, 2=25k-50k, 3=50k-75k, 4=75k-100k, 5=above-100k
    family_income = np.random.choice([0, 1, 2, 3, 4, 5], n,
                                   p=[0.1, 0.2, 0.3, 0.2, 0.15, 0.05])
    
    # Extracurricular activities count (0-10)
    extracurricular = np.random.poisson(2.5, n).clip(0, 10)
    
    # Behavior issues (0-4: excellent to severe)
    # 0=excellent, 1=good, 2=average, 3=concerning, 4=severe
    behavior_issues = np.random.choice([0, 1, 2, 3, 4], n,
                                     p=[0.3, 0.4, 0.2, 0.08, 0.02])
    
    # Generate dropout probability based on realistic factors
    # Higher risk factors:
    # - Low attendance
    # - Poor grades  
    # - Previous failures
    # - Parents with low education
    # - Low family income
    # - No extracurricular activities
    # - Behavior issues
    
    risk_score = (
        0.3 * (100 - attendance_percent) / 100 +      # Attendance impact (30%)
        0.25 * (100 - avg_marks) / 100 +              # Academic performance (25%)
        0.2 * prev_failures / 3 +                     # Previous failures (20%)
        0.1 * (4 - parents_education) / 7 +           # Parents education (10%)
        0.05 * (5 - family_income) / 5 +              # Family income (5%)
        0.05 * (3 - extracurricular.clip(0, 3)) / 3 + # Extracurricular (5%)
        0.05 * behavior_issues / 4                    # Behavior issues (5%)
    )
    
    # Convert to probability using sigmoid function
    dropout_prob = 1 / (1 + np.exp(-4 * (risk_score - 0.5)))
    
    # Generate binary dropout labels
    dropout = np.random.binomial(1, np.clip(dropout_prob, 0.05, 0.95), n)
    
    # Create DataFrame with exact frontend structure
    df = pd.DataFrame({
        'age': age.astype(int),
        'attendance_percent': np.round(attendance_percent, 1),
        'avg_marks': np.round(avg_marks, 1),
        'prev_failures': prev_failures.astype(int),
        'parents_education': parents_education.astype(int),
        'family_income': family_income.astype(int),
        'extracurricular': extracurricular.astype(int),
        'behavior_issues': behavior_issues.astype(int),
        'dropout': dropout.astype(int)
    })
    
    return df


def print_data_summary(df):
    """Print comprehensive summary statistics of the generated data"""
    print("=" * 60)
    print("SYNTHETIC STUDENT DATA SUMMARY")
    print("=" * 60)
    
    print(f"Dataset shape: {df.shape}")
    print(f"Total samples: {len(df)}")
    
    print(f"\nTarget Distribution:")
    dropout_counts = df['dropout'].value_counts().sort_index()
    for label, count in dropout_counts.items():
        risk_name = "Low Risk (No Dropout)" if label == 0 else "High Risk (Dropout)"
        percentage = count/len(df)*100
        print(f"  {risk_name}: {count:,} ({percentage:.1f}%)")
    
    print(f"\nFeature Distributions:")
    print(f"  Age range: {df['age'].min()}-{df['age'].max()} years")
    print(f"  Attendance: {df['attendance_percent'].min():.1f}-{df['attendance_percent'].max():.1f}%")
    print(f"  Average marks: {df['avg_marks'].min():.1f}-{df['avg_marks'].max():.1f}%")
    print(f"  Previous failures: {df['prev_failures'].min()}-{df['prev_failures'].max()}")
    print(f"  Parents education: {df['parents_education'].min()}-{df['parents_education'].max()}")
    print(f"  Family income: {df['family_income'].min()}-{df['family_income'].max()}")
    print(f"  Extracurricular activities: {df['extracurricular'].min()}-{df['extracurricular'].max()}")
    print(f"  Behavior issues: {df['behavior_issues'].min()}-{df['behavior_issues'].max()}")
    
    print(f"\nFeature Mappings (matches React frontend):")
    print(f"  prev_failures: 0=none, 1=one, 2=two, 3=multiple")
    print(f"  parents_education: 0=no-formal, 1=primary, ..., 7=phd")
    print(f"  family_income: 0=below-10k, 1=10k-25k, ..., 5=above-100k")
    print(f"  extracurricular: count of activities (0-10)")
    print(f"  behavior_issues: 0=excellent, 1=good, 2=average, 3=concerning, 4=severe")
    
    print(f"\nData Quality Checks:")
    print(f"  Missing values: {df.isnull().sum().sum()}")
    print(f"  Duplicate rows: {df.duplicated().sum()}")
    print(f"  Memory usage: {df.memory_usage(deep=True).sum() / 1024:.1f} KB")
    
    print(f"\nData Types (all should be int64 or float64):")
    for col in df.columns:
        print(f"  {col:<20}: {df[col].dtype}")
    
    print("=" * 60)


def validate_frontend_compatibility(df):
    """Validate that generated data matches frontend expectations exactly"""
    print("\n" + "=" * 60)
    print("FRONTEND COMPATIBILITY VALIDATION")
    print("=" * 60)
    
    # Expected structure from React frontend
    expected_columns = [
        'age', 'attendance_percent', 'avg_marks', 'prev_failures',
        'parents_education', 'family_income', 'extracurricular', 
        'behavior_issues', 'dropout'
    ]
    
    # Check column structure
    if list(df.columns) == expected_columns:
        print(" Column structure matches frontend exactly")
    else:
        print(" Column structure mismatch!")
        print(f"Expected: {expected_columns}")
        print(f"Got: {list(df.columns)}")
        return False
    
    # Check value ranges
    checks = [
        ('age', df['age'].min() >= 16 and df['age'].max() <= 25),
        ('attendance_percent', df['attendance_percent'].min() >= 0 and df['attendance_percent'].max() <= 100),
        ('avg_marks', df['avg_marks'].min() >= 0 and df['avg_marks'].max() <= 100),
        ('prev_failures', df['prev_failures'].min() >= 0 and df['prev_failures'].max() <= 3),
        ('parents_education', df['parents_education'].min() >= 0 and df['parents_education'].max() <= 7),
        ('family_income', df['family_income'].min() >= 0 and df['family_income'].max() <= 5),
        ('extracurricular', df['extracurricular'].min() >= 0 and df['extracurricular'].max() <= 10),
        ('behavior_issues', df['behavior_issues'].min() >= 0 and df['behavior_issues'].max() <= 4),
        ('dropout', set(df['dropout'].unique()).issubset({0, 1}))
    ]
    
    all_passed = True
    for feature, passed in checks:
        status = "" if passed else ""
        print(f"  {status} {feature} range validation")
        if not passed:
            all_passed = False
    
    if all_passed:
        print("\n ALL FRONTEND COMPATIBILITY CHECKS PASSED!")
        print(" Data is ready for ML model training")
        print(" Compatible with React form submission")
        print(" Matches Flask backend expectations")
    else:
        print("\n Some compatibility checks failed!")
    
    print("=" * 60)
    return all_passed


if __name__ == "__main__":
    print(" Generating synthetic student data...")
    print(" Creating dataset with perfect frontend compatibility...")
    
    # Generate the data
    df = make_data(n=3000, seed=42)
    
    # Print comprehensive summary
    print_data_summary(df)
    
    # Validate frontend compatibility
    is_compatible = validate_frontend_compatibility(df)
    
    if not is_compatible:
        print(" Data generation failed compatibility checks!")
        exit(1)
    
    # Save to CSV file
    output_path = os.path.join(os.path.dirname(__file__), "..", "data", "synthetic_student_data.csv")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    df.to_csv(output_path, index=False)
    print(f"\n Dataset saved to: {output_path}")
    
    # Verify the saved file
    print("\n Verifying saved file...")
    try:
        loaded_df = pd.read_csv(output_path)
        
        if loaded_df.shape == df.shape and all(loaded_df.columns == df.columns):
            print(" File verification passed!")
            print(f" {len(df):,} samples ready for model training")
            print(" Data structure matches frontend exactly!")
        else:
            print(" File verification failed!")
            exit(1)
            
    except Exception as e:
        print(f" File verification error: {e}")
        exit(1)
    
    # Success message and next steps
    print("SUCCESS: SYNTHETIC DATA GENERATION COMPLETE!")
    
    print("\n Next steps:")
    print("1. Train model: python train_model_updated.py")
    print("2. Test integration: python test_model_integration.py")
    print("3. Start Flask backend: python app.py")
    print("4. Test React form submission")
    
    print("\n Your AI student dropout prediction system is ready!")
    print(" Perfect for LinkedIn and resume showcase!")
