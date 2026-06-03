export interface Movie {
  id: number;
  title: string;
  year: number | null;
  posterUrl: string | null;
}

export interface Screening {
  screeningDatetime: string;
  cinemaName: string;
  cinemaCity: string | null;
  cinemaAddress: string | null;
  screeningUrl: string | null;
  providerCode: string;
}

export type ProviderCode = 'CINEMA_CITY' | 'MULTIKINO' | 'HELIOS' | string;

export interface ProviderInfo {
  name: string;
  colorClass: string;
}

export const PROVIDERS: Record<string, ProviderInfo> = {
  CINEMA_CITY: { name: 'Cinema City', colorClass: 'bg-purple-100 text-purple-800' },
  MULTIKINO: { name: 'Multikino', colorClass: 'bg-red-100 text-red-800' },
  HELIOS: { name: 'Helios', colorClass: 'bg-amber-100 text-amber-800' },
};
