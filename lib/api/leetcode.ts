// lib/api/leetcode.ts

import { LeetCodeStats } from '@/types/streaks';

const LEETCODE_USERNAME = '_PrEdAToR_';
const CACHE_KEY = 'leetcode_streak_cache';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedData {
  data: LeetCodeStats;
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

function setCache(data: LeetCodeStats): void {
  if (typeof window === 'undefined') return;
  
  const cacheData: CachedData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

// Fetch via API route to avoid CORS
export async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  // Check cache first
  const cached = getCache();
  if (cached) {
    return cached.data;
  }

  try {
    // Use our API route to proxy the request
    const response = await fetch('/api/leetcode');
    
    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode data');
    }

    const data = await response.json();
    setCache(data);
    return data;
  } catch (error) {
    console.error('LeetCode API error:', error);
    return {
      streak: 0,
      totalSolved: 0,
      ranking: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
    };
  }
}

// Direct fetch (for server-side or API route use)
export async function fetchLeetCodeStatsDirect(): Promise<LeetCodeStats> {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
        userCalendar {
          streak
          totalActiveDays
        }
      }
    }
  `;

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
    });

    if (!response.ok) {
      throw new Error('LeetCode GraphQL request failed');
    }

    const result = await response.json();
    const user = result.data?.matchedUser;

    if (!user) {
      throw new Error('User not found');
    }

    const submissions = user.submitStats?.acSubmissionNum || [];
    const easy = submissions.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const medium = submissions.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const hard = submissions.find((s: any) => s.difficulty === 'Hard')?.count || 0;
    const total = submissions.find((s: any) => s.difficulty === 'All')?.count || (easy + medium + hard);

    return {
      streak: user.userCalendar?.streak || 0,
      totalSolved: total,
      ranking: user.profile?.ranking || 0,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
    };
  } catch (error) {
    console.error('LeetCode direct fetch error:', error);
    return {
      streak: 0,
      totalSolved: 0,
      ranking: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
    };
  }
}