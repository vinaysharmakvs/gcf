const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const counters = document.querySelectorAll("[data-count]");
const donationForm = document.querySelector("[data-donation-form]");
const impactResult = document.querySelector("[data-impact-result]");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    mobileMenu.hidden = true;
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 42));
  const tick = () => {
    current = Math.min(target, current + step);
    counter.textContent = current.toLocaleString("en-IN");
    if (current < target) window.requestAnimationFrame(tick);
  };
  tick();
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.animated) return;
      entry.target.dataset.animated = "true";
      animateCounter(entry.target);
    });
  }, { threshold: 0.35 });
  counters.forEach((counter) => observer.observe(counter));
} else {
  counters.forEach(animateCounter);
}

const causeCopy = {
  education: "can support learning material, basic computer training resources and student guidance.",
  medical: "can help with emergency travel, medicine support, documentation or urgent family coordination.",
  ration: "can contribute to essential ration support for families facing difficult situations.",
  kanyadaan: "can support dignity-focused family assistance under Mission Kanyadaan."
};

donationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(donationForm);
  const amount = Math.max(100, Number(data.get("amount") || 0));
  const cause = data.get("cause");
  const formatted = amount.toLocaleString("en-IN");
  const multiplier = Math.max(1, Math.round(amount / 1100));
  const text = `Rs. ${formatted} ${causeCopy[cause]} Estimated reach: ${multiplier} focused support unit${multiplier > 1 ? "s" : ""}.`;
  if (impactResult) {
    impactResult.innerHTML = `
      <span>Estimated impact</span>
      <strong>${text}</strong>
      <p>This is an estimate for donor understanding. Actual use depends on verified field requirements.</p>
    `;
  }
});
