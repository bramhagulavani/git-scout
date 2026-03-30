# GitScout

A premium GitHub Profile Finder and comparison app built with React, Vite, and Tailwind CSS.

## Overview
GitScout lets users search GitHub profiles, explore repositories with rich filtering and language insights, review recent search history, and compare two developers side by side with winner highlights.

## Completed Features

### Phase 1
- Vite + React 18 + Tailwind CSS project setup
- Premium hero search experience with suggestion chips
- GitHub API integration through axios
- Profile hero card with identity, bio, metadata, and stats
- Loading skeleton, empty state, and error state
- Toast notification system with custom styling
- Dark glassmorphism UI with animated gradient background orbs

### Phase 2
- Repository list section with:
	- sorting (stars, updated date, name, forks)
	- language filter
	- live text filtering
	- incremental load more behavior
- Repository cards with language dot, visibility/fork badge, stats, and copy-link action
- Language distribution bar with animated segment fill and legend chips
- Contribution activity summary in profile card
- Upgraded user-not-found experience with quick-search suggestions
- Search history dropdown powered by localStorage
- Compare mode with side-by-side profile match-up and category winners:
	- followers winner
	- public repos winner
	- total stars winner

## Tech Stack
- React 18
- Vite 5
- Tailwind CSS 3
- axios
- react-hot-toast
- lucide-react

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

## API Endpoints Used
- User profile:
	- https://api.github.com/users/{username}
- User repositories (used for repo list, language stats, compare metrics):
	- https://api.github.com/users/{username}/repos?sort=updated&per_page=100

## Persistence
- Search history key:
	- gitscout_search_history

## Project Structure
```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── ProfileCard.jsx
│   ├── StatCard.jsx
│   ├── LoadingCard.jsx
│   ├── ErrorCard.jsx
│   ├── RepoCard.jsx
│   ├── RepoList.jsx
│   ├── LanguageBar.jsx
│   ├── SearchHistory.jsx
│   └── CompareMode.jsx
├── hooks/
│   └── useGithub.js
├── utils/
│   ├── formatters.js
│   └── languageColors.js
├── App.jsx
├── main.jsx
└── index.css
```

## Scripts
- npm run dev: start development server
- npm run build: generate production build
- npm run preview: preview production build locally

## Notes
- Built against GitHub public REST API without auth.
- If GitHub rate limits are reached, retry after cooldown.
