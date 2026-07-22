const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const counters = document.querySelectorAll("[data-count]");
const donationForm = document.querySelector("[data-donation-form]");
const impactResult = document.querySelector("[data-impact-result]");
const mediaTrack = document.querySelector("[data-media-track]");
const mediaSlides = mediaTrack ? Array.from(mediaTrack.querySelectorAll(".media-slide")) : [];
const mediaDots = Array.from(document.querySelectorAll("[data-media-dots] button"));
const mediaPrev = document.querySelector("[data-media-prev]");
const mediaNext = document.querySelector("[data-media-next]");

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

if (mediaTrack && mediaSlides.length) {
  let activeMediaIndex = 0;
  let mediaTimer;

  const showMediaSlide = (index) => {
    activeMediaIndex = (index + mediaSlides.length) % mediaSlides.length;
    mediaTrack.style.transform = `translateX(-${activeMediaIndex * 100}%)`;
    mediaSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeMediaIndex);
    });
    mediaDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeMediaIndex);
    });
  };

  const restartMediaTimer = () => {
    window.clearInterval(mediaTimer);
    mediaTimer = window.setInterval(() => showMediaSlide(activeMediaIndex + 1), 4200);
  };

  mediaPrev?.addEventListener("click", () => {
    showMediaSlide(activeMediaIndex - 1);
    restartMediaTimer();
  });

  mediaNext?.addEventListener("click", () => {
    showMediaSlide(activeMediaIndex + 1);
    restartMediaTimer();
  });

  mediaDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showMediaSlide(index);
      restartMediaTimer();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!document.body.contains(mediaTrack)) return;
    if (event.key === "ArrowLeft") {
      showMediaSlide(activeMediaIndex - 1);
      restartMediaTimer();
    }
    if (event.key === "ArrowRight") {
      showMediaSlide(activeMediaIndex + 1);
      restartMediaTimer();
    }
  });

  showMediaSlide(0);
  restartMediaTimer();
}
