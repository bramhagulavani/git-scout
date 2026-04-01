# GitScout - GitHub Profile Finder

GitScout is a premium GitHub profile discovery experience built for developers. Search any GitHub username, inspect profile insights, explore repositories with filters and language breakdowns, compare two developers side by side, and navigate the app fast with keyboard-first controls.

## Features

- Instant GitHub profile search with curated quick suggestions
- Rich profile card with bio, social links, join date, and activity insights
- Stat cards with polished count animations
- Loading, empty, and error states with clear UX feedback
- Toast notifications for key app events
- Repository explorer with sorting, language filter, search, and load-more pagination
- Language distribution visualization with weighted percentages
- Search history with localStorage persistence and quick replay
- Compare mode for two GitHub profiles with winner highlights
- Dark and light theme toggle with saved preference
- Keyboard shortcuts modal and global app shortcuts
- Scroll-to-top floating action button
- Custom 404 page with branded visuals and call-to-action buttons
- PWA manifest and robots.txt support
- SEO and social metadata in HTML head
- Lazy loading and memoization improvements for smoother runtime performance

## Live Demo

[gitscout.vercel.app](https://gitscout.vercel.app)

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- GitHub REST API
- react-hot-toast
- lucide-react
- axios

## Installation

```bash
git clone https://github.com/your-username/git-scout.git
cd git-scout
npm install
npm run dev
```

## Usage

- Enter a GitHub username in the search bar and press Enter.
- Use Compare mode to evaluate two profiles by followers, repos, and stars.
- Use keyboard shortcuts:
- `/` or `Ctrl+K` focus search
- `?` open shortcuts modal
- `T` toggle theme
- `C` toggle compare mode
- `H` return home/clear state
- `Arrow Up/Down` browse search history

## Deploy

### Vercel Steps

1. Run `npm run build` locally.
2. Run `npm run preview` to validate production output.
3. Go to [vercel.com](https://vercel.com) and import the `git-scout` repository.
4. Confirm framework preset: `Vite` (auto-detected).
5. Set build command: `npm run build`.
6. Set output directory: `dist`.
7. Click Deploy.

Your app will be live at `gitscout.vercel.app`.

## License

MIT
