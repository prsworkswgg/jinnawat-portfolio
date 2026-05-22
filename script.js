const projects = [
  {
    title: "A/C + Leak Detection",
    metrics: ["ESP32 / IoT", "Sensor Data", "Firebase Log", "LINE Alert"],
    workflow: ["Sense", "Transmit", "Log", "Detect", "Alert"],
    image: "assets/aqua-guard-command-center.png",
    imageAlt: "Aqua Guard A/C water leak detection command center dashboard",
    caption: "Real dashboard evidence - A/C water leak command center",
  },
  {
    title: "Smart Manufacturing Data Workflow",
    metrics: ["Data Input", "Preprocess", "Dashboard", "AI Report"],
    workflow: ["Collect", "Clean", "Store", "Analyze", "Report"],
    image: "assets/aqua-guard-command-center.png",
    imageAlt: "Manufacturing monitoring dashboard used as smart factory interface evidence",
    caption: "Real monitoring interface - sensor data, alerts, and floor risk overview",
  },
  {
    title: "ELYSIOAI Platform",
    metrics: ["Next.js", "Firebase", "Stripe", "Quality Gates"],
    workflow: ["Generate", "Bill", "Check", "Ship", "Document"],
    image: "assets/elysio-home-real.png",
    imageAlt: "ELYSIOAI homepage screenshot showing AI platform interface",
    caption: "Real AI platform evidence - ELYSIOAI production website",
  },
];

const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const tabs = Array.from(document.querySelectorAll("[data-project-tab]"));
const currentProject = document.querySelector("[data-current-project]");
const projectTitle = document.querySelector("[data-project-title]");
const metricGrid = document.querySelector("[data-metric-grid]");
const workflowRail = document.querySelector("[data-workflow-rail]");
const projectImage = document.querySelector("[data-project-image]");
const projectCaption = document.querySelector("[data-project-caption]");
const prevButton = document.querySelector("[data-project-prev]");
const nextButton = document.querySelector("[data-project-next]");
let activeProject = 0;

function closeNav() {
  body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation");
}

function setActiveProject(index) {
  activeProject = (index + projects.length) % projects.length;
  const project = projects[activeProject];

  if (projectTitle) {
    projectTitle.textContent = project.title;
  }

  if (currentProject) {
    currentProject.textContent = String(activeProject + 1).padStart(2, "0");
  }

  if (metricGrid) {
    metricGrid.innerHTML = project.metrics.map((metric) => `<span>${metric}</span>`).join("");
  }

  if (workflowRail) {
    workflowRail.innerHTML = project.workflow.map((step) => `<span>${step}</span>`).join("");
  }

  if (projectImage) {
    projectImage.src = project.image;
    projectImage.alt = project.imageAlt;
  }

  if (projectCaption) {
    projectCaption.textContent = project.caption;
  }

  tabs.forEach((tab, tabIndex) => {
    const active = tabIndex === activeProject;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.setAttribute("tabindex", active ? "0" : "-1");
  });
}

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeNav();
  }
});

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setActiveProject(index));
  tab.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveProject(activeProject + 1);
      tabs[(activeProject + projects.length) % projects.length]?.focus();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveProject(activeProject - 1);
      tabs[(activeProject + projects.length) % projects.length]?.focus();
    }
  });
});

prevButton?.addEventListener("click", () => setActiveProject(activeProject - 1));
nextButton?.addEventListener("click", () => setActiveProject(activeProject + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});

setActiveProject(0);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  document.documentElement.classList.add("motion-enabled");

  const revealTargets = document.querySelectorAll(
    ".channels-section, .summary-band, .role-fit-section, .competency-section, .work-section, .skills-section, .education-section, .contact-section, .channel-card, .project-card, .role-fit-grid article, .competency-grid article, .skill-stack article, .education-grid article"
  );

  revealTargets.forEach((target) => target.classList.add("reveal-on-scroll"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );

  revealTargets.forEach((target) => observer.observe(target));

  const depthTargets = Array.from(document.querySelectorAll("[data-depth]"));
  let ticking = false;

  function updateDepth() {
    const viewportHeight = window.innerHeight || 1;

    depthTargets.forEach((target) => {
      const depth = Number(target.dataset.depth || 0);
      const rect = target.getBoundingClientRect();
      const distance = (rect.top + rect.height / 2 - viewportHeight / 2) * depth;
      target.style.setProperty("--depth-y", `${Math.max(-18, Math.min(18, -distance))}px`);
    });

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateDepth);
        ticking = true;
      }
    },
    { passive: true }
  );

  const heroVisual = document.querySelector(".hero-visual");
  const realShot = document.querySelector(".real-shot-frame");

  heroVisual?.addEventListener("pointermove", (event) => {
    if (!realShot) return;
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    realShot.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
    realShot.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
  });

  heroVisual?.addEventListener("pointerleave", () => {
    realShot?.style.setProperty("--tilt-x", "0deg");
    realShot?.style.setProperty("--tilt-y", "0deg");
  });

  updateDepth();
}
