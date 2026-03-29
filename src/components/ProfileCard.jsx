import { Building2, CalendarDays, Github, Link as LinkIcon, MapPin, Twitter } from 'lucide-react';
import StatCard from './StatCard';
import { formatJoinDate, normalizeUrl, trimText } from '../utils/formatters';

function InfoItem({ icon: Icon, value, href }) {
  if (!value) {
    return null;
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-textSecondary transition hover:text-accentBlue"
      >
        <Icon size={14} />
        <span className="truncate">{value}</span>
      </a>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-sm text-textSecondary">
      <Icon size={14} />
      <span className="truncate">{value}</span>
    </div>
  );
}

function ProfileCard({ user }) {
  const profileStats = [
    {
      label: 'Public Repos',
      value: user.public_repos,
      icon: '📦',
      color: '#2563eb'
    },
    {
      label: 'Followers',
      value: user.followers,
      icon: '👥',
      color: '#7c3aed'
    },
    {
      label: 'Following',
      value: user.following,
      icon: '👤',
      color: '#10b981'
    },
    {
      label: 'Public Gists',
      value: user.public_gists,
      icon: '⭐',
      color: '#f59e0b'
    }
  ];

  return (
    <article className="glass-card animate-fade-slide-up w-full max-w-[800px] rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(37,99,235,0.15)] sm:p-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="mx-auto sm:mx-0">
          <div className="rounded-full bg-gradient-to-br from-accentBlue to-accentViolet p-[3px]">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-[120px] w-[120px] rounded-full border border-[rgba(48,54,61,0.8)] object-cover shadow-[0_0_30px_rgba(37,99,235,0.3)] transition duration-200 hover:scale-105"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-display text-center text-3xl font-extrabold tracking-tight text-textPrimary sm:text-left">{user.name || user.login}</h2>

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-center text-base text-accentBlue transition hover:text-[#4e81ec] sm:text-left"
          >
            @{user.login}
          </a>

          <p className="mt-3 text-center text-sm italic text-textSecondary sm:text-left">{trimText(user.bio, 160) || 'No bio available.'}</p>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <InfoItem icon={MapPin} value={user.location} />
            <InfoItem icon={Building2} value={user.company} />
            <InfoItem icon={LinkIcon} value={user.blog} href={normalizeUrl(user.blog)} />
            <InfoItem
              icon={Twitter}
              value={user.twitter_username ? `@${user.twitter_username}` : ''}
              href={user.twitter_username ? `https://twitter.com/${user.twitter_username}` : ''}
            />
          </div>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-textTertiary">
            <CalendarDays size={14} />
            Joined {formatJoinDate(user.created_at)}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {profileStats.map((item) => (
          <StatCard key={item.label} icon={item.icon} label={item.label} value={item.value} color={item.color} />
        ))}
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accentBlue to-accentViolet px-6 py-3.5 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.35)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(124,58,237,0.4)]"
      >
        <Github size={18} />
        View Full Profile on GitHub
      </a>
    </article>
  );
}

export default ProfileCard;
