/**
 * Client-side filtering for screening cards.
 * Filters by city and date using data attributes on the card elements.
 */
document.addEventListener('DOMContentLoaded', () => {
  const filtersContainer = document.querySelector<HTMLElement>('[data-filters]');
  const screeningList = document.querySelector<HTMLElement>('[data-screening-list]');

  if (!filtersContainer || !screeningList) return;

  const citySelect = filtersContainer.querySelector<HTMLSelectElement>('[data-filter-city]');
  const providerSelect = filtersContainer.querySelector<HTMLSelectElement>('[data-filter-provider]');
  const dateInput = filtersContainer.querySelector<HTMLInputElement>('[data-filter-date]');
  const clearBtn = filtersContainer.querySelector<HTMLButtonElement>('[data-filter-clear]');
  const noResults = screeningList.querySelector<HTMLElement>('[data-no-results]');

  function applyFilters() {
    const cityFilter = citySelect?.value ?? '';
    const providerFilter = providerSelect?.value ?? '';
    const dateFilter = dateInput?.value ?? '';

    const cards = screeningList.querySelectorAll<HTMLElement>('[data-screening-card]');
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCity = card.dataset.city ?? '';
      const cardProvider = card.dataset.provider ?? '';
      const cardDate = card.dataset.date ?? '';

      const cityMatch = !cityFilter || cardCity === cityFilter;
      const providerMatch = !providerFilter || cardProvider === providerFilter;
      const dateMatch = !dateFilter || cardDate === dateFilter;

      if (cityMatch && providerMatch && dateMatch) {
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
  providerSelect?.addEventListener('change', applyFilters);
  dateInput?.addEventListener('change', applyFilters);

  clearBtn?.addEventListener('click', () => {
    if (citySelect) citySelect.value = '';
    if (providerSelect) providerSelect.value = '';
    if (dateInput) dateInput.value = '';
    applyFilters();
  });
});
