const nav = document.querySelector("[data-site-nav]");
const mobileToggle = document.querySelector("[data-mobile-toggle]");
const timeElement = document.querySelector("[data-time]");
const scrollTargets = document.querySelectorAll("[data-scroll-target]");

function setScrolledState() {
  nav?.classList.toggle("is-scrolled", window.scrollY > 48);
}

function closeMobileMenu() {
  document.body.classList.remove("mobile-open");
  nav?.classList.remove("is-open");
  mobileToggle?.setAttribute("aria-expanded", "false");
}

function updateTime() {
  if (!timeElement) return;
  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Bangkok",
  });
  timeElement.textContent = `${formatter.format(new Date())} ICT`;
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMobileMenu();
}

mobileToggle?.addEventListener("click", () => {
  const isOpen = !nav?.classList.contains("is-open");
  document.body.classList.toggle("mobile-open", isOpen);
  nav?.classList.toggle("is-open", isOpen);
  mobileToggle.setAttribute("aria-expanded", String(isOpen));
});

scrollTargets.forEach((control) => {
  control.addEventListener("click", (event) => {
    const selector = control.getAttribute("data-scroll-target");
    if (!selector) return;
    event.preventDefault();
    scrollToTarget(selector);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

window.addEventListener("scroll", setScrolledState, { passive: true });
setScrolledState();
updateTime();
setInterval(updateTime, 1000);
