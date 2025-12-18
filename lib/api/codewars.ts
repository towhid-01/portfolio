// lib/api/codewars.ts

import { CodeWarsStats } from '@/types/streaks';

const CODEWARS_USERNAME = 'towhid-01';
const CACHE_KEY = 'codewars_streak_cache';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedData {
  data: CodeWarsStats;
  timestamp: number;
}

function getCache(): CachedData | null {
  if (typeof window === 'undefined') return null;
  
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;
  
  try {
    const parsed: CachedData = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

function setCache(data: CodeWarsStats): void {
  if (typeof window === 'undefined') return;
  
  const cacheData: CachedData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

export async function fetchCodeWarsStats(): Promise<CodeWarsStats> {
  // Check cache first
  const cached = getCache();
  if (cached) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${CODEWARS_USERNAME}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch CodeWars data');
    }

    const data = await response.json();

    // CodeWars doesn't have a streak feature, so we use honor as the main metric
    // and completed kata count
    const rank = data.ranks?.overall?.name || 'New';
    const honor = data.honor || 0;
    const totalCompleted = data.codeChallenges?.totalCompleted || 0;

    const stats: CodeWarsStats = {
      streak: honor, // Using honor as the "streak" equivalent for display
      rank: rank,
      honor: honor,
      totalCompleted: totalCompleted,
    };

    setCache(stats);
    return stats;
  } catch (error) {
    console.error('CodeWars API error:', error);
    return {
      streak: 0,
      rank: 'Error',
      honor: 0,
      totalCompleted: 0,
    };
  }
}