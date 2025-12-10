import React, { useEffect, useState } from 'react';
import { X, Trophy, Flame, Target, BarChart2 } from 'lucide-react';
import { DailyStats } from '../types';

interface StatsModalProps {
  onClose: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ onClose }) => {
  const [stats, setStats] = useState<DailyStats>({
    gamesPlayed: 0,
    wins: 0,
    winStreak: 0,
    maxStreak: 0,
    lastPlayedDate: null
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('warle_stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.wins / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121213] border border-war-gray rounded-lg max-w-md w-full p-6 relative shadow-2xl shadow-black">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-6 justify-center">
            <BarChart2 className="w-6 h-6 text-war-green" />
            <h2 className="text-xl font-bold text-white font-mono uppercase tracking-widest">Statistics</h2>
        </div>

        <div className="flex justify-between gap-4 mb-8">
            <StatItem value={stats.gamesPlayed} label="Played" />
            <StatItem value={winPercentage} label="Win %" />
            <StatItem value={stats.winStreak} label="Current Streak" />
            <StatItem value={stats.maxStreak} label="Max Streak" />
        </div>

        {stats.gamesPlayed === 0 && (
            <div className="text-center text-gray-500 text-sm italic mb-4">
                No data recorded yet. Complete a game to see your stats!
            </div>
        )}

        <div className="border-t border-war-gray/30 pt-4 mt-4">
             <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Flame className={`w-4 h-4 ${stats.winStreak > 0 ? 'text-orange-500' : 'text-gray-600'}`} />
                <span>Keep the streak alive!</span>
             </div>
        </div>
      </div>
    </div>
  );
};

interface StatItemProps {
    value: number;
    label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
    <div className="flex flex-col items-center flex-1">
        <div className="text-3xl font-bold text-white font-mono mb-1">{value}</div>
        <div className="text-xs text-center text-gray-400 uppercase tracking-tight leading-tight">{label}</div>
    </div>
);

export default StatsModal;