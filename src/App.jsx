import { useEffect, useMemo, useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import LoadingCard from './components/LoadingCard';
import ErrorCard from './components/ErrorCard';
import RepoList from './components/RepoList';
import SearchHistory from './components/SearchHistory';
import CompareMode from './components/CompareMode';
import { useGithub } from './hooks/useGithub';

// Curated quick-search handles for a fast first interaction.
const EMPTY_SUGGESTIONS = ['torvalds', 'gaearon', 'sindresorhus', 'dan_abramov'];
const HISTORY_KEY = 'gitscout_search_history';

function getInitialHistory() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || '[]');
    if (Array.isArray(parsed)) {
      return parsed.slice(0, 5);
    }
    return [];
  } catch {
    return [];
  }
}

function App() {
  const [activeQuery, setActiveQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [history, setHistory] = useState(getInitialHistory);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const { userData, topRepos, loading, error, errorType, fetchUser } = useGithub();
  const hideHistoryTimer = useRef(null);

  const emptyState = useMemo(() => !loading && !error && !userData && !hasSearched, [loading, error, userData, hasSearched]);

  useEffect(() => {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(
    () => () => {
      if (hideHistoryTimer.current) {
        clearTimeout(hideHistoryTimer.current);
      }
    },
    []
  );

  const addToHistory = (username) => {
    setHistory((prev) => {
      const normalized = username.trim().toLowerCase();
      const next = [username.trim(), ...prev.filter((item) => item.toLowerCase() !== normalized)];
      return next.slice(0, 5);
    });
  };

  const removeHistoryItem = (username) => {
    setHistory((prev) => prev.filter((item) => item !== username));
  };

  const clearHistory = () => {
    setHistory([]);
    toast('Search history cleared! 🧹', { icon: '🧹' });
  };

  const handleSearch = async (username) => {
    const query = username.trim();

    if (!query) {
      toast('Please enter a GitHub username! 💡', { icon: '💡' });
      return;
    }

    setHasSearched(true);
    setActiveQuery(query);

    // Keep toast behavior centralized so success and failures stay consistent.
    const result = await fetchUser(query);

    if (result.ok) {
      addToHistory(query);
      setHistoryVisible(false);
      toast.success(`Found ${result.data.name || query}! 🎉`);
      toast.success(`Loaded ${result.repos.length} repositories! 📦`);
      return;
    }

    if (result.type === 'not-found') {
      toast.error('GitHub user not found! 🔍');
      return;
    }

    toast.error('Something went wrong. Try again!');
  };

  const handleToggleCompare = () => {
    setCompareMode((prev) => {
      const next = !prev;
      if (next) {
        toast('Compare mode activated! ⚔️', { icon: '⚔️' });
      }
      return next;
    });
  };

  const handleInputFocus = () => {
    if (hideHistoryTimer.current) {
      clearTimeout(hideHistoryTimer.current);
    }
    setHistoryVisible(true);
  };

  const handleInputBlur = () => {
    hideHistoryTimer.current = setTimeout(() => setHistoryVisible(false), 140);
  };

  return (
    <div className="relative min-h-screen bg-bgBase font-body text-textPrimary">
      <div className="orb-blue" aria-hidden="true" />
      <div className="orb-violet" aria-hidden="true" />

      <Navbar onToggleCompare={handleToggleCompare} compareMode={compareMode} />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-5 pb-20 pt-28 sm:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <SearchBar
            onSearch={handleSearch}
            suggestions={EMPTY_SUGGESTIONS}
            loading={loading}
            initialValue={activeQuery}
            onInputFocus={handleInputFocus}
            onInputBlur={handleInputBlur}
          />

          <SearchHistory
            visible={historyVisible}
            items={history}
            onSelect={(username) => handleSearch(username)}
            onRemove={removeHistoryItem}
            onClearAll={clearHistory}
          />
        </div>

        {compareMode ? <CompareMode /> : null}

        <section className="mt-8 flex min-h-[360px] w-full flex-col items-center justify-start">
          {loading && <LoadingCard />}

          {!loading && error && (
            <ErrorCard
              type={errorType}
              message={error}
              onRetry={() => handleSearch(activeQuery)}
              onQuickSearch={(username) => handleSearch(username)}
            />
          )}

          {!loading && !error && userData && (
            <>
              <ProfileCard
                user={userData}
                repos={topRepos}
                onCompare={() => {
                  setCompareMode(true);
                  toast('Compare mode activated! ⚔️', { icon: '⚔️' });
                }}
              />
              <RepoList repos={topRepos} />
            </>
          )}

          {emptyState && (
            <div className="glass-card animate-fade-slide-up w-full max-w-3xl rounded-3xl p-10 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-textPrimary">Start with a GitHub username</h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-textSecondary">
                Explore developer profiles instantly with a premium, real-time GitHub lookup experience.
              </p>
            </div>
          )}
        </section>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0d1117',
            color: '#f0f6fc',
            border: '1px solid rgba(37, 99, 235, 0.4)',
            borderRadius: '12px',
            fontSize: '14px',
            backdropFilter: 'blur(20px)'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#0d1117'
            },
            duration: 3000
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#0d1117'
            },
            duration: 4000
          }
        }}
      />
    </div>
  );
}

export default App;
