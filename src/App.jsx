import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import LoadingCard from './components/LoadingCard';
import ErrorCard from './components/ErrorCard';
import RepoList from './components/RepoList';
import SearchHistory from './components/SearchHistory';
import NotFound from './components/NotFound';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';
import { useKeyboard } from './hooks/useKeyboard';
import { useGithub } from './hooks/useGithub';

const CompareMode = lazy(() => import('./components/CompareMode'));

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

function HomePage() {
  const [activeQuery, setActiveQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [history, setHistory] = useState(getInitialHistory);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [historyCursor, setHistoryCursor] = useState(-1);
  const { userData, topRepos, loading, error, errorType, fetchUser, clearData } = useGithub();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
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

  const addToHistory = useCallback((username) => {
    setHistory((prev) => {
      const normalized = username.trim().toLowerCase();
      const next = [username.trim(), ...prev.filter((item) => item.toLowerCase() !== normalized)];
      return next.slice(0, 5);
    });
    setHistoryCursor(-1);
  }, []);

  const removeHistoryItem = useCallback((username) => {
    setHistory((prev) => prev.filter((item) => item !== username));
    setHistoryCursor(-1);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryCursor(-1);
    toast('Search history cleared! 🧹', { icon: '🧹' });
  }, []);

  const handleSearch = useCallback(async (username) => {
    const query = username.trim();

    if (!query) {
      toast('Please enter a GitHub username! 💡', { icon: '💡' });
      return;
    }

    setHasSearched(true);
    setActiveQuery(query);
    setHistoryCursor(-1);

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
  }, [addToHistory, fetchUser]);

  const handleToggleCompare = useCallback(() => {
    setCompareMode((prev) => {
      const next = !prev;
      if (next) {
        toast('Compare mode activated! ⚔️', { icon: '⚔️' });
      }
      return next;
    });
  }, []);

  const handleInputFocus = useCallback(() => {
    if (hideHistoryTimer.current) {
      clearTimeout(hideHistoryTimer.current);
    }
    setHistoryVisible(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    hideHistoryTimer.current = setTimeout(() => setHistoryVisible(false), 140);
  }, []);

  const focusSearch = useCallback(() => {
    const input = document.getElementById('gitscout-search-input');
    if (input) {
      input.focus();
      input.select();
    }
    handleInputFocus();
  }, [handleInputFocus]);

  const clearUiState = useCallback(() => {
    if (shortcutsOpen) {
      setShortcutsOpen(false);
      return;
    }

    setActiveQuery('');
    setHistoryVisible(false);
    setHasSearched(false);
    clearData();
  }, [clearData, shortcutsOpen]);

  const goHome = useCallback(() => {
    navigate('/');
    setCompareMode(false);
    clearUiState();
  }, [clearUiState, navigate]);

  const moveHistoryCursor = useCallback(
    (direction) => {
      if (!history.length) {
        return;
      }

      setHistoryCursor((prev) => {
        let nextIndex = prev + direction;

        if (nextIndex < 0) {
          nextIndex = 0;
        }

        if (nextIndex > history.length - 1) {
          nextIndex = history.length - 1;
        }

        setActiveQuery(history[nextIndex]);
        focusSearch();
        return nextIndex;
      });
    },
    [focusSearch, history]
  );

  useKeyboard({
    onFocusSearch: focusSearch,
    onClear: clearUiState,
    onOpenShortcuts: () => setShortcutsOpen(true),
    onToggleTheme: toggleTheme,
    onToggleCompare: handleToggleCompare,
    onGoHome: goHome,
    onHistoryUp: () => moveHistoryCursor(1),
    onHistoryDown: () => moveHistoryCursor(-1),
    onSearch: () => handleSearch(activeQuery)
  });

  return (
    <div className="relative min-h-screen bg-bgBase font-body text-textPrimary">
      <div className="orb-blue" aria-hidden="true" />
      <div className="orb-violet" aria-hidden="true" />

      <Navbar onToggleCompare={handleToggleCompare} compareMode={compareMode} onOpenShortcuts={() => setShortcutsOpen(true)} />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-5 pb-20 pt-28 sm:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <SearchBar
            onSearch={handleSearch}
            suggestions={EMPTY_SUGGESTIONS}
            loading={loading}
            initialValue={activeQuery}
            onInputFocus={handleInputFocus}
            onInputBlur={handleInputBlur}
            onInputChange={(value) => {
              setActiveQuery(value);
              setHistoryCursor(-1);
            }}
          />

          <SearchHistory
            visible={historyVisible}
            items={history}
            onSelect={(username) => handleSearch(username)}
            onRemove={removeHistoryItem}
            onClearAll={clearHistory}
          />
        </div>

        {compareMode ? (
          <Suspense fallback={<LoadingCard />}>
            <CompareMode />
          </Suspense>
        ) : null}

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

      <Footer />
      <ScrollToTop />
      <KeyboardShortcuts open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid rgba(37, 99, 235, 0.4)',
            borderRadius: '12px',
            fontSize: '14px',
            backdropFilter: 'blur(20px)'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: 'var(--bg-card)'
            },
            duration: 3000
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'var(--bg-card)'
            },
            duration: 4000
          }
        }}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
