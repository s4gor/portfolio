"use client";

import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Language {
  name: string;
  color: string;
  percentage: number;
}

// Filter for April 1, 2025 onwards (from 2025 data)
const selectApril2025Onwards = (contributions: Activity[]) => {
  const startDate = new Date('2025-04-01');
  return contributions.filter((activity: Activity) => {
    const date = new Date(activity.date);
    return date >= startDate;
  });
};

const customTheme = {
  light: ['#f5f5f5', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

export default function GitHubActivity() {
  const [contributions, setContributions] = useState<Activity[] | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const milestones = [
    { date: 'November, 2025', title: 'Launched Mimonous: A peer-to-peer invoicing software', type: 'start' },
    { date: 'May, 2025', title: 'Joined Youvendo GmbH', type: 'start' },
    { date: 'June, 2025', title: 'Left Mars Production', type: 'end' },
  ];

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch('/api/github-contributions');
        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }
        const data = await response.json();
        setContributions(data.contributions);
        setLanguages(data.languages || []);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError('Failed to load contributions');
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Row 1: Activity Calendar + Milestones */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar Section */}
        <div className="flex-grow border rounded-xl p-6 bg-white shadow-sm border-neutral-100 overflow-hidden hover:border-neutral-200 hover:shadow-md transition-all duration-200 flex items-center justify-center min-h-[210px] h-[210px]">
          {loading ? (
            <div className="text-neutral-500">Loading contributions...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : contributions ? (
            <>
              {/* @ts-ignore - data prop is supported but not in type definitions */}
              <GitHubCalendar
                username="s4gor"
                colorScheme="light"
                loading={false}
                data={selectApril2025Onwards(contributions)}
                theme={customTheme}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                renderBlock={(block, activity) => (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  React.cloneElement(block as React.ReactElement<any>, {
                    'data-tooltip-id': 'react-tooltip',
                    'data-tooltip-html': `${activity.count} contributions on ${activity.date}`,
                    style: { borderRadius: '50%' }
                  })
                )}
              />
              <Tooltip id="react-tooltip" style={{ fontSize: '12px' }} delayShow={50} />
            </>
          ) : null}
        </div>

        {/* Timeline Milestones - ORIGINAL CODE */}
        <div className="md:w-64 flex flex-col gap-4 shrink-0">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">2025 Milestones</h3>
          <div className="flex flex-col gap-3 relative border-l border-neutral-200 ml-2">
            {milestones.map((item, index) => (
              <div key={index} className="pl-4 relative">
                <div className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-white ${item.type === 'start' ? 'bg-sky-500' : 'bg-neutral-400'} shadow-sm`} />
                <span className="text-xs font-medium text-neutral-400 block mb-0.5">{item.date}</span>
                <span className="text-sm font-medium text-neutral-800 leading-snug block">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Language Statistics */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Top Languages</h3>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-2 animate-pulse">
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                <div className="w-full h-2 bg-neutral-200 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : languages && languages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.filter(lang => lang.name !== 'HTML').map((lang, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-neutral-700">{lang.name}</span>
                  <span className="text-neutral-500 text-xs">{lang.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color || '#64748b'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
