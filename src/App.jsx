import { useMemo, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import LoadingCard from './components/LoadingCard';
import ErrorCard from './components/ErrorCard';
import { useGithub } from './hooks/useGithub';

// Curated quick-search handles for a fast first interaction.
const EMPTY_SUGGESTIONS = ['torvalds', 'gaearon', 'sindresorhus', 'dan_abramov'];

function App() {
  const [activeQuery, setActiveQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const { userData, topRepos, loading, error, errorType, fetchUser } = useGithub();

  const emptyState = useMemo(() => !loading && !error && !userData && !hasSearched, [loading, error, userData, hasSearched]);

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
      toast.success(`Found ${result.data.name || query}! 🎉`);
      return;
    }

    if (result.type === 'not-found') {
      toast.error('GitHub user not found! 🔍');
      return;
    }

    toast.error('Something went wrong. Try again!');
  };

  return (
    <div className="relative min-h-screen bg-bgBase font-body text-textPrimary">
      <div className="orb-blue" aria-hidden="true" />
      <div className="orb-violet" aria-hidden="true" />

      <Navbar />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-5 pb-20 pt-28 sm:px-8">
        <SearchBar onSearch={handleSearch} suggestions={EMPTY_SUGGESTIONS} loading={loading} initialValue={activeQuery} />

        <section className="mt-8 flex min-h-[360px] items-start justify-center">
          {loading && <LoadingCard />}

          {!loading && error && <ErrorCard type={errorType} message={error} onRetry={() => handleSearch(activeQuery)} />}

          {!loading && !error && userData && <ProfileCard user={userData} repos={topRepos} />}

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
