export function formatNumber(value) {
  if (value === null || value === undefined) {
    return '0';
  }

  return new Intl.NumberFormat('en-US', {
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  }).format(value);
}

export function formatJoinDate(dateString) {
  if (!dateString) {
    return 'Unknown';
  }

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function normalizeUrl(url) {
  if (!url) {
    return '';
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `https://${url}`;
}

export function trimText(text, maxLength = 140) {
  if (!text) {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}
