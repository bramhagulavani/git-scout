import { useMemo } from 'react';
import { getLanguageColor } from '../utils/languageColors';

function LanguageBar({ repos = [] }) {
  const languageStats = useMemo(() => {
    const bucket = repos.reduce((accumulator, repo) => {
      if (!repo.language) {
        return accumulator;
      }

      const weight = repo.size && repo.size > 0 ? repo.size : 1;
      accumulator[repo.language] = (accumulator[repo.language] || 0) + weight;
      return accumulator;
    }, {});

    const entries = Object.entries(bucket).map(([language, amount]) => ({
      language,
      amount
    }));

    const total = entries.reduce((sum, current) => sum + current.amount, 0);

    return entries
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6)
      .map((item) => ({
        ...item,
        percent: total > 0 ? (item.amount / total) * 100 : 0,
        color: getLanguageColor(item.language)
      }));
  }, [repos]);

  if (languageStats.length === 0) {
    return null;
  }

  return (
    <section className="mt-7">
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-textSecondary">Language Distribution</h4>

      <div className="flex h-2.5 w-full overflow-hidden rounded-full border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.7)]">
        {languageStats.map((item) => (
          <div
            key={item.language}
            className="language-segment"
            style={{
              '--target-width': `${item.percent}%`,
              width: `${item.percent}%`,
              backgroundColor: item.color
            }}
            title={`${item.language} — ${item.percent.toFixed(0)}%`}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {languageStats.map((item) => (
          <div key={item.language} className="inline-flex items-center gap-2 rounded-full border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.75)] px-3 py-1.5 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-textPrimary">{item.language}</span>
            <span className="text-textSecondary">{item.percent.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LanguageBar;
