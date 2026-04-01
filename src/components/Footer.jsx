import { Github, Star } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-[rgba(48,54,61,0.8)] bg-[rgba(6,9,16,0.95)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-5 py-6 text-center sm:px-8 md:grid-cols-3 md:text-left">
        <div>
          <h4 className="font-display text-xl font-extrabold">
            <span className="gradient-text">{'{ GitScout }'}</span>
          </h4>
          <p className="mt-2 text-sm text-textSecondary">Search any GitHub profile instantly</p>
        </div>

        <div className="space-y-1 text-sm text-textPrimary md:text-center">
          <p>Built with ❤️ using React + Tailwind</p>
          <p className="text-textSecondary">GitHub API powered - Free & Open Source</p>
        </div>

        <div className="flex items-center justify-center gap-2 md:justify-end">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.9)] text-textSecondary transition hover:border-[rgba(37,99,235,0.45)] hover:text-textPrimary"
            aria-label="GitHub repository"
          >
            <Github size={18} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[rgba(48,54,61,0.8)] bg-[rgba(13,17,23,0.75)] px-4 py-2 text-sm text-textPrimary transition hover:border-[rgba(37,99,235,0.45)]"
          >
            <Star size={16} className="text-warning" />
            ⭐ Star on GitHub
          </a>
        </div>
      </div>

      <div className="border-t border-[rgba(48,54,61,0.5)] py-3 text-center text-xs text-textSecondary">
        © 2026 GitScout. Made for developers.
      </div>
    </footer>
  );
}

export default Footer;
