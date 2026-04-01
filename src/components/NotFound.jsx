import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="orb-blue" aria-hidden="true" />
      <div className="orb-violet" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mx-auto mb-7 h-20 w-20 animate-float rounded-full border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.8)] p-3">
          <svg viewBox="0 0 100 100" className="h-full w-full text-textSecondary" role="img" aria-label="Octocat style icon">
            <circle cx="50" cy="44" r="24" fill="currentColor" opacity="0.35" />
            <circle cx="40" cy="40" r="3" fill="currentColor" />
            <circle cx="60" cy="40" r="3" fill="currentColor" />
            <path d="M36 54c4 4 24 4 28 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M30 30l-8-10m48 10l8-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="gradient-text animate-float text-[6rem] font-black leading-none sm:text-[8rem]">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-textSecondary sm:text-3xl">Lost in the repository void</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-textSecondary sm:text-base">
          The page you are looking for does not exist. Let us get you back to discovering developers.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-gradient-to-r from-accentBlue to-accentViolet px-6 py-3 font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.35)] transition hover:scale-[1.02]"
          >
            Go Home
          </Link>
          <Link
            to="/"
            className="rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.75)] px-6 py-3 font-semibold text-textPrimary transition hover:border-[rgba(37,99,235,0.5)]"
          >
            Search a Profile
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
