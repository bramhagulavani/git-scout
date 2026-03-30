import { Clock3, X } from 'lucide-react';

function SearchHistory({ visible, items = [], onSelect, onRemove, onClearAll }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="search-history-panel glass-card mt-3 w-full rounded-2xl p-2">
      {items.length === 0 ? (
        <p className="px-3 py-4 text-sm text-textSecondary">No recent searches yet.</p>
      ) : (
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-1 rounded-xl px-1 py-0.5 transition hover:bg-[rgba(37,99,235,0.15)]">
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="flex flex-1 items-center gap-2 rounded-xl px-2 py-2 text-left"
              >
                <span className="inline-flex items-center gap-2 text-sm text-textPrimary">
                  <Clock3 size={14} className="text-textSecondary" />
                  {item}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onRemove(item)}
                className="rounded p-1 text-textSecondary transition hover:bg-[rgba(239,68,68,0.15)] hover:text-danger"
                aria-label={`Remove ${item}`}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 ? (
        <div className="mt-2 border-t border-[rgba(48,54,61,0.8)] px-2 pb-1 pt-2 text-right">
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-textSecondary transition hover:text-textPrimary"
          >
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default SearchHistory;
