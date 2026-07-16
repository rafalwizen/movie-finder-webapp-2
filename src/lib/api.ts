import type { Movie, Screening } from '../types';

const RAW_API_BASE_URL = (import.meta.env.API_BASE_URL ?? '').trim();

/**
 * Whether the API base URL is configured via the API_BASE_URL environment variable.
 * Pages use this to render a configuration notice instead of silently failing.
 */
export function isApiConfigured(): boolean {
  return RAW_API_BASE_URL.length > 0;
}

function getBaseUrl(): string {
  return RAW_API_BASE_URL.replace(/\/+$/, '');
}

export async function fetchMovies(q?: string): Promise<Movie[]> {
  try {
    const params = new URLSearchParams();
    if (q && q.trim()) {
      params.set('q', q.trim());
    }
    const query = params.toString();
    const url = `${getBaseUrl()}/api/movies${query ? `?${query}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export async function fetchAllMovies(): Promise<Movie[]> {
  try {
    const url = `${getBaseUrl()}/api/movies/allMovies`;
    const response = await fetch(url);
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export async function fetchMovieById(id: number): Promise<Movie | null> {
  const movies = await fetchAllMovies();
  return movies.find((m) => m.id === id) ?? null;
}

export async function fetchScreenings(
  movieId: number,
  includePast = false
): Promise<Screening[]> {
  try {
    const params = new URLSearchParams({ movieId: String(movieId) });
    if (includePast) {
      params.set('includePast', 'true');
    }
    const url = `${getBaseUrl()}/api/screenings/by-movie?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

/**
 * Format an ISO-8601 datetime string into a human-readable Polish locale string.
 */
export function formatScreeningDatetime(iso: string): {
  date: string;
  time: string;
  isoDate: string;
} {
  const dt = new Date(iso);
  const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'long',
  });
  const timeFormatter = new Intl.DateTimeFormat('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
  });
  // ISO date portion (YYYY-MM-DD) used for client-side filtering
  const isoDate = iso.slice(0, 10);
  return {
    date: dateFormatter.format(dt),
    time: timeFormatter.format(dt),
    isoDate,
  };
}
