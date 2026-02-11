
import React from 'react';
import { FileText, ChevronRight, Activity, Car } from 'lucide-react';
import { PredictionResult, PolicyType } from '../types';

interface HistoryLogProps {
  history: PredictionResult[];
}

const HistoryLog: React.FC<HistoryLogProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center">
        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-800">No evaluation history</h3>
        <p className="text-slate-500 text-sm">Completed assessments will be logged here with final human decisions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
        <h2 className="text-white font-bold">Investigation Audit Log</h2>
        <span className="text-[10px] font-mono text-slate-400">TOTAL ENTRIES: {history.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date / Type</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">AI Pred.</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Human Final</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Risk %</th>
              <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded">
                      {item.policy_type === PolicyType.AUTO ? <Car size={14} /> : <Activity size={14} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{new Date(item.timestamp).toLocaleDateString()}</p>
                      <p className="text-[10px] text-slate-400">{item.policy_type} Policy</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black italic ${item.ai_recommendation === 'ACCEPT' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.ai_recommendation}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                    item.final_decision === 'ACCEPTED' ? 'bg-green-500 text-white border-green-600' : 'bg-red-500 text-white border-red-600'
                  }`}>
                    {item.final_decision}
                  </span>
                </td>
                <td className="px-6 py-4 text-[10px] font-mono text-right text-slate-700">
                  {item.fraud_probability}%
                </td>
                <td className="px-6 py-4 text-right">
                  <ChevronRight size={14} className="text-slate-300 inline" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLog;
