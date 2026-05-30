// components/sections/StreakZone.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardData {
  id: string;
  icon: string;
  platform: string;
  value: number;
  suffix: string;
  label: string;
  subtitle: string;
  profileUrl: string;
  isLoading?: boolean;
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

function StatCard({ data, index }: { data: StatCardData; index: number }) {
  if (data.isLoading) {
    return (
      <Card className="bg-white dark:bg-slate-800 backdrop-blur-lg border-purple-500/30 h-full animate-pulse">
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
      <Card className="bg-white dark:bg-slate-800 backdrop-blur-lg border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-300 h-full cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {data.icon}
            </span>
            <span className="text-slate-800 dark:text-white font-semibold text-lg">
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

          <div className="flex items-baseline gap-1 mb-2">
            <span className="inline-block text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent pb-1">
              <AnimatedNumber value={data.value} />
            </span>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {data.suffix}
            </span>
          </div>

          <p className="text-slate-600 dark:text-gray-300 text-sm font-medium">{data.label}</p>
          <p className="text-slate-500 dark:text-gray-400 text-xs mt-1">{data.subtitle}</p>
        </CardContent>
      </Card>
    </motion.a>
  );
}

export default function StreakZone() {
  const [stats, setStats] = useState<StatCardData[]>([
    {
      id: 'github',
      icon: '🐙',
      platform: 'GitHub',
      value: 0,
      suffix: '',
      label: 'Recent Commits',
      subtitle: 'Loading...',
      profileUrl: 'https://github.com/towhid-01',
      isLoading: true,
    },
    {
      id: 'problems',
      icon: '🧩',
      platform: 'Problems Solved',
      value: 1200,
      suffix: '+',
      label: 'Algorithmic Problems',
      subtitle: 'Competitive Programming',
      profileUrl: 'https://leetcode.com/u/_PrEdAToR_/',
    },
    {
      id: 'games',
      icon: '🎮',
      platform: 'Games Shipped',
      value: 6,
      suffix: '+',
      label: 'Complete Games',
      subtitle: 'Mobile & PC Platforms',
      profileUrl: 'https://github.com/towhid-01',
    },
  ]);

  useEffect(() => {
    const fetchGitHub = async () => {
      // Try contributions API for yearly count first
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/towhid-01?y=last');
        if (!res.ok) throw new Error('contributions API failed');
        const data = await res.json();
        const total: number = data.contributions?.reduce(
          (sum: number, day: { count: number }) => sum + day.count, 0
        ) ?? 0;
        setStats(prev =>
          prev.map(s =>
            s.id === 'github'
              ? {
                  ...s,
                  value: total,
                  label: 'contributions in the last year',
                  subtitle: 'GitHub Activity',
                  isLoading: false,
                }
              : s
          )
        );
        return;
      } catch {
        // fall through to events API
      }

      // Fallback: GitHub events API
      try {
        const res = await fetch('https://api.github.com/users/towhid-01/events/public?per_page=100');
        if (!res.ok) throw new Error('Failed');
        const events = await res.json();
        const pushEvents = events.filter((e: { type: string }) => e.type === 'PushEvent');
        const commits = pushEvents.reduce(
          (sum: number, e: { payload?: { commits?: unknown[] } }) =>
            sum + (e.payload?.commits?.length ?? 1),
          0
        );
        setStats(prev =>
          prev.map(s =>
            s.id === 'github'
              ? {
                  ...s,
                  value: commits,
                  label: 'contributions in the last year',
                  subtitle: 'GitHub Activity',
                  isLoading: false,
                }
              : s
          )
        );
      } catch {
        setStats(prev =>
          prev.map(s =>
            s.id === 'github'
              ? { ...s, value: 441, label: 'contributions in the last year', subtitle: 'GitHub Activity', isLoading: false }
              : s
          )
        );
      }
    };

    fetchGitHub();
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
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
            Developer Stats <span className="text-3xl">📊</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            My development activity and achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} data={stat} index={index} />
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
