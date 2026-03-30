const POPULAR_USERS = ['torvalds', 'gaearon', 'sindresorhus'];

function ErrorCard({ type = 'generic', message, onRetry, onQuickSearch }) {
  const isNotFound = type === 'not-found';
  const emoji = isNotFound ? '🔍' : '⚠️';
  const heading = isNotFound ? 'Oops! User not found' : 'Oops! Something broke';
  const subtext = isNotFound ? 'Check the username and try again' : message || 'Please try again in a moment';

  return (
    <div className="glass-card animate-fade-slide-up w-full max-w-2xl rounded-3xl p-10 text-center">
      <div className="text-6xl" aria-hidden="true">
        {emoji}
      </div>

      <h3 className="mt-4 font-display text-3xl font-bold text-textPrimary">{heading}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-textSecondary">{subtext}</p>

      {isNotFound ? (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-wide text-textTertiary">Try popular users</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {POPULAR_USERS.map((user) => (
              <button
                key={user}
                type="button"
                onClick={() => onQuickSearch?.(user)}
                className="rounded-full border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.75)] px-3 py-1.5 text-xs text-textSecondary transition hover:border-[rgba(37,99,235,0.5)] hover:text-textPrimary"
              >
                {user}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onRetry}
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accentBlue to-accentViolet px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.97]"
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorCard;
