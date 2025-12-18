// components/sections/StreakZone.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StreakData {
  platform: string;
  icon: string;
  streak: number;
  label: string;
  subtitle: string;
  profileUrl: string;
  isLoading?: boolean;
  error?: boolean;
}

// Animated counter component
function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
    </span>
  );
}

// Individual streak card
function StreakCard({ data, index }: { data: StreakData; index: number }) {
  if (data.isLoading) {
    return (
      <Card className="bg-slate-900/80 backdrop-blur-lg border-purple-500/30 h-full animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20" />
            <div className="h-5 w-24 rounded bg-purple-500/20" />
          </div>
          <div className="h-12 w-24 rounded bg-purple-500/20 mb-2" />
          <div className="h-4 w-32 rounded bg-purple-500/20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.a
      href={data.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="block"
    >
      <Card className="bg-slate-900/80 backdrop-blur-lg border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-300 h-full cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {data.icon}
            </span>
            <span className="text-foreground font-semibold text-lg">
              {data.platform}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-auto text-foreground/30 group-hover:text-foreground/60 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              <AnimatedNumber value={data.streak} />
            </span>
            <span className="text-2xl">🔥</span>
          </div>

          <p className="text-foreground/70 text-sm font-medium">{data.label}</p>
          <p className="text-foreground/40 text-xs mt-1">{data.subtitle}</p>
        </CardContent>
      </Card>
    </motion.a>
  );
}

// API Fetchers
async function fetchDuolingo(): Promise<{ streak: number; xp: number; language: string }> {
  try {
    const res = await fetch(
      'https://www.duolingo.com/2017-06-30/users?username=Towhid_0&fields=streak,streakData%7BcurrentStreak,previousStreak%7D,totalXp,currentCourseId'
    );
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    const user = data.users?.[0];
    if (!user) throw new Error('No user');
    
    const streak = Math.max(
      user.streak ?? 0,
      user.streakData?.currentStreak?.length ?? 0,
      user.streakData?.previousStreak?.length ?? 0
    );
    
    return { streak, xp: user.totalXp || 0, language: 'Japanese' };
  } catch {
    throw new Error('Duolingo fetch failed');
  }
}

async function fetchGitHub(): Promise<{ activeDays: number; events: number }> {
  try {
    const res = await fetch('https://api.github.com/users/towhid-01/events/public?per_page=100');
    if (!res.ok) throw new Error('Failed');
    const events = await res.json();
    const uniqueDates = new Set(events.map((e: any) => e.created_at?.split('T')[0]).filter(Boolean));
    return { activeDays: uniqueDates.size, events: events.length };
  } catch {
    throw new Error('GitHub fetch failed');
  }
}

async function fetchLeetCode(): Promise<{ solved: number; streak: number }> {
  try {
    const query = `query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal { acSubmissionNum { difficulty count } }
        userCalendar { streak }
      }
    }`;
    
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { username: '_PrEdAToR_' } }),
    });
    
    if (!res.ok) throw new Error('Failed');
    const result = await res.json();
    const user = result.data?.matchedUser;
    if (!user) throw new Error('No user');
    
    const submissions = user.submitStats?.acSubmissionNum || [];
    const total = submissions.find((s: any) => s.difficulty === 'All')?.count || 0;
    
    return { solved: total, streak: user.userCalendar?.streak || 0 };
  } catch {
    throw new Error('LeetCode fetch failed');
  }
}

async function fetchCodeWars(): Promise<{ honor: number; rank: string; kata: number }> {
  try {
    const res = await fetch('https://www.codewars.com/api/v1/users/towhid-01');
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    return {
      honor: data.honor || 0,
      rank: data.ranks?.overall?.name || 'New',
      kata: data.codeChallenges?.totalCompleted || 0,
    };
  } catch {
    throw new Error('CodeWars fetch failed');
  }
}

async function fetchWakaTime(): Promise<{ hours: number; daily: string; language: string }> {
  try {
    const res = await fetch(
      'https://wakatime.com/api/v1/users/55dcc4cb-eb6f-4b98-8827-476c1997d057/stats/last_7_days'
    );
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    const stats = data.data || data;
    
    const totalHours = Math.round((stats.total_seconds || 0) / 3600);
    const dailyAvgSec = stats.daily_average || 0;
    const dailyH = Math.floor(dailyAvgSec / 3600);
    const dailyM = Math.floor((dailyAvgSec % 3600) / 60);
    const topLang = stats.languages?.[0]?.name || 'Code';
    
    return { hours: totalHours, daily: `${dailyH}h ${dailyM}m`, language: topLang };
  } catch {
    throw new Error('WakaTime fetch failed');
  }
}

export default function StreakZone() {
  const [streaks, setStreaks] = useState<StreakData[]>([
    { platform: 'Duolingo', icon: '🦉', streak: 0, label: 'Day Streak', subtitle: 'Loading...', profileUrl: 'https://www.duolingo.com/profile/Towhid_0', isLoading: true },
    { platform: 'GitHub', icon: '🐙', streak: 0, label: 'Active Days', subtitle: 'Loading...', profileUrl: 'https://github.com/towhid-01', isLoading: true },
    { platform: 'LeetCode', icon: '🧩', streak: 0, label: 'Problems Solved', subtitle: 'Loading...', profileUrl: 'https://leetcode.com/u/_PrEdAToR_/', isLoading: true },
    { platform: 'CodeWars', icon: '⚔️', streak: 0, label: 'Honor Points', subtitle: 'Loading...', profileUrl: 'https://www.codewars.com/users/towhid-01', isLoading: true },
    { platform: 'WakaTime', icon: '⏱️', streak: 0, label: 'Hours/Week', subtitle: 'Loading...', profileUrl: 'https://wakatime.com/@55dcc4cb-eb6f-4b98-8827-476c1997d057', isLoading: true },
  ]);

  useEffect(() => {
    const fetchAll = async () => {
      // Fetch Duolingo
      try {
        const duo = await fetchDuolingo();
        setStreaks(prev => prev.map(s => 
          s.platform === 'Duolingo' 
            ? { ...s, streak: duo.streak, subtitle: `${duo.xp.toLocaleString()} XP • ${duo.language}`, isLoading: false }
            : s
        ));
      } catch {
        setStreaks(prev => prev.map(s => 
          s.platform === 'Duolingo' 
            ? { ...s, streak: 0, subtitle: 'Could not load', isLoading: false, error: true }
            : s
        ));
      }

      // Fetch GitHub
      try {
        const gh = await fetchGitHub();
        setStreaks(prev => prev.map(s => 
          s.platform === 'GitHub' 
            ? { ...s, streak: gh.activeDays, subtitle: `${gh.events} recent events`, isLoading: false }
            : s
        ));
      } catch {
        setStreaks(prev => prev.map(s => 
          s.platform === 'GitHub' 
            ? { ...s, streak: 0, subtitle: 'Could not load', isLoading: false, error: true }
            : s
        ));
      }

      // Fetch LeetCode
      try {
        const lc = await fetchLeetCode();
        setStreaks(prev => prev.map(s => 
          s.platform === 'LeetCode' 
            ? { ...s, streak: lc.solved || lc.streak, label: lc.streak > 0 ? 'Day Streak' : 'Problems Solved', subtitle: `${lc.solved} total solved`, isLoading: false }
            : s
        ));
      } catch {
        setStreaks(prev => prev.map(s => 
          s.platform === 'LeetCode' 
            ? { ...s, streak: 0, subtitle: 'Could not load', isLoading: false, error: true }
            : s
        ));
      }

      // Fetch CodeWars
      try {
        const cw = await fetchCodeWars();
        setStreaks(prev => prev.map(s => 
          s.platform === 'CodeWars' 
            ? { ...s, streak: cw.honor, subtitle: `${cw.rank} • ${cw.kata} kata`, isLoading: false }
            : s
        ));
      } catch {
        setStreaks(prev => prev.map(s => 
          s.platform === 'CodeWars' 
            ? { ...s, streak: 0, subtitle: 'Could not load', isLoading: false, error: true }
            : s
        ));
      }

      // Fetch WakaTime
      try {
        const wt = await fetchWakaTime();
        setStreaks(prev => prev.map(s => 
          s.platform === 'WakaTime' 
            ? { ...s, streak: wt.hours, subtitle: `${wt.daily}/day • ${wt.language}`, isLoading: false }
            : s
        ));
      } catch {
        setStreaks(prev => prev.map(s => 
          s.platform === 'WakaTime' 
            ? { ...s, streak: 0, subtitle: 'Could not load', isLoading: false, error: true }
            : s
        ));
      }
    };

    fetchAll();
  }, []);

  return (
    <section id="streaks" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Streak Zone <span className="text-3xl">🔥</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Consistency is key. Here's my daily practice across different platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {streaks.map((streak, index) => (
            <StreakCard key={streak.platform} data={streak} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/30">
            <span className="text-foreground/60 text-sm">Building habits, one day at a time</span>
            <span className="text-lg">💪</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}