/**
 * Client-side filtering for screening cards.
 * Filters by city and date using data attributes on the card elements.
 */
document.addEventListener('DOMContentLoaded', () => {
  const filtersContainer = document.querySelector<HTMLElement>('[data-filters]');
  const screeningList = document.querySelector<HTMLElement>('[data-screening-list]');

  if (!filtersContainer || !screeningList) return;

  const citySelect = filtersContainer.querySelector<HTMLSelectElement>('[data-filter-city]');
  const dateInput = filtersContainer.querySelector<HTMLInputElement>('[data-filter-date]');
  const clearBtn = filtersContainer.querySelector<HTMLButtonElement>('[data-filter-clear]');
  const noResults = screeningList.querySelector<HTMLElement>('[data-no-results]');

  function applyFilters() {
    const cityFilter = citySelect?.value ?? '';
    const dateFilter = dateInput?.value ?? '';

    const cards = screeningList.querySelectorAll<HTMLElement>('[data-screening-card]');
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCity = card.dataset.city ?? '';
      const cardDate = card.dataset.date ?? '';

      const cityMatch = !cityFilter || cardCity === cityFilter;
      const dateMatch = !dateFilter || cardDate === dateFilter;

      if (cityMatch && dateMatch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Toggle "no results" message
    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
  }

  citySelect?.addEventListener('change', applyFilters);
  dateInput?.addEventListener('change', applyFilters);

  clearBtn?.addEventListener('click', () => {
    if (citySelect) citySelect.value = '';
    if (dateInput) dateInput.value = '';
    applyFilters();
  });
});
