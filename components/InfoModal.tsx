import React from 'react';
import { X, ArrowUp, ArrowDown, Check } from 'lucide-react';

interface InfoModalProps {
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-[#121213] border border-war-gray rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4 font-mono">Briefing</h2>
        
        <p className="text-gray-300 mb-4">
          Estimate the total death toll (military + civilian) of the daily conflict.
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center bg-war-gray rounded border border-war-gray">
               <ArrowUp className="w-5 h-5 text-white" />
             </div>
             <p className="text-sm text-gray-400">Guess is too low. Aim higher.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center bg-war-gray rounded border border-war-gray">
               <ArrowDown className="w-5 h-5 text-white" />
             </div>
             <p className="text-sm text-gray-400">Guess is too high. Aim lower.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center bg-war-yellow rounded border border-war-yellow">
               <span className="text-white font-bold">~</span>
             </div>
             <p className="text-sm text-gray-400">Within 25% margin. Very close.</p>
          </div>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center bg-war-green rounded border border-war-green">
               <Check className="w-5 h-5 text-white" />
             </div>
             <p className="text-sm text-gray-400">Correct! (Within 5% margin).</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
            New conflict available each day at midnight.
        </p>
      </div>
    </div>
  );
};

export default InfoModal;