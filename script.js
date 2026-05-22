/* ═══════════════════════════════════════════════════════════════════════════
   OVERKILL LINUX — SCRIPT
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Mobile nav toggle ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── Docs sidebar toggle (mobile) ── */
  const docsToggle = document.getElementById('docsMenuToggle');
  const docsSidebar = document.getElementById('docsSidebar');
  if (docsToggle && docsSidebar) {
    docsToggle.addEventListener('click', () => {
      docsSidebar.classList.toggle('open');
    });
  }

  /* ── Docs sidebar active link tracking ── */
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  if (sidebarLinks.length > 0) {
    const sections = [];
    sidebarLinks.forEach(link => {
      const id = link.getAttribute('href');
      if (id && id.startsWith('#')) {
        const el = document.querySelector(id);
        if (el) sections.push({ link, el });
      }
    });

    if (sections.length > 0) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            const match = sections.find(s => s.el === entry.target);
            if (match) match.link.classList.add('active');
          }
        });
      }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

      sections.forEach(s => observer.observe(s.el));
    }

    /* Close sidebar on link click (mobile) */
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (docsSidebar) docsSidebar.classList.remove('open');
      });
    });
  }

  /* ── Scroll reveal animation ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    reveals.forEach(el => revealObserver.observe(el));
  }

});
