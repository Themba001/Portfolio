// Mobile menu toggle with explicit open/close icons and consistent default state
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('nav-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');

    if (!btn || !menu || !iconOpen || !iconClose) return;

    const mobileClasses = ['flex', 'flex-col', 'space-y-2', 'mt-3', 'bg-black/90', 'p-4', 'rounded-md'];

    function setMenuOpen(open) {
      if (open) {
        menu.classList.remove('hidden');
        mobileClasses.forEach(c => menu.classList.add(c));
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        // close for mobile
        menu.classList.add('hidden');
        mobileClasses.forEach(c => menu.classList.remove(c));
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      }
    }

    // Initialize default state: on mobile, hide menu and show open icon; on desktop show menu and hide icons
    function initialize() {
      if (window.innerWidth < 768) {
        setMenuOpen(false);
        // ensure the desktop-only class isn't hiding the menu accidentally
        if (!menu.classList.contains('md:flex')) menu.classList.add('md:flex');
      } else {
        // desktop: ensure menu visible and icons hidden
        menu.classList.remove('hidden');
        mobileClasses.forEach(c => menu.classList.remove(c));
        iconOpen.classList.add('hidden');
        iconClose.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      }
    }

    // Toggle button action
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = !menu.classList.contains('hidden') && window.innerWidth < 768;
      setMenuOpen(!isOpen);
    });

    // Close menu when link clicked (on mobile)
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          setMenuOpen(false);
        }
      });
    });

    // Resize behavior: switch between mobile/desktop states
    window.addEventListener('resize', function () {
      initialize();
    });

    // click outside to close mobile menu
    document.addEventListener('click', function (e) {
      if (window.innerWidth >= 768) return;
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    initialize();
  });
})();
