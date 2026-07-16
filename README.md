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
- Backend API running (set its URL via `API_BASE_URL`, see `.env.example`)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:4321`.

## Configuration

The app reads the backend API base URL from the `API_BASE_URL` environment
variable. Copy `.env.example` to `.env` and adjust as needed:

```env
API_BASE_URL=http://localhost:8080
```

> If `API_BASE_URL` is unset, the app shows a "Serwis tymczasowo niedostępny"
> notice instead of rendering content.

## Deployment (Vercel)

This project ships with the `@astrojs/vercel` adapter, so no extra build
configuration is needed. On Vercel the `.env` file is **not** read (it's
gitignored), so set the variable in the dashboard:

1. Project **Settings → Environment Variables**
2. Add `API_BASE_URL` = `http://localhost:8080`
3. Trigger a redeploy

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
