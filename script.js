const portfolioProjects = [
  {
    title: "Project One",
    description: "A short description of project one.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#"
  },
  {
    title: "Project Two",
    description: "A short description of project two.",
    tags: ["React", "API", "UX"],
    link: "#"
  },
  {
    title: "Project Three",
    description: "A short description of project three.",
    tags: ["Node.js", "Express", "MongoDB"],
    link: "#"
  }
];

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";
  card.style.padding = "1rem";
  card.style.borderRadius = "12px";
  card.style.background = "#fff";
  card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
  card.style.cursor = "pointer";

  const title = document.createElement("h3");
  title.textContent = project.title;
  card.appendChild(title);

  const description = document.createElement("p");
  description.textContent = project.description;
  card.appendChild(description);

  const tagContainer = document.createElement("div");
  tagContainer.className = "project-tags";
  tagContainer.style.display = "flex";
  tagContainer.style.gap = "0.5rem";
  tagContainer.style.flexWrap = "wrap";
  tagContainer.style.margin = "0.75rem 0";

  project.tags.forEach(tagText => {
    const tag = document.createElement("span");
    tag.textContent = tagText;
    tag.style.padding = "0.25rem 0.6rem";
    tag.style.borderRadius = "999px";
    tag.style.background = "#f0f0f0";
    tag.style.fontSize = "0.85rem";
    tagContainer.appendChild(tag);
  });

  card.appendChild(tagContainer);

  const link = document.createElement("a");
  link.href = project.link;
  link.textContent = "View project";
  link.style.color = "#0d6efd";
  link.style.textDecoration = "none";
  card.appendChild(link);

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
    card.style.boxShadow = "0 18px 30px rgba(0,0,0,0.14)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "none";
    card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
  });

  return card;
}

function renderPortfolioCards() {
  const container = document.getElementById("projects-container");
  if (!container) {
    console.warn("No element with id 'projects-container' found.");
    return;
  }

  container.style.display = "grid";
  container.style.gap = "1.5rem";
  container.style.gridTemplateColumns = "repeat(auto-fit, minmax(240px, 1fr))";

  portfolioProjects.forEach(project => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderPortfolioCards);
