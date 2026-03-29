import { useEffect, useMemo, useState } from 'react';
import { formatNumber } from '../utils/formatters';

function StatCard({ icon, label, value, color = '#2563eb' }) {
  const [displayValue, setDisplayValue] = useState(0);

  const numericValue = useMemo(() => Number(value) || 0, [value]);

  useEffect(() => {
    let frameId;
    const duration = 900;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(eased * numericValue));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [numericValue]);

  return (
    <div className="glass-card animate-count-up rounded-xl p-4 transition duration-200 hover:scale-105 hover:border-[rgba(37,99,235,0.6)]">
      <div
        className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
        style={{ backgroundColor: `${color}33`, color }}
      >
        {icon}
      </div>

      <p className="font-display text-2xl font-bold leading-none gradient-text">{formatNumber(displayValue)}</p>
      <p className="mt-2 text-xs uppercase tracking-wide text-textSecondary">{label}</p>
    </div>
  );
}

export default StatCard;
