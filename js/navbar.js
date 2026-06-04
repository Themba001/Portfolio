// Toggle mobile menu
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('nav-menu');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      menu.classList.remove('hidden');
      menu.classList.add('flex', 'flex-col', 'space-y-2', 'mt-3', 'bg-black/90', 'p-4', 'rounded-md', 'md:flex'); // mobile styling
      btn.setAttribute('aria-expanded', 'true');
    } else {
      // restore to hidden state on small screens; keep md:flex for larger screens
      menu.classList.add('hidden');
      menu.classList.remove('flex', 'flex-col', 'space-y-2', 'mt-3', 'bg-black/90', 'p-4', 'rounded-md');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close mobile menu when a link is clicked (optional, good UX)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (!menu.classList.contains('hidden') && window.innerWidth < 768) {
        menu.classList.add('hidden');
        menu.classList.remove('flex', 'flex-col', 'space-y-2', 'mt-3', 'bg-black/90', 'p-4', 'rounded-md');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Optional: handle window resize to ensure state stays consistent
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      // Ensure menu is visible on md+ screens
      menu.classList.remove('hidden');
      menu.classList.add('md:flex');
    } else {
      // Hide on small screens by default
      if (!menu.classList.contains('hidden') && !menu.classList.contains('flex')) {
        menu.classList.add('hidden');
      } else if (!menu.classList.contains('hidden') && menu.classList.contains('flex') && menu.classList.contains('md:flex')) {
        // if it's visible because of md rules, hide for mobile
        menu.classList.add('hidden');
      }
    }
  });
});
