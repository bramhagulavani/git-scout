export const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  React: '#61dafb',
  Vue: '#41b883',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Jupyter: '#DA5B0B'
};

export function getLanguageColor(language) {
  if (!language) {
    return '#8b949e';
  }

  return languageColors[language] || '#8b949e';
}
