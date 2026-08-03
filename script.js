document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".section-nav a");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const scrollButton = document.querySelector(".scroll-to-top");
  const currentYear = document.querySelector("#current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -35px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

  } else {
    revealItems.forEach((item) => item.classList.add("in-view"));
  }

  const syncActiveSection = () => {
    if (!sections.length) return;

    const marker = window.scrollY + Math.min(260, window.innerHeight * 0.35);
    let currentSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= marker) currentSection = section;
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentSection.id}`;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const updateScrollButton = () => {
    if (!scrollButton) return;
    scrollButton.classList.toggle("visible", window.scrollY > 550);
  };

  window.addEventListener("scroll", () => {
    updateScrollButton();
    syncActiveSection();
  }, { passive: true });
  updateScrollButton();
  syncActiveSection();

  scrollButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
