import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle relative h-6 w-12 overflow-hidden rounded-full border transition duration-300 ${
        isDark
          ? 'border-[rgba(48,54,61,0.8)] bg-[#1e293b]'
          : 'border-[rgba(37,99,235,0.45)] bg-gradient-to-r from-accentBlue to-accentViolet'
      }`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      aria-pressed={theme === 'light'}
    >
      <span className="pointer-events-none absolute inset-0">
        {isDark ? (
          <>
            <span className="theme-star left-2 top-1" />
            <span className="theme-star left-5 top-3" />
            <span className="theme-star left-8 top-1.5" />
          </>
        ) : (
          <span className="theme-rays" aria-hidden="true" />
        )}
      </span>

      <span
        className={`absolute top-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-800 shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-all duration-300 ${
          isDark ? 'left-0.5' : 'left-[26px]'
        }`}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  );
}

export default ThemeToggle;
