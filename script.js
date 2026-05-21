const projects = [
  {
    title: "Ops Dashboard",
    label: "Real-time analytics dashboard for operations team.",
    kind: "dark",
    metrics: ["$1.24M", "8,347", "12,938"],
  },
  {
    title: "Workflow Builder",
    label: "Visual automation builder to orchestrate business processes.",
    kind: "workflow",
    metrics: ["12 nodes", "4 rules", "98%"],
  },
  {
    title: "Finance Tracker",
    label: "Finance tracker with insights and budgeting.",
    kind: "finance",
    metrics: ["B125k", "B85k", "B42k"],
  },
];

const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const tabs = Array.from(document.querySelectorAll("[data-project-tab]"));
const currentProject = document.querySelector("[data-current-project]");
const preview = document.querySelector("[data-project-preview]");
const prevButton = document.querySelector("[data-project-prev]");
const nextButton = document.querySelector("[data-project-next]");
let activeProject = 0;

function closeNav() {
  body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation");
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

function previewTemplate(project) {
  if (project.kind === "workflow") {
    return `
      <div class="mock-app workflow-preview" aria-label="${project.title} preview">
        <div class="workflow-canvas">
          <div class="workflow-card a"><b>Trigger</b><span>New submission</span></div>
          <div class="workflow-card b"><b>Condition</b><span>Amount > 10,000</span></div>
          <div class="workflow-card c"><b>Approval</b><span>Manager review</span></div>
          <div class="workflow-card d"><b>Action</b><span>Send notification</span></div>
          <div class="workflow-card e"><b>End</b><span>Complete</span></div>
        </div>
      </div>
    `;
  }

  if (project.kind === "finance") {
    return `
      <div class="mock-app mock-app-dark finance-preview" aria-label="${project.title} preview">
        <div class="mock-sidebar">
          <span class="mini-logo">J</span><i></i><i></i><i></i><i></i>
        </div>
        <div class="mock-main">
          <div class="metric-row">
            <div><b>${project.metrics[0]}</b><small>Total balance</small></div>
            <div><b>${project.metrics[1]}</b><small>Income</small></div>
            <div><b>${project.metrics[2]}</b><small>Expenses</small></div>
          </div>
          <div class="finance-preview-layout">
            <span></span>
            <div><i></i><i></i><i></i><i></i><i></i></div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="mock-app mock-app-dark" aria-label="${project.title} preview">
      <div class="mock-sidebar">
        <span class="mini-logo">J</span><i></i><i></i><i></i><i></i>
      </div>
      <div class="mock-main">
        <div class="mock-toolbar"><span></span><span></span><span></span></div>
        <div class="metric-row">
          <div><b>${project.metrics[0]}</b><small>Revenue</small></div>
          <div><b>${project.metrics[1]}</b><small>Orders</small></div>
          <div><b>${project.metrics[2]}</b><small>Active users</small></div>
        </div>
        <div class="chart-line" aria-hidden="true">
          <svg viewBox="0 0 520 160" preserveAspectRatio="none">
            <path d="M0 112 C35 88 55 122 86 86 S140 72 178 102 232 131 270 77 326 51 366 83 420 118 456 73 490 38 520 58" />
            <path class="chart-fill" d="M0 112 C35 88 55 122 86 86 S140 72 178 102 232 131 270 77 326 51 366 83 420 118 456 73 490 38 520 58 V160 H0 Z" />
          </svg>
        </div>
      </div>
    </div>
  `;
}

function setActiveProject(index) {
  activeProject = (index + projects.length) % projects.length;
  const number = String(activeProject + 1).padStart(2, "0");
  currentProject.textContent = number;

  tabs.forEach((tab, tabIndex) => {
    const active = tabIndex === activeProject;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  preview.innerHTML = previewTemplate(projects[activeProject]);
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setActiveProject(index));
});

prevButton?.addEventListener("click", () => setActiveProject(activeProject - 1));
nextButton?.addEventListener("click", () => setActiveProject(activeProject + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});
