# GitFinder

A premium GitHub Profile Finder built with React + Vite + Tailwind CSS.

## Overview
GitFinder lets you search any GitHub username and instantly view profile details in a polished, production-grade interface with glassmorphism styling, micro-animations, and robust loading/error handling.

## Phase 1 Features
- Vite + React 18 + Tailwind CSS setup
- Hero search experience with suggestion chips
- GitHub API integration via axios
- Profile hero card with key user metadata
- Reusable stat cards with animated count-up
- Loading skeleton state
- Error and empty states
- Toast notifications with custom theme
- Responsive dark UI with animated gradient orbs

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

## API Used
- User profile: https://api.github.com/users/{username}
- Top repositories preview: https://api.github.com/users/{username}/repos?sort=stars&per_page=6

## Project Structure
```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── ProfileCard.jsx
│   ├── StatCard.jsx
│   ├── LoadingCard.jsx
│   └── ErrorCard.jsx
├── hooks/
│   └── useGithub.js
├── utils/
│   └── formatters.js
├── App.jsx
├── main.jsx
└── index.css
```

## Notes
- This repository currently includes only Phase 1 scope.
- Repository list deep-dive and analytics are intentionally excluded in this phase.
