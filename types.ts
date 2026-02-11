
export enum PolicyType {
  AUTO = 'Auto',
  HEALTH = 'Health'
}

export interface ClaimData {
  // General
  months_as_customer: number;
  age: number;
  policy_type: PolicyType;
  policy_state: string;
  policy_deductable: number;
  policy_annual_premium: number;
  umbrella_limit: number;
  
  // Incident - General
  incident_severity: string;
  authorities_contacted: string;
  incident_state: string;
  incident_hour_of_the_day: number;
  witnesses: number;
  police_report_available: string;
  
  // Auto Specific
  incident_type?: string;
  collision_type?: string;
  number_of_vehicles_involved?: number;
  property_damage?: string;
  bodily_injuries?: number;
  vehicle_claim?: number;

  // Health Specific
  bmi?: number;
  smoker?: string;
  children?: number;
  treatment_type?: string;

  // Financials
  total_claim_amount: number;
  injury_claim: number;
  property_claim: number;
  capital_gains: number;
  capital_loss: number;
}

export interface PredictionResult {
  fraud_probability: number;
  ai_recommendation: 'ACCEPT' | 'REJECT';
  risk_level: 'Low' | 'Medium' | 'High';
  top_features: Array<{feature: string, impact: number}>;
  reasoning: string;
  timestamp: string;
  final_decision?: 'ACCEPTED' | 'REJECTED'; // The human decision
  policy_type: PolicyType;
}
