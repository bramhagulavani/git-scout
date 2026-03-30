import { useEffect, useMemo, useState } from 'react';
import { Trophy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useGithub } from '../hooks/useGithub';
import { formatNumber } from '../utils/formatters';
import { getLanguageColor } from '../utils/languageColors';

function getTopLanguage(repos) {
  const count = repos.reduce((accumulator, repo) => {
    if (!repo.language) {
      return accumulator;
    }

    accumulator[repo.language] = (accumulator[repo.language] || 0) + 1;
    return accumulator;
  }, {});

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || 'N/A';
}

function getTotalStars(repos) {
  return repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
}

function CompareCard({ title, user, repos, winners, side }) {
  if (!user) {
    return (
      <div className={`glass-card rounded-2xl p-6 ${side === 'left' ? 'compare-left' : 'compare-right'}`}>
        <h4 className="font-display text-lg font-bold text-textPrimary">{title}</h4>
        <p className="mt-2 text-sm text-textSecondary">Search a user to start comparing.</p>
      </div>
    );
  }

  const stars = getTotalStars(repos);
  const topLanguage = getTopLanguage(repos);
  const winnerGlow = winners.followers === side || winners.repos === side || winners.stars === side;

  return (
    <article
      className={`glass-card rounded-2xl p-6 transition ${
        side === 'left' ? 'compare-left' : 'compare-right'
      } ${winnerGlow ? 'shadow-[0_0_24px_rgba(16,185,129,0.25)] border-[rgba(16,185,129,0.5)]' : ''}`}
    >
      <div className="flex items-center gap-3">
        <img src={user.avatar_url} alt={user.login} className="h-14 w-14 rounded-full border border-[rgba(48,54,61,0.8)] object-cover" />
        <div className="min-w-0">
          <h4 className="truncate font-display text-lg font-bold text-textPrimary">{user.name || user.login}</h4>
          <p className="truncate text-sm text-accentBlue">@{user.login}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-[rgba(13,17,23,0.75)] p-2">
          <p className="text-xs text-textSecondary">Followers {winners.followers === side ? '🏆' : ''}</p>
          <p className="text-base font-bold text-textPrimary">{formatNumber(user.followers)}</p>
        </div>
        <div className="rounded-lg bg-[rgba(13,17,23,0.75)] p-2">
          <p className="text-xs text-textSecondary">Following</p>
          <p className="text-base font-bold text-textPrimary">{formatNumber(user.following)}</p>
        </div>
        <div className="rounded-lg bg-[rgba(13,17,23,0.75)] p-2">
          <p className="text-xs text-textSecondary">Repos {winners.repos === side ? '🏆' : ''}</p>
          <p className="text-base font-bold text-textPrimary">{formatNumber(user.public_repos)}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-textSecondary">
        <div className="flex items-center justify-between gap-2">
          <span>Top Language</span>
          <span className="inline-flex items-center gap-1.5 text-textPrimary">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(topLanguage) }} />
            {topLanguage}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>Total Stars {winners.stars === side ? '🏆' : ''}</span>
          <span className="font-semibold text-textPrimary">{formatNumber(stars)}</span>
        </div>
      </div>
    </article>
  );
}

function CompareMode() {
  const [leftQuery, setLeftQuery] = useState('');
  const [rightQuery, setRightQuery] = useState('');

  const left = useGithub();
  const right = useGithub();

  const leftStats = useMemo(
    () => ({
      followers: left.userData?.followers || 0,
      repos: left.userData?.public_repos || 0,
      stars: getTotalStars(left.topRepos)
    }),
    [left.userData, left.topRepos]
  );

  const rightStats = useMemo(
    () => ({
      followers: right.userData?.followers || 0,
      repos: right.userData?.public_repos || 0,
      stars: getTotalStars(right.topRepos)
    }),
    [right.userData, right.topRepos]
  );

  const winners = useMemo(() => {
    const resolve = (leftValue, rightValue) => {
      if (leftValue > rightValue) {
        return 'left';
      }

      if (rightValue > leftValue) {
        return 'right';
      }

      return 'tie';
    };

    return {
      followers: resolve(leftStats.followers, rightStats.followers),
      repos: resolve(leftStats.repos, rightStats.repos),
      stars: resolve(leftStats.stars, rightStats.stars)
    };
  }, [leftStats, rightStats]);

  useEffect(() => {
    if (left.userData && right.userData) {
      toast.success('Ready to compare! Pick your fighters 🥊');
    }
  }, [left.userData, right.userData]);

  const handleSubmit = async (side) => {
    const isLeft = side === 'left';
    const query = (isLeft ? leftQuery : rightQuery).trim();

    if (!query) {
      toast('Please enter a GitHub username! 💡', { icon: '💡' });
      return;
    }

    const result = isLeft ? await left.fetchUser(query) : await right.fetchUser(query);

    if (result.ok) {
      return;
    }

    if (result.type === 'not-found') {
      toast.error('GitHub user not found! 🔍');
      return;
    }

    toast.error('Something went wrong. Try again!');
  };

  return (
    <section className="animate-fade-slide-up mt-8 w-full max-w-6xl">
      <div className="glass-card rounded-3xl p-5 sm:p-7">
        <div className="mb-5 text-center">
          <h3 className="font-display text-3xl font-extrabold text-textPrimary">Compare Two GitHub Profiles</h3>
          <p className="mt-2 text-sm text-textSecondary">Search two users and see who leads by followers, repos, and stars.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit('left');
            }}
            className="inline-flex w-full items-center gap-2 rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.9)] px-3 py-2"
          >
            <input
              value={leftQuery}
              onChange={(event) => setLeftQuery(event.target.value)}
              placeholder="Search user 1"
              className="h-10 w-full bg-transparent text-sm text-textPrimary placeholder:text-textTertiary focus:outline-none"
            />
            <button type="submit" className="rounded-lg bg-gradient-to-r from-accentBlue to-accentViolet px-4 py-2 text-sm font-semibold text-white">
              Search
            </button>
          </form>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(48,54,61,0.8)] bg-[linear-gradient(135deg,rgba(37,99,235,0.25),rgba(124,58,237,0.25))] shadow-[0_0_24px_rgba(124,58,237,0.3)]">
            <span className="font-display text-lg font-bold text-textPrimary">VS</span>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit('right');
            }}
            className="inline-flex w-full items-center gap-2 rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.9)] px-3 py-2"
          >
            <input
              value={rightQuery}
              onChange={(event) => setRightQuery(event.target.value)}
              placeholder="Search user 2"
              className="h-10 w-full bg-transparent text-sm text-textPrimary placeholder:text-textTertiary focus:outline-none"
            />
            <button type="submit" className="rounded-lg bg-gradient-to-r from-accentBlue to-accentViolet px-4 py-2 text-sm font-semibold text-white">
              Search
            </button>
          </form>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CompareCard title="Fighter 1" user={left.userData} repos={left.topRepos} winners={winners} side="left" />
          <CompareCard title="Fighter 2" user={right.userData} repos={right.topRepos} winners={winners} side="right" />
        </div>

        {(winners.followers !== 'tie' || winners.repos !== 'tie' || winners.stars !== 'tie') && left.userData && right.userData ? (
          <div className="mt-5 rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.75)] p-3 text-sm text-textSecondary">
            <p className="inline-flex items-center gap-2 text-textPrimary">
              <Trophy size={16} className="text-warning" />
              Winner summary
            </p>
            <p className="mt-1">Followers: {winners.followers === 'tie' ? 'Tie' : winners.followers === 'left' ? 'Fighter 1' : 'Fighter 2'}</p>
            <p>Repos: {winners.repos === 'tie' ? 'Tie' : winners.repos === 'left' ? 'Fighter 1' : 'Fighter 2'}</p>
            <p>Stars: {winners.stars === 'tie' ? 'Tie' : winners.stars === 'left' ? 'Fighter 1' : 'Fighter 2'}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default CompareMode;
