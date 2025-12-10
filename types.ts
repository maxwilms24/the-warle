export interface War {
  id: string;
  name: string;
  years: string;
  deaths: number; // The target number
  description: string;
}

export interface Guess {
  value: number;
  direction: 'higher' | 'lower' | 'correct';
  accuracy: number; // 0 to 100 scale of closeness
}

export enum GameStatus {
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
}

export interface DailyStats {
  gamesPlayed: number;
  wins: number;
  winStreak: number;
  maxStreak: number;
  lastPlayedDate: string | null;
}