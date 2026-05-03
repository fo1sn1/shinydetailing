const menuToggle = document.querySelector('[data-menu-toggle]');
const siteNav = document.querySelector('[data-site-nav]');
const yearElement = document.querySelector('[data-year]');
const revealItems = document.querySelectorAll('[data-reveal]');
const comparisonCards = document.querySelectorAll('[data-comparison]');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  };

  const openMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'true');
    siteNav.classList.add('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && window.innerWidth <= 780) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    } else if (menuToggle.getAttribute('aria-expanded') !== 'true') {
      siteNav.classList.remove('is-open');
    }
  });
}

if ('IntersectionObserver' in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

comparisonCards.forEach((card) => {
  const range = card.querySelector('.comparison__range');
  const beforeImage = card.querySelector('[data-before]');
  const handle = card.querySelector('.comparison__handle');

  if (!range || !beforeImage || !handle) {
    return;
  }

  const updateComparison = () => {
    const value = Number(range.value);
    const clipped = 100 - value;
    beforeImage.style.clipPath = `inset(0 ${clipped}% 0 0)`;
    handle.style.left = `${value}%`;
  };

  range.addEventListener('input', updateComparison);
  updateComparison();
});
