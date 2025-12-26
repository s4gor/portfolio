"use client";

import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Tooltip } from 'react-tooltip';

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Filter for April 1, 2025 onwards
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
  const milestones = [
    { date: 'May, 2025', title: 'Joined Youvendo GmbH', type: 'start' },
    { date: 'June, 2025', title: 'Left Mars Production', type: 'end' },
    { date: 'May, 2025', title: 'Left iDesignWork', type: 'end' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Calendar Section */}
      <div className="flex-grow border rounded-xl p-6 bg-white shadow-sm border-neutral-100 overflow-hidden hover:border-neutral-200 hover:shadow-md transition-all duration-200">
        <GitHubCalendar
          username="s4gor"
          colorScheme="light"
          transformData={selectApril2025Onwards}
          theme={customTheme}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
          renderBlock={(block, activity) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.cloneElement(block as React.ReactElement<any>, {
              'data-tooltip-id': 'react-tooltip',
              'data-tooltip-html': `${activity.count} contributions on ${activity.date}`,
              style: { borderRadius: '50%' } // Make it circular
            })
          )}
        />
        <Tooltip id="react-tooltip" style={{ fontSize: '12px' }} delayShow={50} />
      </div>

      {/* Timeline Milestones (Compact) */}
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
  );
}
