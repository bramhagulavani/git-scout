import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import RepoCard from './RepoCard';

const SORT_OPTIONS = [
  { value: 'stars', label: '⭐ Most Stars' },
  { value: 'updated', label: '🕐 Recently Updated' },
  { value: 'name', label: '🔤 Name (A-Z)' },
  { value: 'forks', label: '🍴 Most Forked' }
];

function RepoList({ repos = [] }) {
  const [sortBy, setSortBy] = useState('stars');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const languages = useMemo(() => {
    const unique = Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const filteredAndSorted = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    const filtered = repos.filter((repo) => {
      const languageMatch = languageFilter === 'all' || repo.language === languageFilter;
      const searchMatch =
        !normalizedSearch ||
        repo.name.toLowerCase().includes(normalizedSearch) ||
        (repo.description || '').toLowerCase().includes(normalizedSearch);

      return languageMatch && searchMatch;
    });

    const sorted = [...filtered];

    if (sortBy === 'stars') {
      sorted.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    }

    if (sortBy === 'updated') {
      sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }

    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'forks') {
      sorted.sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0));
    }

    return sorted;
  }, [repos, languageFilter, debouncedSearch, sortBy]);

  useEffect(() => {
    setVisibleCount(6);
  }, [sortBy, languageFilter, search]);

  const visibleRepos = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  const handleLanguageChange = (event) => {
    const next = event.target.value;
    setLanguageFilter(next);

    if (next !== 'all') {
      toast(`Filtering by ${next} 🎯`, { icon: '🎯' });
    }
  };

  const clearFilters = () => {
    setLanguageFilter('all');
    setSearch('');
    setSortBy('stars');
  };

  return (
    <section className="animate-fade-slide-up mt-10 w-full max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2">
          <h3 className="font-display text-2xl font-bold text-textPrimary">📦 Repositories</h3>
          <span className="rounded-full bg-[rgba(37,99,235,0.2)] px-3 py-1 text-xs font-semibold text-accentBlue">{repos.length}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.9)] px-3 py-2 text-sm text-textPrimary focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={languageFilter}
            onChange={handleLanguageChange}
            className="rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.9)] px-3 py-2 text-sm text-textPrimary focus:outline-none"
          >
            <option value="all">All Languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>

          <label className="inline-flex items-center gap-2 rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.9)] px-3 py-2">
            <Search size={15} className="text-textSecondary" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Filter repositories..."
              className="w-44 bg-transparent text-sm text-textPrimary placeholder:text-textTertiary focus:outline-none"
            />
          </label>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="glass-card mt-5 rounded-2xl p-8 text-center">
          <p className="text-4xl">📭</p>
          <h4 className="mt-3 text-lg font-semibold text-textPrimary">No repositories match your search</h4>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-xl border border-[rgba(48,54,61,0.8)] px-4 py-2 text-sm text-textSecondary transition hover:border-[rgba(37,99,235,0.5)] hover:text-textPrimary"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleRepos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-textSecondary">
              Showing {visibleRepos.length} of {filteredAndSorted.length} repos
            </p>

            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="mt-3 inline-flex items-center rounded-xl bg-gradient-to-r from-accentBlue to-accentViolet px-6 py-2.5 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] transition duration-200 hover:scale-[1.02]"
              >
                Load More
              </button>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}

export default RepoList;
