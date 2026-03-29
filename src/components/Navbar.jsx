import { useEffect, useState } from 'react';
import { Github, Star } from 'lucide-react';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-[rgba(48,54,61,0.8)] bg-[rgba(6,9,16,0.85)] backdrop-blur-[20px] transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_8px_28px_rgba(0,0,0,0.45)]' : 'shadow-none'
      }`}
    >
      <nav className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
          <span className="gradient-text">{'{ GitFinder }'}</span>
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.9)] px-4 py-2 text-sm text-textSecondary transition duration-200 hover:border-[rgba(37,99,235,0.5)] hover:text-textPrimary"
        >
          <div className="inline-flex items-center gap-2">
            <Github size={16} />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="inline sm:hidden">Star</span>
            <Star size={14} className="text-warning" />
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-[rgba(16,185,129,0.1)] px-2 py-1 text-xs text-success sm:flex">
            <span className="api-live-dot" />
            API Live
          </div>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
