
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBClassifier
import joblib
import os
import io

# Simulate the datasets from the provided CSV strings in the prompt
# Normally you would load these via pd.read_csv('automobile.csv') etc.

def get_automobile_data():
    # Placeholder to handle CSV string if needed, 
    # for simplicity in this generated code we define columns based on the prompt
    csv_data = """months_as_customer,age,policy_state,policy_deductable,policy_annual_premium,umbrella_limit,incident_type,collision_type,incident_severity,authorities_contacted,incident_state,incident_hour_of_the_day,number_of_vehicles_involved,property_damage,bodily_injuries,witnesses,police_report_available,total_claim_amount,injury_claim,property_claim,vehicle_claim,capital-gains,capital-loss,fraud_reported
328,48,OH,1000,1406.91,0,Single Vehicle Collision,Side Collision,Major Damage,Police,SC,5,1,YES,1,2,YES,71610,6510,13020,52080,53300,0,Y
228,42,IN,2000,1197.22,5000000,Vehicle Theft,?,Minor Damage,Police,VA,8,1,?,0,0,?,5070,780,780,3510,0,0,Y
134,29,OH,2000,1413.14,5000000,Multi-vehicle Collision,Rear Collision,Minor Damage,Police,NY,7,3,NO,2,3,NO,34650,7700,3850,23100,35100,0,N
256,41,IL,2000,1415.74,6000000,Single Vehicle Collision,Front Collision,Major Damage,Police,OH,5,1,?,1,2,NO,63400,6340,6340,50720,48900,-62400,Y"""
    return pd.read_csv(io.StringIO(csv_data))

def get_health_data():
    csv_data = """age,sex,bmi,children,smoker,region,charges
19,female,27.9,0,yes,southwest,16884.924
18,male,33.77,1,no,southeast,1725.5523
28,male,33,3,no,southeast,4449.462
33,male,22.705,0,no,northwest,21984.47061"""
    df = pd.read_csv(io.StringIO(csv_data))
    # Synthesize a 'fraud' column for health data for classification demonstration
    # In reality, fraud labels would be provided.
    df['fraud_reported'] = df['charges'].apply(lambda x: 'Y' if x > 20000 else 'N')
    return df

def train():
    print("Initializing Model Training...")
    
    # Load and clean Automobile Data
    auto_df = get_automobile_data()
    
    # Feature Engineering
    # Converting 'fraud_reported' to 0/1
    auto_df['target'] = auto_df['fraud_reported'].apply(lambda x: 1 if x == 'Y' else 0)
    
    # Drop irrelevant or redundant columns
    cols_to_drop = ['fraud_reported']
    auto_df = auto_df.drop(columns=cols_to_drop)
    
    # Handling categorical features
    cat_cols = auto_df.select_dtypes(include=['object']).columns
    le = LabelEncoder()
    for col in cat_cols:
        auto_df[col] = le.fit_transform(auto_df[col].astype(str))
    
    # Prepare features and target
    X = auto_df.drop(columns=['target'])
    y = auto_df['target']
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train XGBoost
    model = XGBClassifier(
        n_estimators=100,
        max_depth=5,
        learning_rate=0.1,
        random_state=42
    )
    model.fit(X_train, y_train)
    
    # Save the model and any metadata
    os.makedirs('model', exist_ok=True)
    joblib.dump(model, 'model/fraud_model.pkl')
    
    # Save column names for frontend compatibility
    joblib.dump(X.columns.tolist(), 'model/model_features.pkl')
    
    print(f"Model saved successfully to model/fraud_model.pkl. Feature count: {len(X.columns)}")

if __name__ == "__main__":
    train()
