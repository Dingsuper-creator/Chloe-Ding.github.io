document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js-ready");
  const currentYear = document.querySelector("#current-year");
  const scrollButton = document.querySelector(".scroll-to-top");
  const behaviorControls = document.querySelectorAll("[data-behavior]");
  const behaviorPanels = document.querySelectorAll("[data-panel]");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const showBehavior = (name) => {
    behaviorControls.forEach((control) => {
      const active = control.dataset.behavior === name;
      control.classList.toggle("is-active", active);
      control.setAttribute("aria-pressed", String(active));
    });
    behaviorPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.panel === name);
    });
  };

  showBehavior("conversation");
  behaviorControls.forEach((control) => {
    control.addEventListener("click", () => showBehavior(control.dataset.behavior));
  });

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    document.documentElement.classList.add("motion-ready");
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  if (!scrollButton) return;

  const updateScrollButton = () => {
    scrollButton.classList.toggle("visible", window.scrollY > 550);
  };

  window.addEventListener("scroll", updateScrollButton, { passive: true });
  updateScrollButton();

  scrollButton.addEventListener("click", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
});
