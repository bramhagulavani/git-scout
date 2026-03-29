import { useEffect, useState } from 'react';
import { Github, Search } from 'lucide-react';

function SearchBar({ onSearch, suggestions = [], loading = false, initialValue = '' }) {
  const [username, setUsername] = useState(initialValue);

  useEffect(() => {
    setUsername(initialValue);
  }, [initialValue]);

  const submitSearch = (event) => {
    event.preventDefault();
    onSearch(username);
  };

  const handleSuggestionClick = (value) => {
    setUsername(value);
    onSearch(value);
  };

  return (
    <section className="animate-fade-slide-up relative z-10 mx-auto w-full max-w-4xl text-center">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-textPrimary sm:text-5xl">
        <span className="gradient-text">Discover GitHub Profiles</span>
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-base text-textSecondary sm:text-lg">Search any developer instantly</p>

      <form
        onSubmit={submitSearch}
        className="mx-auto mt-8 flex w-full items-center gap-3 rounded-2xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.9)] p-[8px_8px_8px_20px] backdrop-blur-[20px]"
      >
        <Github size={20} className="shrink-0 text-textSecondary" />

        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Search username... e.g. torvalds"
          className="h-12 w-full border-none bg-transparent text-base text-textPrimary placeholder:text-textTertiary focus:outline-none"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-accentBlue to-accentViolet px-7 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search size={18} />
          <span>{loading ? 'Searching...' : 'Search'}</span>
        </button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-textSecondary">
        <span className="mr-1">Try:</span>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => handleSuggestionClick(suggestion)}
            className="rounded-full border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.7)] px-3 py-1.5 text-textSecondary transition duration-200 hover:border-[rgba(37,99,235,0.5)] hover:text-textPrimary"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchBar;
