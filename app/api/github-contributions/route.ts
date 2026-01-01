import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
  }

  // Get contributions for 2025 (January 1, 2025 to December 31, 2025 or now if still in 2025)
  const now = new Date();
  const year = 2025; // Explicitly set to 2025
  const from = new Date(year, 0, 1); // January 1, 2025
  const to = now.getFullYear() === year ? now : new Date(year, 11, 31); // Dec 31, 2025 or now

  // This query fetches ALL contributions including:
  // - Public repository contributions
  // - Private repository contributions
  // - Organization contributions
  // - All commit, PR, issue, and review activity
  // 
  // Required GitHub token scopes:
  // - read:user (for user data and private contributions)
  // - read:org (for organization contributions)
  const query = `
    query($userName: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $userName) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          userName: 's4gor',
          from: from.toISOString(),
          to: to.toISOString()
        }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: 'Failed to fetch contributions' },
        { status: 500 }
      );
    }

    // Transform the data to match react-github-calendar format
    const contributions = data.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap((week: { contributionDays: unknown[] }) => week.contributionDays)
      .map((day: { date: string; contributionCount: number }) => ({
        date: day.date,
        count: day.contributionCount,
        level: getContributionLevel(day.contributionCount)
      }));

    // Process language statistics
    const languageMap = new Map<string, { name: string; size: number; color: string }>();

    data.data.user.repositories.nodes.forEach((repo: { languages: { edges: { size: number; node: { name: string; color: string } }[] } }) => {
      repo.languages.edges.forEach((edge: { size: number; node: { name: string; color: string } }) => {
        const { name, color } = edge.node;
        const existing = languageMap.get(name);
        if (existing) {
          existing.size += edge.size;
        } else {
          languageMap.set(name, { name, size: edge.size, color });
        }
      });
    });

    // Convert to array and sort by size
    const languages = Array.from(languageMap.values())
      .sort((a, b) => b.size - a.size)
      .slice(0, 5); // Top 5 languages

    // Calculate percentages
    const totalSize = languages.reduce((sum, lang) => sum + lang.size, 0);
    const languageStats = languages.map(lang => ({
      name: lang.name,
      color: lang.color,
      percentage: Math.round((lang.size / totalSize) * 100)
    }));

    return NextResponse.json({
      total: data.data.user.contributionsCollection.contributionCalendar.totalContributions,
      contributions,
      languages: languageStats
    });

  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
}

// Map contribution count to level (0-4)
function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 9) return 3;
  return 4;
}
