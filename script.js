const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
const sections = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll("[data-tilt]");
const yearEl = document.getElementById("year");

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
  navToggle.classList.toggle("active");
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.tagName === "A" && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

const handleTilt = (event, element) => {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  const rotateX = (y / rect.height) * -10;
  const rotateY = (x / rect.width) * 10;
  element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
};

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => handleTilt(event, card));
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

