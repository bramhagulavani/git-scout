import { useEffect } from 'react';

function isTypingTarget(target) {
  const tagName = target?.tagName;
  return tagName === 'INPUT' || tagName === 'TEXTAREA' || target?.isContentEditable;
}

export function useKeyboard({
  onFocusSearch,
  onClear,
  onOpenShortcuts,
  onToggleTheme,
  onToggleCompare,
  onGoHome,
  onHistoryUp,
  onHistoryDown,
  onSearch
}) {
  useEffect(() => {
    const onKeyDown = (event) => {
      const typing = isTypingTarget(event.target);

      if ((event.key === '/' && !typing) || (event.ctrlKey && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        onFocusSearch?.();
        return;
      }

      if (event.key === '?' && !typing) {
        event.preventDefault();
        onOpenShortcuts?.();
        return;
      }

      if (event.key === 'Escape') {
        if (typing) {
          return;
        }
        onClear?.();
        return;
      }

      if (typing) {
        if (event.key === 'Enter') {
          onSearch?.();
        }
        return;
      }

      const key = event.key.toLowerCase();

      if (key === 't') {
        event.preventDefault();
        onToggleTheme?.();
      }

      if (key === 'c') {
        event.preventDefault();
        onToggleCompare?.();
      }

      if (key === 'h') {
        event.preventDefault();
        onGoHome?.();
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        onHistoryUp?.();
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        onHistoryDown?.();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClear, onFocusSearch, onGoHome, onHistoryDown, onHistoryUp, onOpenShortcuts, onSearch, onToggleCompare, onToggleTheme]);
}
