import { X } from 'lucide-react';

const SHORTCUTS = [
  { keys: ['/', 'Ctrl+K'], description: 'Focus search' },
  { keys: ['Enter'], description: 'Search user' },
  { keys: ['Escape'], description: 'Clear search' },
  { keys: ['?'], description: 'Show shortcuts' },
  { keys: ['T'], description: 'Toggle theme' },
  { keys: ['C'], description: 'Compare mode' },
  { keys: ['H'], description: 'Go to home' },
  { keys: ['Arrow Up/Down'], description: 'History nav' }
];

function KeyBadge({ children }) {
  return (
    <span className="inline-flex min-w-[64px] justify-center rounded-full border border-[rgba(48,54,61,0.8)] bg-[#1e293b] px-3 py-1 font-mono text-xs text-[#f0f6fc]">
      {children}
    </span>
  );
}

function KeyboardShortcuts({ open, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
      <button
        type="button"
        className="absolute inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm"
        aria-label="Close keyboard shortcuts"
        onClick={onClose}
      />

      <div className="glass-card relative z-10 w-full max-w-2xl rounded-2xl p-5 sm:p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close shortcuts"
          className="absolute right-4 top-4 rounded-md p-1 text-textSecondary transition hover:bg-[rgba(239,68,68,0.15)] hover:text-danger"
        >
          <X size={18} />
        </button>

        <h3 className="font-display text-2xl font-bold text-textPrimary">⌨️ Keyboard Shortcuts</h3>
        <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-accentBlue to-accentViolet" />

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          {SHORTCUTS.map((item) => (
            <div key={item.description} className="flex items-center justify-between rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.7)] px-3 py-2">
              <div className="inline-flex items-center gap-1.5">
                {item.keys.map((key) => (
                  <KeyBadge key={key}>{key}</KeyBadge>
                ))}
              </div>
              <span className="text-sm text-textSecondary">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KeyboardShortcuts;
