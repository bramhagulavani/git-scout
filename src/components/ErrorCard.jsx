function ErrorCard({ type = 'generic', message, onRetry }) {
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
