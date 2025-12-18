// lib/api/wakatime.ts

import { WakaTimeStats } from '@/types/streaks';

// WakaTime user ID - the UUID from the URL
const WAKATIME_USER_ID = '55dcc4cb-eb6f-4b98-8827-476c1997d057';
const CACHE_KEY = 'wakatime_streak_cache';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedData {
  data: WakaTimeStats;
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

function setCache(data: WakaTimeStats): void {
  if (typeof window === 'undefined') return;
  
  const cacheData: CachedData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

export async function fetchWakaTimeStats(): Promise<WakaTimeStats> {
  // Check cache first
  const cached = getCache();
  if (cached) {
    return cached.data;
  }

  try {
    // WakaTime public stats endpoint
    const response = await fetch(
      `https://wakatime.com/api/v1/users/${WAKATIME_USER_ID}/stats/last_7_days`
    );

    if (!response.ok) {
      // Try alternate endpoint with @
      const altResponse = await fetch(
        `https://wakatime.com/api/v1/users/@${WAKATIME_USER_ID}/stats/last_7_days`
      );
      
      if (!altResponse.ok) {
        throw new Error('Failed to fetch WakaTime data');
      }
      
      const altData = await altResponse.json();
      return processWakaTimeData(altData);
    }

    const data = await response.json();
    return processWakaTimeData(data);
  } catch (error) {
    console.error('WakaTime API error:', error);
    // Return fallback - will be fetched via API route
    return {
      streak: 0,
      totalHours: 0,
      dailyAverage: '0h 0m',
      topLanguage: 'N/A',
    };
  }
}

function processWakaTimeData(data: any): WakaTimeStats {
  const statsData = data.data || data;
  
  // Calculate total hours from the response
  const totalSeconds = statsData.total_seconds || 0;
  const totalHours = Math.round(totalSeconds / 3600);
  
  // Daily average
  const dailyAvgSeconds = statsData.daily_average || 0;
  const dailyHours = Math.floor(dailyAvgSeconds / 3600);
  const dailyMins = Math.floor((dailyAvgSeconds % 3600) / 60);
  const dailyAverage = `${dailyHours}h ${dailyMins}m`;
  
  // Top language
  const languages = statsData.languages || [];
  const topLanguage = languages.length > 0 ? languages[0].name : 'N/A';
  
  // WakaTime doesn't have a traditional streak, use days coded in the period
  const daysWithCoding = statsData.days_including_holidays || 
                         statsData.days_minus_holidays || 
                         7; // Default to week if not available

  const stats: WakaTimeStats = {
    streak: daysWithCoding,
    totalHours: totalHours,
    dailyAverage: dailyAverage,
    topLanguage: topLanguage,
  };

  setCache(stats);
  return stats;
}

// Alternative: Fetch via your API route to avoid CORS
export async function fetchWakaTimeViaProxy(): Promise<WakaTimeStats> {
  const cached = getCache();
  if (cached) {
    return cached.data;
  }

  try {
    const response = await fetch('/api/wakatime');
    if (!response.ok) {
      throw new Error('Failed to fetch WakaTime data');
    }
    
    const data = await response.json();
    setCache(data);
    return data;
  } catch (error) {
    console.error('WakaTime proxy error:', error);
    return {
      streak: 0,
      totalHours: 0,
      dailyAverage: '0h 0m',
      topLanguage: 'N/A',
    };
  }
}