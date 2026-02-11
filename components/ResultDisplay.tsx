
import React from 'react';
import { CheckCircle2, XCircle, Info, TrendingUp, ThumbsUp, ThumbsDown } from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultDisplayProps {
  result: PredictionResult;
  onFinalAction: (decision: 'ACCEPTED' | 'REJECTED') => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onFinalAction }) => {
  const isSuggestedAccept = result.ai_recommendation === 'ACCEPT';
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className={`px-6 py-3 flex items-center justify-between bg-slate-800`}>
          <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs">AI Risk Prediction</h3>
          <span className="text-slate-400 text-[10px] font-mono">
            REF: {Math.random().toString(36).substring(7).toUpperCase()}
          </span>
        </div>
        
        <div className="p-6 text-center space-y-4">
          <div className="flex justify-center mb-2">
            {isSuggestedAccept ? (
              <div className="bg-green-50 p-4 rounded-full border-2 border-green-200">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
            ) : (
              <div className="bg-red-50 p-4 rounded-full border-2 border-red-200">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
            )}
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Recommendation</p>
            <h2 className={`text-3xl font-black ${isSuggestedAccept ? 'text-green-600' : 'text-red-600'}`}>
              {result.ai_recommendation}
            </h2>
            <div className={`mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
              result.risk_level === 'Low' ? 'bg-green-100 text-green-700' : 
              result.risk_level === 'Medium' ? 'bg-amber-100 text-amber-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {result.risk_level} Risk Level
            </div>
          </div>

          <div className="pt-4 px-4">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-tighter">
              <span>Fraud Probability</span>
              <span>{result.fraud_probability}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${isSuggestedAccept ? 'bg-green-500' : 'bg-red-500'}`} 
                style={{ width: `${result.fraud_probability}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 p-4 bg-slate-50 grid grid-cols-2 gap-3">
          <button 
            onClick={() => onFinalAction('ACCEPTED')}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-all active:scale-95"
          >
            <ThumbsUp size={16} /> Accept
          </button>
          <button 
            onClick={() => onFinalAction('REJECTED')}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-all active:scale-95"
          >
            <ThumbsDown size={16} /> Reject
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
          <Info size={14} className="text-blue-500" />
          Model Logic
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed italic">
          "{result.reasoning}"
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
          <TrendingUp size={14} className="text-blue-500" />
          Feature Drift Impact
        </h4>
        <div className="space-y-3">
          {result.top_features.map((feat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[10px] font-medium text-slate-600">
                <span>{feat.feature}</span>
                <span className={feat.impact > 0 ? 'text-red-500' : 'text-green-500'}>
                  {feat.impact > 0 ? '+' : ''}{(feat.impact * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-50 rounded-full h-1 overflow-hidden">
                <div 
                  className={`h-1 rounded-full ${feat.impact > 0 ? 'bg-red-300' : 'bg-green-300'}`}
                  style={{ width: `${Math.abs(feat.impact) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
