import React from 'react';
import { ArrowUp, ArrowDown, Check, X } from 'lucide-react';
import { Guess, War } from '../types';
import { formatNumber } from '../utils';

interface GuessRowProps {
  guess?: Guess;
  target?: number;
}

const GuessRow: React.FC<GuessRowProps> = ({ guess, target }) => {
  if (!guess) {
    return (
      <div className="w-full h-14 border-2 border-war-gray rounded mb-2 bg-transparent flex items-center justify-center animate-pulse opacity-50">
      </div>
    );
  }

  // Determine styling based on accuracy/closeness
  let bgColor = 'bg-war-gray';
  let borderColor = 'border-war-gray';
  
  const percentDiff = target ? Math.abs(target - guess.value) / target : 1;

  if (guess.direction === 'correct') {
    bgColor = 'bg-war-green';
    borderColor = 'border-war-green';
  } else if (percentDiff < 0.25) {
    // Within 25% is yellow (close)
    bgColor = 'bg-war-yellow';
    borderColor = 'border-war-yellow';
  }

  return (
    <div className={`w-full h-14 border-2 ${borderColor} ${bgColor} rounded mb-2 flex items-center justify-between px-4 text-white transition-all duration-500 ease-out transform`}>
      <span className="font-mono font-bold text-lg">{formatNumber(guess.value)}</span>
      
      <div className="flex items-center gap-2">
        {guess.direction === 'correct' && <Check className="w-6 h-6" />}
        {guess.direction === 'higher' && (
          <div className="flex items-center text-white/90">
             <span className="text-xs uppercase mr-2 font-bold tracking-wider opacity-75">Higher</span>
             <ArrowUp className="w-6 h-6 animate-bounce" />
          </div>
        )}
        {guess.direction === 'lower' && (
           <div className="flex items-center text-white/90">
            <span className="text-xs uppercase mr-2 font-bold tracking-wider opacity-75">Lower</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
         </div>
        )}
      </div>
    </div>
  );
};

export default GuessRow;