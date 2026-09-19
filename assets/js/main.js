(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) root.setAttribute('data-theme', 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        toggle.setAttribute('aria-label', next === 'dark' ? '切换到浅色模式' : '切换到深色模式');
      });
    }

    const menuToggle = document.querySelector('[data-menu-toggle]');
    const links = document.querySelector('.nav-links');
    if (menuToggle && links) {
      menuToggle.addEventListener('click', () => links.classList.toggle('open'));
    }

    const buttons = document.querySelectorAll('[data-filter]');
    const papers = document.querySelectorAll('[data-pub-tags]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        buttons.forEach((b) => b.classList.toggle('active', b === button));
        papers.forEach((paper) => {
          const tags = (paper.dataset.pubTags || '').split(/\s+/);
          paper.hidden = !(filter === 'all' || tags.includes(filter));
        });
      });
    });

    const year = document.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
