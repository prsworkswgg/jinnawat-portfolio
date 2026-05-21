const projects = [
  {
    title: "Smart Manufacturing Data Workflow",
    metrics: ["Sensor Data", "Preprocess", "Anomaly Logic", "PM Concept"],
    workflow: ["Collect", "Clean", "Store", "Analyze", "Report"],
  },
  {
    title: "Excel VBA Inventory System",
    metrics: ["Input Forms", "Validation", "Stock Logic", "Reports"],
    workflow: ["Receive", "Issue", "Validate", "Calculate", "Monitor"],
  },
  {
    title: "Lathe Preventive Maintenance",
    metrics: ["MTBF", "MTTR", "ABC", "PDCA"],
    workflow: ["Failure Data", "Analyze", "Prioritize", "Schedule", "Improve"],
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
