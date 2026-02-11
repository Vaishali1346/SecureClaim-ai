
import React, { useState } from 'react';
import { ShieldCheck, Activity, History, LayoutDashboard, AlertCircle } from 'lucide-react';
import ClaimForm from './components/ClaimForm';
import ResultDisplay from './components/ResultDisplay';
import HistoryLog from './components/HistoryLog';
import { PredictionResult } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'evaluate' | 'history' | 'dashboard'>('evaluate');
  const [pendingResult, setPendingResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionResult[]>([]);

  const handlePredictionGenerated = (result: PredictionResult) => {
    setPendingResult(result);
  };

  const handleFinalDecision = (decision: 'ACCEPTED' | 'REJECTED') => {
    if (pendingResult) {
      const finalized = { ...pendingResult, final_decision: decision };
      setHistory(prev => [finalized, ...prev]);
      setPendingResult(null);
      setActiveTab('history');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold tracking-tight">SecureClaim <span className="text-blue-400">AI</span></span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab('evaluate')}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'evaluate' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                <Activity size={18} />
                <span>Evaluate Claim</span>
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'history' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                <History size={18} />
                <span>History Log</span>
              </button>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-slate-800 text-blue-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                <LayoutDashboard size={18} />
                <span>Model Stats</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'evaluate' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ClaimForm onResult={handlePredictionGenerated} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              {pendingResult ? (
                <ResultDisplay result={pendingResult} onFinalAction={handleFinalDecision} />
              ) : (
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-blue-50 p-4 rounded-full">
                    <Activity className="h-12 w-12 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">System Ready</h3>
                  <p className="text-slate-500 text-sm">Submit claim details for AI risk assessment. You will review the prediction before finalized submission.</p>
                </div>
              )}
              
              <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
                <h4 className="font-bold flex items-center gap-2 mb-3">
                  <AlertCircle size={20} className="text-blue-400" />
                  AI Reasoning Policy
                </h4>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  The model generates a recommendation based on feature weights. Final authority remains with the investigator.
                </p>
                <ul className="text-sm space-y-2 text-slate-300">
                  <li className="flex justify-between">
                    <span>Low Risk (&lt;35%)</span>
                    <span className="text-green-400 font-medium italic">Suggest Accept</span>
                  </li>
                  <li className="flex justify-between">
                    <span>High Risk (≥35%)</span>
                    <span className="text-red-400 font-medium italic">Suggest Reject</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && <HistoryLog history={history} />}
        
        {activeTab === 'dashboard' && (
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Model Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Model Accuracy</p>
                <p className="text-3xl font-bold text-blue-600">84.2%</p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">Precision</p>
                <p className="text-3xl font-bold text-green-600">79.5%</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-1">F1 Score</p>
                <p className="text-3xl font-bold text-purple-600">0.82</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-lg bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h4 className="font-bold mb-4">Confusion Matrix</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-slate-200 rounded">
                    <p className="text-xs text-slate-400">True Negative</p>
                    <p className="text-xl font-bold">142</p>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded">
                    <p className="text-xs text-slate-400">False Positive</p>
                    <p className="text-xl font-bold text-red-500">12</p>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded">
                    <p className="text-xs text-slate-400">False Negative</p>
                    <p className="text-xl font-bold text-red-500">18</p>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded">
                    <p className="text-xs text-slate-400">True Positive</p>
                    <p className="text-xl font-bold">28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} SecureClaim AI Enterprise. All rights reserved. Professional Fraud Investigation Toolkit.
        </div>
      </footer>
    </div>
  );
};

export default App;
