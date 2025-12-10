import React, { useState, useEffect } from 'react';
import { HelpCircle, BarChart2, ImageIcon } from 'lucide-react';
import { MAX_GUESSES, WIN_MARGIN } from './constants';
import { getDailyWar, calculateAccuracy } from './utils';
import { War, Guess, GameStatus, DailyStats } from './types';
import GuessRow from './components/GuessRow';
import ResultModal from './components/ResultModal';
import InfoModal from './components/InfoModal';
import StatsModal from './components/StatsModal';

function App() {
  const [targetWar, setTargetWar] = useState<War | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [showResult, setShowResult] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Game
    const dailyWar = getDailyWar();
    setTargetWar(dailyWar);
    
    // Check local storage for today's state
    const today = new Date().toISOString().slice(0, 10);
    const savedState = localStorage.getItem(`warle_${today}`);
    
    if (savedState) {
        const parsed = JSON.parse(savedState);
        setGuesses(parsed.guesses);
        setGameStatus(parsed.status);
        if (parsed.status !== GameStatus.PLAYING) {
            setShowResult(true);
        }
    } else {
        setShowInfo(true); // Show info for new game/day
    }
  }, []);

  const updateStats = (isWin: boolean) => {
      const today = new Date().toISOString().slice(0, 10);
      const statsStr = localStorage.getItem('warle_stats');
      const stats: DailyStats = statsStr ? JSON.parse(statsStr) : {
          gamesPlayed: 0,
          wins: 0,
          winStreak: 0,
          maxStreak: 0,
          lastPlayedDate: null
      };

      // Prevent double counting if function called multiple times for same day
      if (stats.lastPlayedDate === today) return;

      stats.gamesPlayed += 1;
      stats.lastPlayedDate = today;

      if (isWin) {
          stats.wins += 1;
          stats.winStreak += 1;
          stats.maxStreak = Math.max(stats.maxStreak, stats.winStreak);
      } else {
          stats.winStreak = 0;
      }

      localStorage.setItem('warle_stats', JSON.stringify(stats));
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameStatus !== GameStatus.PLAYING || !targetWar) return;

    setErrorMessage(null);

    // Parse input support for k, m, b suffixes
    const cleanInput = currentInput.toLowerCase().replace(/,/g, '').trim();
    let val = NaN;
    let multiplier = 1;
    let numStr = cleanInput;

    if (cleanInput.endsWith('k')) {
        multiplier = 1000;
        numStr = cleanInput.slice(0, -1);
    } else if (cleanInput.endsWith('m')) {
        multiplier = 1000000;
        numStr = cleanInput.slice(0, -1);
    } else if (cleanInput.endsWith('b')) {
        multiplier = 1000000000;
        numStr = cleanInput.slice(0, -1);
    }

    // Strict check to ensure the remaining string is a valid number
    if (!/^-?\d*\.?\d+$/.test(numStr)) {
         setErrorMessage("Invalid format. Use numbers or 'k'/'m' (e.g., 150k).");
         return;
    }

    const floatVal = parseFloat(numStr);
    
    if (isNaN(floatVal)) {
         setErrorMessage("Please enter a valid number.");
         return;
    }

    val = Math.floor(floatVal * multiplier);
    
    if (val < 0) {
        setErrorMessage("Death toll cannot be negative.");
        return;
    }

    // Calculate Logic
    const diffPercent = Math.abs(targetWar.deaths - val) / targetWar.deaths;
    let direction: 'higher' | 'lower' | 'correct' = 'correct';
    
    if (diffPercent <= WIN_MARGIN) {
        direction = 'correct';
    } else if (val < targetWar.deaths) {
        direction = 'higher';
    } else {
        direction = 'lower';
    }

    const newGuess: Guess = {
        value: val,
        direction,
        accuracy: calculateAccuracy(targetWar.deaths, val)
    };

    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentInput('');

    // Check Win/Loss
    let newStatus = GameStatus.PLAYING;
    if (direction === 'correct') {
        newStatus = GameStatus.WON;
    } else if (newGuesses.length >= MAX_GUESSES) {
        newStatus = GameStatus.LOST;
    }

    setGameStatus(newStatus);
    
    if (newStatus !== GameStatus.PLAYING) {
        updateStats(newStatus === GameStatus.WON);
        setTimeout(() => setShowResult(true), 1500);
    }

    // Save state
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(`warle_${today}`, JSON.stringify({
        guesses: newGuesses,
        status: newStatus
    }));
  };

  if (!targetWar) return <div className="h-screen bg-[#121213] flex items-center justify-center text-white">Loading Operation...</div>;

  return (
    <div className="min-h-screen bg-[#121213] text-white flex flex-col font-sans">
      
      {/* Header */}
      <header className="border-b border-war-gray p-4 flex items-center justify-between max-w-lg mx-auto w-full">
        <button onClick={() => setShowInfo(true)} className="text-gray-400 hover:text-white transition-colors">
            <HelpCircle className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold font-mono tracking-tighter text-war-green uppercase">The Warle</h1>
        <button onClick={() => setShowStats(true)} className="text-gray-400 hover:text-white transition-colors">
            <BarChart2 className="w-6 h-6" />
        </button>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col">
        
        {/* Target Info */}
        <div className="flex flex-col items-center mb-6 mt-2">
            <h2 className="text-2xl font-bold text-white mb-1 text-center">{targetWar.name}</h2>
            <div className="inline-block bg-war-gray/30 px-3 py-1 rounded text-sm text-gray-300 font-mono mb-4 border border-war-gray/50">
                {targetWar.years}
            </div>

            <div className="w-full flex flex-col gap-4">
                {targetWar.imageUrl ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-war-gray shadow-lg shadow-black/50 group">
                        <img 
                            src={targetWar.imageUrl} 
                            alt={targetWar.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#121213] via-transparent to-transparent opacity-30 pointer-events-none"></div>
                    </div>
                ) : (
                    <div className="w-full aspect-video bg-war-gray/10 rounded-lg border border-war-gray/30 flex flex-col items-center justify-center gap-3">
                        <ImageIcon className="w-8 h-8 text-gray-600" />
                        <span className="text-xs text-gray-500 uppercase tracking-widest">No Intel Available</span>
                    </div>
                )}

                <div className="bg-war-gray/10 border-l-2 border-war-green p-3 rounded-r">
                        <p className="text-sm text-gray-300 font-sans leading-relaxed">
                        {targetWar.description}
                        </p>
                </div>
            </div>
        </div>

        {/* Guesses Board */}
        <div className="flex-1 mb-4">
            {guesses.map((g, i) => (
                <GuessRow key={i} guess={g} target={targetWar.deaths} />
            ))}
            {/* Empty slots */}
            {Array.from({ length: Math.max(0, MAX_GUESSES - guesses.length) }).map((_, i) => (
                <GuessRow key={`empty-${i}`} />
            ))}
        </div>

        {/* Input Area */}
        <div className="mb-8">
            <form onSubmit={handleGuess} className="relative">
                <input 
                    type="text" 
                    value={currentInput}
                    onChange={(e) => {
                        setCurrentInput(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Enter death toll (e.g. 150k, 1.5m)..."
                    disabled={gameStatus !== GameStatus.PLAYING}
                    className={`w-full bg-[#121213] border-2 ${errorMessage ? 'border-war-red' : 'border-war-gray'} rounded-lg py-4 px-4 text-center text-xl font-mono font-bold focus:border-war-green focus:outline-none transition-colors disabled:opacity-50 placeholder:text-gray-700 placeholder:text-base placeholder:font-sans`}
                    autoFocus
                    autoComplete="off"
                />
                <button 
                    type="submit"
                    disabled={!currentInput || gameStatus !== GameStatus.PLAYING}
                    className="absolute right-2 top-2 bottom-2 bg-war-gray hover:bg-war-green text-white px-4 rounded font-bold uppercase text-sm tracking-wider transition-all disabled:opacity-0 disabled:pointer-events-none"
                >
                    Guess
                </button>
            </form>
            {errorMessage ? (
                 <p className="text-center text-war-red text-sm mt-3 font-bold animate-pulse">
                    {errorMessage}
                </p>
            ) : (
                <p className="text-center text-gray-600 text-xs mt-3 uppercase tracking-widest">
                    Guess {guesses.length + 1} of {MAX_GUESSES}
                </p>
            )}
        </div>
      </main>

      {/* Modals */}
      {showResult && targetWar && (
        <ResultModal 
            status={gameStatus} 
            war={targetWar} 
            guesses={guesses}
            onClose={() => setShowResult(false)} 
        />
      )}
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
      {showStats && <StatsModal onClose={() => setShowStats(false)} />}
    </div>
  );
}

export default App;