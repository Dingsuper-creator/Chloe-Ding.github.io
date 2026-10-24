document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.querySelector("#current-year");
  const scrollButton = document.querySelector(".scroll-to-top");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
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
