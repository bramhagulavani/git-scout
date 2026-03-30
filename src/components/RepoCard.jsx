import { Copy, Eye, GitFork, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatNumber, trimText } from '../utils/formatters';
import { getLanguageColor } from '../utils/languageColors';

function RepoCard({ repo, index = 0 }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(repo.html_url);
      toast.success('Repo link copied! 📋');
    } catch {
      toast.error('Unable to copy repo link.');
    }
  };

  return (
    <article
      className="repo-card glass-card rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(37,99,235,0.2)]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="truncate text-base font-bold text-accentBlue transition hover:text-[#4e81ec]"
          title={repo.name}
        >
          {repo.name}
        </a>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
            repo.fork ? 'bg-[rgba(245,158,11,0.18)] text-warning' : 'bg-[rgba(16,185,129,0.18)] text-success'
          }`}
        >
          {repo.fork ? 'Fork' : 'Public'}
        </span>
      </div>

      <p className={`mt-3 description-clamp text-sm text-textSecondary ${repo.description ? '' : 'italic'}`}>
        {trimText(repo.description, 140) || 'No description provided'}
      </p>

      {repo.language ? (
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-textSecondary">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
          {repo.language}
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-3 text-xs text-textSecondary">
        <div className="inline-flex items-center gap-1.5">
          <Star size={14} />
          {formatNumber(repo.stargazers_count || 0)}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <GitFork size={14} />
          {formatNumber(repo.forks_count || 0)}
        </div>
        <div className="inline-flex items-center gap-1.5">
          <Eye size={14} />
          {formatNumber(repo.watchers_count || 0)}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 transition hover:bg-[rgba(37,99,235,0.2)] hover:text-textPrimary"
          aria-label={`Copy ${repo.name} link`}
        >
          <Copy size={13} />
        </button>
      </div>
    </article>
  );
}

export default RepoCard;
