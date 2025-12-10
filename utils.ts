import { WARS } from './constants';
import { War } from './types';

// Simple seeded random number generator
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export const getDailyWar = (): War => {
    const today = new Date();
    // Create a seed based on the date string (YYYY-MM-DD)
    const seedString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Simple hash function for the seed
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
        const char = seedString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    // Normalize index
    const index = Math.floor(Math.abs(seededRandom(hash)) * WARS.length);
    return WARS[index];
};

export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
};

export const formatCompactNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(num);
}

export const calculateAccuracy = (target: number, guess: number): number => {
    const diff = Math.abs(target - guess);
    const percentOff = diff / target;
    // Logarithmic scale for score: 
    // 0% off = 100 accuracy
    // 5% off = 95 accuracy
    // 50% off = 50 accuracy
    // 100% off or more = 0 accuracy (clamped)
    
    if (percentOff === 0) return 100;
    if (percentOff > 1) return 0;
    
    return Math.round((1 - percentOff) * 100);
};