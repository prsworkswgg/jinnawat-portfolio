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
