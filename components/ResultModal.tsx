import React, { useEffect, useState } from 'react';
import { X, Share2, Award, Skull, Check } from 'lucide-react';
import { War, GameStatus, Guess } from '../types';
import { formatNumber } from '../utils';
import { getWarContext } from '../services/geminiService';
import { MAX_GUESSES } from '../constants';

interface ResultModalProps {
  status: GameStatus;
  war: War;
  guesses: Guess[];
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ status, war, guesses, onClose }) => {
  const [context, setContext] = useState<string>('Loading historical context...');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchContext = async () => {
      const text = await getWarContext(war);
      setContext(text);
    };
    fetchContext();
  }, [war]);

  const handleShare = () => {
    const isWin = status === GameStatus.WON;
    const guessCount = isWin ? guesses.length : 'X';
    const lastGuess = guesses[guesses.length - 1];
    const accuracy = lastGuess ? lastGuess.accuracy : 0;

    const squares = guesses.map(g => {
        if (g.direction === 'correct') return '🟩';
        const diff = Math.abs(war.deaths - g.value) / war.deaths;
        if (diff < 0.25) return '🟨';
        return '⬛';
    }).join('');
    
    const text = `The Warle ${new Date().toISOString().slice(0, 10)}\nGuesses: ${guessCount}/${MAX_GUESSES}\nAccuracy: ${accuracy}%\n${squares}\nhttps://the-warle.vercel.app`;
    
    navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  const lastGuess = guesses[guesses.length - 1];
  const finalAccuracy = lastGuess ? lastGuess.accuracy : 0;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-[#121213] border border-war-gray rounded-lg max-w-md w-full p-6 relative shadow-2xl shadow-black max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          {status === GameStatus.WON ? (
            <div className="flex flex-col items-center">
                <Award className="w-16 h-16 text-war-green mb-2" />
                <h2 className="text-3xl font-bold text-white mb-1">Victory</h2>
                <p className="text-war-green font-mono">Mission Accomplished</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
                <Skull className="w-16 h-16 text-war-red mb-2" />
                <h2 className="text-3xl font-bold text-white mb-1">Defeat</h2>
                <p className="text-war-red font-mono">Casualty Count Mismatch</p>
            </div>
          )}
        </div>

        <div className="bg-war-gray/20 rounded-lg p-4 mb-6 text-center border border-war-gray/50">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">The Conflict</p>
          <h3 className="text-xl font-bold text-white">{war.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{war.years}</p>
          
          <div className="py-3 border-t border-war-gray/50">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total Deaths</p>
            <p className="text-3xl font-mono font-bold text-war-yellow">{formatNumber(war.deaths)}</p>
          </div>

          <div className="pt-3 border-t border-war-gray/50 flex justify-center gap-8">
              <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Guesses</p>
                  <p className="text-xl font-mono font-bold text-white">
                      {status === GameStatus.WON ? guesses.length : 'X'}/{MAX_GUESSES}
                  </p>
              </div>
              <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Accuracy</p>
                  <p className={`text-xl font-mono font-bold ${finalAccuracy > 90 ? 'text-war-green' : 'text-white'}`}>
                      {finalAccuracy}%
                  </p>
              </div>
          </div>
        </div>

        <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                <span>🤖</span> AI Historical Briefing
            </h4>
            <div className="text-sm text-gray-400 italic bg-black/30 p-3 rounded border-l-2 border-purple-500">
                {context}
            </div>
        </div>

        <button 
          onClick={handleShare}
          className={`w-full font-bold py-3 rounded flex items-center justify-center gap-2 transition-colors uppercase tracking-widest ${copied ? 'bg-white text-black' : 'bg-war-green hover:bg-green-600 text-white'}`}
        >
          {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
          {copied ? 'Copied to Clipboard' : 'Share Result'}
        </button>
      </div>
    </div>
  );
};

export default ResultModal;