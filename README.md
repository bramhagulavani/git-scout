# GitScout - GitHub Profile Finder

**A premium developer experience for discovering and analyzing GitHub profiles.** Search any GitHub username, inspect profile insights, explore repositories with advanced filters, compare developer stats side-by-side, and navigate with keyboard-first shortcuts.

---

## 🌟 Features

### Profile Discovery
- Instant GitHub profile search with curated quick suggestions
- Rich profile card displaying bio, social links, join date, and activity metrics
- Animated stat cards showing followers, repositories, and stars count
- Activity insights and profile metadata

### Repository Exploration
- Advanced repository explorer with sorting and filtering
- Language-based filtering with color-coded distribution
- Built-in search within repositories
- Load-more pagination for efficient data fetching
- Language distribution visualization with weighted percentages

### Developer Tools
- **Compare Mode**: Evaluate two GitHub profiles side-by-side
  - Direct comparison of followers, repositories, and stars
  - Winner highlights for competitive analysis
  - Quick profile switching
  
- **Search History**: localStorage-powered history with quick replay
- **Keyboard Shortcuts**: Global app navigation
  - `/` or `Ctrl+K` - Focus search bar
  - `?` - Open shortcuts modal
  - `T` - Toggle dark/light theme
  - `C` - Toggle compare mode
  - `H` - Return home and clear state
  - `Arrow Up/Down` - Browse search history

### User Experience
- Dark and light theme toggle with persistent preference
- Loading, empty, and error states with clear UX feedback
- Toast notifications for app events
- Scroll-to-top floating action button
- Custom 404 page with branded visuals
- Responsive mobile-friendly design
- Skip animation preferences for accessibility

### Technical Optimizations
- Lazy loading of components
- React memoization for performance
- Smooth runtime performance
- PWA manifest support
- robots.txt for SEO crawling
- SEO and social metadata in HTML head

---

## 🎯 Live Demo

[**Visit GitScout on Vercel →**](https://gitscout.vercel.app)

---

## 🛠 Tech Stack

| Category | Tools |
|----------|-------|
| **Frontend** | React 18, Vite 5 |
| **Styling** | Tailwind CSS 3 |
| **HTTP Client** | Axios |
| **Routing** | React Router DOM 7 |
| **UI Components** | Lucide React (Icons) |
| **Notifications** | React Hot Toast |
| **Build** | PostCSS, Autoprefixer |

---

## 📁 Project Structure

```
git-scout/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── CompareMode.jsx      # Side-by-side profile comparison
│   │   ├── ErrorCard.jsx        # Error state display
│   │   ├── Footer.jsx           # App footer
│   │   ├── KeyboardShortcuts.jsx # Shortcuts modal
│   │   ├── LanguageBar.jsx      # Language filter buttons
│   │   ├── LoadingCard.jsx      # Loading skeleton state
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── NotFound.jsx         # 404 page
│   │   ├── ProfileCard.jsx      # GitHub profile display
│   │   ├── RepoCard.jsx         # Individual repository card
│   │   ├── RepoList.jsx         # Repository list container
│   │   ├── ScrollToTop.jsx      # Floating action button
│   │   ├── SearchBar.jsx        # Profile search input
│   │   ├── SearchHistory.jsx    # Search history suggestions
│   │   ├── StatCard.jsx         # Stats counter display
│   │   └── ThemeToggle.jsx      # Dark/light theme switcher
│   │
│   ├── context/
│   │   └── ThemeContext.jsx     # Global theme state management
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useGithub.js         # GitHub API data fetching
│   │   └── useKeyboard.js       # Keyboard event handling
│   │
│   ├── utils/                   # Utility functions
│   │   ├── formatters.js        # Data formatting helpers
│   │   └── languageColors.js    # Language color mappings
│   │
│   ├── App.jsx                  # Main app component & router
│   ├── index.css                # Global styles
│   └── main.jsx                 # React DOM entry point
│
├── public/
│   ├── manifest.json            # PWA manifest configuration
│   └── robots.txt               # Search engine crawling rules
│
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite build configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/git-scout.git
cd git-scout

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📖 Usage Guide

### Search for a Profile
1. Click the search bar or press `/` / `Ctrl+K`
2. Enter a GitHub username
3. Press Enter or click the search button
4. View the profile card with stats and repositories

### Compare Two Profiles
1. Press `C` or click the Compare button
2. Search for the first profile
3. In the right panel, search for the second profile
4. See highlighted comparisons of followers, repos, and stars

### Filter Repositories
1. After searching a profile, use the **Language Bar** to filter by programming language
2. Click a language to toggle the filter
3. View filtered repositories in real-time

### View Search History
- Click the **History** section below the search bar to see previous searches
- Click any history item to instantly load that profile
- Browse history with `Arrow Up/Down` keys

### Theme Toggle
- Click the theme icon in the navbar or press `T` to switch between dark/light mode
- Your preference is saved for next visit

### Keyboard Shortcuts
Press `?` to open the shortcuts modal and see all available keyboard commands

---

## 🔌 API Integration

GitScout uses the **GitHub REST API** to fetch:
- User profile information (bio, location, followers, repos, etc.)
- Repository data (stars, languages, descriptions)
- Public activity metrics

**Note:** API requests are rate-limited. For authenticated requests, add a GitHub personal access token in your environment.

---

## 📦 Dependencies

All dependencies are listed in [package.json](package.json). Key packages:
- `react@^18.3.1` - UI framework
- `react-domRouter@^7.13.2` - Client-side routing
- `axios@^1.8.4` - HTTP client for API calls
- `tailwindcss@^3.4.17` - Utility-first CSS
- `lucide-react@^0.511.0` - Icon components
- `react-hot-toast@^2.5.2` - Toast notifications
- `vite@^5.4.19` - Build tool

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   npm run preview  # Test production build
   ```

2. **Push to GitHub** (if not already done)

3. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your `git-scout` repository
   - Confirm settings:
     - **Framework Preset:** Vite (auto-detected)
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live at `https://gitscout.vercel.app`

### Other Hosting Options
- **Netlify:** Similar steps, auto-detects Vite
- **GitHub Pages:** Build and push `dist/` folder
- **Docker:** Create a Dockerfile for containerized deployment

---

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize:
- Color palette
- Font families
- Breakpoints
- Custom components

### Language Colors
Edit `src/utils/languageColors.js` to add or modify language color mappings

### API Base URL
Update the API endpoints in `src/hooks/useGithub.js` if using a different GitHub API instance

---

## 📝 Development Tips

- **Hot Module Replacement (HMR):** Changes auto-reload in dev mode
- **Keyboard Debugging:** Edit `src/hooks/useKeyboard.js` to add new shortcuts
- **Component Reusability:** StatCard, RepoCard, and ErrorCard are highly reusable
- **Context State:** Use ThemeContext pattern for global app state
- **Performance:** Use React.memo() for frequently-rendered components

---

## 🐛 Known Limitations

- GitHub API has rate limits (60 requests/hour unauthenticated, 5000/hour authenticated)
- Compare mode requires loading two separate profiles
- Repository search is client-side only (limited to fetched repos)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📧 Support

For questions or issues, please open a GitHub Issue or contact the maintainer.

---

**Made with ❤️ for developers exploring GitHub**
