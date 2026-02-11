
import React, { useState } from 'react';
import { User, Shield, Zap, DollarSign, Loader2, Car, Activity } from 'lucide-react';
import { PolicyType, ClaimData, PredictionResult } from '../types';

interface ClaimFormProps {
  onResult: (result: PredictionResult) => void;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ onResult }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ClaimData>({
    months_as_customer: 120,
    age: 35,
    policy_type: PolicyType.AUTO,
    policy_state: 'NY',
    policy_deductable: 1000,
    policy_annual_premium: 1200,
    umbrella_limit: 0,
    incident_type: 'Single Vehicle Collision',
    collision_type: 'Front Collision',
    incident_severity: 'Minor Damage',
    authorities_contacted: 'Police',
    incident_state: 'NY',
    incident_hour_of_the_day: 14,
    number_of_vehicles_involved: 1,
    property_damage: 'NO',
    bodily_injuries: 0,
    witnesses: 1,
    police_report_available: 'YES',
    total_claim_amount: 5000,
    injury_claim: 500,
    property_claim: 500,
    vehicle_claim: 4000,
    capital_gains: 0,
    capital_loss: 0,
    bmi: 25.5,
    smoker: 'NO',
    children: 0,
    treatment_type: 'Outpatient'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI prediction
    setTimeout(() => {
      const isHealth = formData.policy_type === PolicyType.HEALTH;
      const prob = isHealth ? Math.floor(Math.random() * 45) : Math.floor(Math.random() * 100);
      
      const result: PredictionResult = {
        fraud_probability: prob,
        ai_recommendation: prob < 35 ? 'ACCEPT' : 'REJECT',
        risk_level: prob < 35 ? 'Low' : prob < 70 ? 'Medium' : 'High',
        timestamp: new Date().toISOString(),
        policy_type: formData.policy_type,
        top_features: isHealth ? [
          { feature: 'Treatment Consistency', impact: 0.18 },
          { feature: 'Provider History', impact: 0.12 },
          { feature: 'Policy Maturity', impact: -0.15 }
        ] : [
          { feature: 'Damage Severity', impact: 0.38 },
          { feature: 'Claim Velocity', impact: 0.22 },
          { feature: 'Authority Reporting', impact: -0.08 }
        ],
        reasoning: isHealth 
          ? `Medical billing audit suggests ${prob < 35 ? 'standard' : 'irregular'} claim patterns for a ${formData.age} year old client.`
          : `Incident forensics indicate ${prob < 35 ? 'consistent' : 'deviant'} loss patterns relative to the reported severity.`
      };
      onResult(result);
      setLoading(false);
    }, 1200);
  };

  const inputClass = "w-full rounded-md border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 transition-all outline-none border focus:ring-1";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1";

  const isAuto = formData.policy_type === PolicyType.AUTO;
  const isHealth = formData.policy_type === PolicyType.HEALTH;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap size={20} className="text-blue-400" />
          Claim Details
        </h2>
        <div className="flex gap-2">
           <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded ${isAuto ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
             <Car size={12} /> AUTO
           </span>
           <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded ${isHealth ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
             <Activity size={12} /> HEALTH
           </span>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2 border-b border-blue-50 pb-2">
            <User size={16} />
            Policy & Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Policy Type</label>
              <select name="policy_type" value={formData.policy_type} onChange={handleChange} className={inputClass}>
                <option value={PolicyType.AUTO}>Automobile</option>
                <option value={PolicyType.HEALTH}>Health</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tenure (Months)</label>
              <input type="number" name="months_as_customer" value={formData.months_as_customer} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          
          {isHealth && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>BMI</label>
                <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Smoker</label>
                <select name="smoker" value={formData.smoker} onChange={handleChange} className={inputClass}>
                  <option value="NO">No</option>
                  <option value="YES">Yes</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Children</label>
                <input type="number" name="children" value={formData.children} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Premium</label>
              <input type="number" name="policy_annual_premium" value={formData.policy_annual_premium} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Deductible</label>
              <input type="number" name="policy_deductable" value={formData.policy_deductable} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Umbrella Limit</label>
              <input type="number" name="umbrella_limit" value={formData.umbrella_limit} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2 border-b border-blue-50 pb-2">
            <Shield size={16} />
            Incident Context
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isAuto ? (
              <>
                <div>
                  <label className={labelClass}>Incident Type</label>
                  <select name="incident_type" value={formData.incident_type} onChange={handleChange} className={inputClass}>
                    <option>Single Vehicle Collision</option>
                    <option>Multi-vehicle Collision</option>
                    <option>Parked Car</option>
                    <option>Vehicle Theft</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Collision</label>
                  <select name="collision_type" value={formData.collision_type} onChange={handleChange} className={inputClass}>
                    <option>Front Collision</option>
                    <option>Rear Collision</option>
                    <option>Side Collision</option>
                    <option>Unknown</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className={labelClass}>Treatment</label>
                  <select name="treatment_type" value={formData.treatment_type} onChange={handleChange} className={inputClass}>
                    <option>Outpatient</option>
                    <option>Emergency Room</option>
                    <option>Inpatient Surgery</option>
                    <option>Specialist Consultation</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Severity</label>
                  <select name="incident_severity" value={formData.incident_severity} onChange={handleChange} className={inputClass}>
                    <option>Routine/Checkup</option>
                    <option>Minor Procedure</option>
                    <option>Critical Care</option>
                  </select>
                </div>
              </>
            )}
          </div>
          
          {isAuto && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Hour</label>
                <input type="number" name="incident_hour_of_the_day" value={formData.incident_hour_of_the_day} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Vehicles</label>
                <input type="number" name="number_of_vehicles_involved" value={formData.number_of_vehicles_involved} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Witnesses</label>
                <input type="number" name="witnesses" value={formData.witnesses} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Injuries</label>
                <input type="number" name="bodily_injuries" value={formData.bodily_injuries} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          )}

          {!isAuto && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Witnesses/Staff</label>
                <input type="number" name="witnesses" value={formData.witnesses} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hour</label>
                <input type="number" name="incident_hour_of_the_day" value={formData.incident_hour_of_the_day} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2 border-b border-blue-50 pb-2">
            <DollarSign size={16} />
            Financials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Total Claim</label>
              <input type="number" name="total_claim_amount" value={formData.total_claim_amount} onChange={handleChange} className={inputClass} />
            </div>
            {isAuto && (
              <div>
                <label className={labelClass}>Vehicle Portion</label>
                <input type="number" name="vehicle_claim" value={formData.vehicle_claim} onChange={handleChange} className={inputClass} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{isHealth ? 'Medical Procedure' : 'Injury Portion'}</label>
              <input type="number" name="injury_claim" value={formData.injury_claim} onChange={handleChange} className={inputClass} />
            </div>
            {isAuto && (
              <div>
                <label className={labelClass}>Property Portion</label>
                <input type="number" name="property_claim" value={formData.property_claim} onChange={handleChange} className={inputClass} />
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="bg-slate-50 px-6 py-4 flex justify-end">
        <button 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Generating AI Prediction...
            </>
          ) : (
            <>Run AI Evaluation</>
          )}
        </button>
      </div>
    </form>
  );
};

export default ClaimForm;
