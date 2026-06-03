# Movie Finder

Lightweight frontend for browsing movies and cinema screenings. Built with Astro, Tailwind CSS, and TypeScript.

## Features

- Movie listing with instant search
- Movie detail page with upcoming screenings
- Filtering screenings by city and date
- Server-side rendering (no CORS issues with the backend API)
- Responsive design (mobile-first)

## Tech Stack

- [Astro](https://astro.build/) 6 — SSR mode
- [Tailwind CSS](https://tailwindcss.com/) 4
- TypeScript (strict mode)
- Vanilla JS for client-side interactivity

## Prerequisites

- Node.js 18+
- Backend API running (default: `http://localhost:8080`)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:4321`.

## Configuration

Create a `.env` file in the project root (one is provided by default):

```env
API_BASE_URL=http://localhost:8080
```

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server             |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── EmptyState.astro
│   ├── MovieCard.astro
│   ├── MovieGrid.astro
│   ├── ProviderBadge.astro
│   ├── ScreeningCard.astro
│   ├── ScreeningFilters.astro
│   ├── ScreeningList.astro
│   └── SearchBar.astro
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   └── api.ts        # Server-side API client
├── pages/
│   ├── index.astro   # Home — movie list + search
│   └── movies/
│       └── [id].astro # Movie detail — screenings + filters
├── scripts/
│   ├── movie-search.ts      # Debounced instant search
│   └── screening-filters.ts # DOM-based card filtering
├── styles/
│   └── global.css
└── types/
    └── index.ts      # TypeScript interfaces
```

## API Reference

The backend API is documented in [`docs/API.md`](docs/API.md).

## License

ISC
