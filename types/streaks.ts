// types/streaks.ts

export interface StreakData {
  platform: string;
  icon: string;
  streak: number;
  label: string;
  subtitle?: string;
  profileUrl: string;
  lastUpdated?: string;
  isLoading?: boolean;
  error?: string;
}

export interface GitHubStats {
  streak: number;
  totalContributions: number;
  lastContributionDate: string;
}

export interface LeetCodeStats {
  streak: number;
  totalSolved: number;
  ranking: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export interface DuolingoStats {
  streak: number;
  totalXp?: number;
  currentLanguage?: string;
}

export interface CodeWarsStats {
  streak: number;
  rank: string;
  honor: number;
  totalCompleted: number;
}

export interface WakaTimeStats {
  streak: number;
  totalHours: number;
  dailyAverage: string;
  topLanguage: string;
}