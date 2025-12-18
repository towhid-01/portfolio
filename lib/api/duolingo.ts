// lib/api/duolingo.ts

import { DuolingoStats } from '@/types/streaks';

const DUOLINGO_USERNAME = 'Towhid_0';
const CACHE_KEY = 'duolingo_streak_cache';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedData {
  data: DuolingoStats;
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

function setCache(data: DuolingoStats): void {
  if (typeof window === 'undefined') return;
  
  const cacheData: CachedData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

// Fetch via API route to avoid CORS
export async function fetchDuolingoStats(): Promise<DuolingoStats> {
  // Check cache first
  const cached = getCache();
  if (cached) {
    return cached.data;
  }

  try {
    // Use our API route to proxy the request
    const response = await fetch('/api/duolingo');
    
    if (!response.ok) {
      throw new Error('Failed to fetch Duolingo data');
    }

    const data = await response.json();
    setCache(data);
    return data;
  } catch (error) {
    console.error('Duolingo API error:', error);
    return {
      streak: 0,
      totalXp: 0,
      currentLanguage: 'N/A',
    };
  }
}

// Direct fetch (for server-side or API route use)
export async function fetchDuolingoStatsDirect(): Promise<DuolingoStats> {
  try {
    // Unofficial but working Duolingo API endpoint
    const response = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${DUOLINGO_USERNAME}&fields=streak,streakData%7BcurrentStreak,previousStreak%7D,totalXp,currentCourseId`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Duolingo API request failed');
    }

    const data = await response.json();
    const user = data.users?.[0];

    if (!user) {
      throw new Error('User not found');
    }

    // Get the maximum streak value from available fields
    const streak = Math.max(
      user.streak ?? 0,
      user.streakData?.currentStreak?.length ?? 0,
      user.streakData?.previousStreak?.length ?? 0
    );

    return {
      streak: streak,
      totalXp: user.totalXp || 0,
      currentLanguage: user.currentCourseId || 'Unknown',
    };
  } catch (error) {
    console.error('Duolingo direct fetch error:', error);
    return {
      streak: 0,
      totalXp: 0,
      currentLanguage: 'N/A',
    };
  }
}