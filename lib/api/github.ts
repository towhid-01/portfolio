// lib/api/github.ts

import { GitHubStats } from '@/types/streaks';

const GITHUB_USERNAME = 'towhid-01';
const CACHE_KEY = 'github_streak_cache';
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedData {
  data: GitHubStats;
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

function setCache(data: GitHubStats): void {
  if (typeof window === 'undefined') return;
  
  const cacheData: CachedData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
}

// Calculate streak from contribution data
function calculateStreak(contributions: { date: string; count: number }[]): {
  currentStreak: number;
  lastContributionDate: string;
} {
  if (!contributions || contributions.length === 0) {
    return { currentStreak: 0, lastContributionDate: '' };
  }

  // Sort by date descending (most recent first)
  const sorted = [...contributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let checkDate = new Date(today);
  let lastContributionDate = '';

  for (const contribution of sorted) {
    const contribDate = new Date(contribution.date);
    contribDate.setHours(0, 0, 0, 0);

    // Skip future dates
    if (contribDate > today) continue;

    // Check if this is the date we're looking for
    const diffDays = Math.floor(
      (checkDate.getTime() - contribDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      // Same day as checkDate
      if (contribution.count > 0) {
        streak++;
        if (!lastContributionDate) {
          lastContributionDate = contribution.date;
        }
        // Move to previous day
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (streak === 0) {
        // No contribution today, check yesterday
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // Streak broken
        break;
      }
    } else if (diffDays === 1 && streak === 0) {
      // Allow starting streak from yesterday if no contribution today yet
      if (contribution.count > 0) {
        streak++;
        lastContributionDate = contribution.date;
        checkDate = new Date(contribDate);
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } else if (diffDays > 1) {
      // Gap in contributions, streak is broken
      break;
    }
  }

  return { currentStreak: streak, lastContributionDate };
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  // Check cache first
  const cached = getCache();
  if (cached) {
    return cached.data;
  }

  try {
    // Use GitHub's GraphQL API for contribution data
    // Since we don't have a token, we'll use the public events API
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const events = await response.json();

    // Count contributions and build date map
    const contributionsByDate = new Map<string, number>();
    let totalContributions = 0;

    for (const event of events) {
      const date = event.created_at.split('T')[0];
      const currentCount = contributionsByDate.get(date) || 0;
      
      // Count different types of contributions
      let count = 1;
      if (event.type === 'PushEvent') {
        count = event.payload?.commits?.length || 1;
      }
      
      contributionsByDate.set(date, currentCount + count);
      totalContributions += count;
    }

    // Convert to array format
    const contributions = Array.from(contributionsByDate.entries()).map(
      ([date, count]) => ({ date, count })
    );

    const { currentStreak, lastContributionDate } = calculateStreak(contributions);

    const stats: GitHubStats = {
      streak: currentStreak,
      totalContributions,
      lastContributionDate: lastContributionDate || 'N/A',
    };

    setCache(stats);
    return stats;
  } catch (error) {
    console.error('GitHub API error:', error);
    // Return fallback data
    return {
      streak: 0,
      totalContributions: 0,
      lastContributionDate: 'Error',
    };
  }
}