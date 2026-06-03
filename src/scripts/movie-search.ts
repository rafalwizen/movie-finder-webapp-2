/**
 * Client-side progressive enhancement for instant movie search.
 * Intercepts the search form and fetches updated HTML without a full page reload.
 */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector<HTMLInputElement>('[data-search-input]');
  const gridContainer = document.querySelector<HTMLElement>('[data-movie-grid]');

  if (!input || !gridContainer) return;

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let abortController: AbortController | null = null;

  input.addEventListener('input', () => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      const query = input.value.trim();

      // Cancel any in-flight request
      if (abortController) abortController.abort();
      abortController = new AbortController();

      // Show loading state
      gridContainer.classList.add('opacity-50', 'pointer-events-none', 'transition-opacity');

      try {
        const url = query ? `/?q=${encodeURIComponent(query)}` : '/';
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) return;

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newGrid = doc.querySelector('[data-movie-grid]');

        if (newGrid) {
          gridContainer.innerHTML = newGrid.innerHTML;
        }

        // Update URL bar without reload
        const newUrl = query ? `/?q=${encodeURIComponent(query)}` : '/';
        history.replaceState({}, '', newUrl);
      } catch (err) {
        // Ignore abort errors
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error('Search fetch failed:', err);
      } finally {
        gridContainer.classList.remove('opacity-50', 'pointer-events-none');
        abortController = null;
      }
    }, 300);
  });
});
