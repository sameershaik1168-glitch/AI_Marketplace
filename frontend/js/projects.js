(() => {
  const esc = Hub.escapeHTML;
  const statusLabel = value => ({ pending: "Pending response", accepted: "Accepted", rejected: "Declined", in_progress: "In progress", completed: "Completed", open: "Open brief" }[value] || value);
  const dateLabel = value => value ? new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Flexible timing";
  const counterpartName = (project, user) => user.role === "brand"
    ? project.creator?.name || "Creator"
    : project.brand?.company || project.brand?.name || "Brand";

  async function initBriefForm() {
    const form = document.getElementById("brief-form");
    if (!form) return;
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const user = Hub.currentUser();
      if (!user) return location.href = "login.html";
      if (user.role !== "brand") return Hub.toast("Briefs can only be published by brand accounts.", "error");
      const values = Object.fromEntries(new FormData(form));
      values.deliverables = String(values.deliverables || "").split(",").map(item => item.trim()).filter(Boolean);
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      button.textContent = "Publishing...";
      try {
        await Hub.api("briefs", { method: "POST", body: JSON.stringify(values) });
        Hub.toast("Your brief is live. Creators can now discover it.");
        location.href = "projects.html";
      } catch (error) { Hub.toast(error.message, "error"); button.disabled = false; button.innerHTML = "Publish brief <span>↗</span>"; }
    });
  }

  async function initProjectsPage() {
    const list = document.getElementById("projects-list");
    if (!list) return;
    const user = Hub.currentUser();
    const brandAction = document.querySelector(".brand-action");
    if (!user) {
      if (brandAction) brandAction.href = "login.html";
      list.innerHTML = `<div class="empty-state"><h2>Your next project starts here.</h2><p>Sign in to manage requests, briefs, and active work.</p><a class="button button-dark" href="login.html">Sign in ↗</a></div>`;
      return;
    }
    if (user.role === "creator" && brandAction) brandAction.classList.add("hidden");
    const briefsSection = document.getElementById("briefs-section");
    if (user.role === "creator") {
      briefsSection?.classList.remove("hidden");
      document.querySelector(".page-heading h1").innerHTML = "Your next good<br>collaboration.";
      document.querySelector(".page-heading>div>p:last-child").textContent = "Review brand requests and explore open briefs from teams looking for your craft.";
    }
    let selectedFilter = "all";
    let projects = [];
    const render = () => {
      const visible = projects.filter(project => selectedFilter === "all" || (selectedFilter === "pending" ? project.status === "pending" : project.status === selectedFilter));
      const pending = projects.filter(project => project.status === "pending").length;
      document.getElementById("all-count").textContent = projects.length;
      document.getElementById("pending-count").textContent = pending;
      if (!visible.length) {
        list.innerHTML = `<div class="empty-state"><h2>${projects.length ? "Nothing in this filter." : "A little room for what's next."}</h2><p>${projects.length ? "Choose another status above to see more." : user.role === "brand" ? "Browse creators or publish a brief to get started." : "When a brand reaches out, you can review the request here."}</p>${user.role === "brand" && !projects.length ? `<a class="button button-dark" href="creators.html">Meet creators ↗</a>` : ""}</div>`;
        return;
      }
      list.innerHTML = visible.map(project => {
        const actions = user.role === "creator" && project.status === "pending"
          ? `<button class="small-action" data-status="accepted" data-id="${esc(project._id)}">Accept</button><button class="small-action" data-status="rejected" data-id="${esc(project._id)}">Decline</button>`
          : user.role === "creator" && project.status === "accepted"
            ? `<button class="small-action" data-status="in_progress" data-id="${esc(project._id)}">Start work</button>`
            : user.role === "creator" && project.status === "in_progress"
              ? `<button class="small-action" data-status="completed" data-id="${esc(project._id)}">Mark complete</button>` : "";
        return `<article class="project-item"><div><h3>${esc(project.title)}</h3><p>${esc(project.brief?.category || "Creative project")} · Updated ${dateLabel(project.updatedAt)}</p></div><div class="project-person">${esc(counterpartName(project, user))}<small>${user.role === "brand" ? "CREATOR" : "BRAND"}${project.budget != null ? ` · ${Hub.money(project.budget)}` : ""}</small></div><span class="status status-${esc(project.status)}">${esc(statusLabel(project.status))}</span><div class="project-actions">${actions}</div></article>`;
      }).join("");
    };
    list.addEventListener("click", async event => {
      const button = event.target.closest("[data-status]");
      if (!button) return;
      button.disabled = true;
      try {
        await Hub.api(`projects/${encodeURIComponent(button.dataset.id)}`, { method: "PATCH", body: JSON.stringify({ status: button.dataset.status }) });
        Hub.toast(`Project updated: ${statusLabel(button.dataset.status).toLowerCase()}.`);
        await loadProjects();
      } catch (error) { Hub.toast(error.message, "error"); button.disabled = false; }
    });
    document.querySelectorAll("[data-project-filter]").forEach(tab => tab.addEventListener("click", () => {
      document.querySelector("[data-project-filter].active")?.classList.remove("active");
      tab.classList.add("active");
      selectedFilter = tab.dataset.projectFilter;
      render();
    }));
    async function loadProjects() {
      try { projects = await Hub.api("projects"); render(); }
      catch (error) { list.innerHTML = `<div class="empty-state"><h2>Workspace unavailable</h2><p>${esc(error.message)}. Check your connection and try again.</p></div>`; }
    }
    await loadProjects();
    if (user.role === "creator") loadBriefs();
  }

  async function loadBriefs() {
    const list = document.getElementById("brief-list");
    if (!list) return;
    try {
      const briefs = await Hub.api("briefs");
      list.innerHTML = briefs.length ? briefs.map(brief => `<article class="brief-card"><span class="profile-eyebrow">${esc(brief.category)} · ${esc(brief.platform || "Flexible")}</span><h3>${esc(brief.title)}</h3><p>${esc(brief.description)}</p><span class="muted">${Hub.money(brief.budget)} · Due ${dateLabel(brief.deadline)}</span></article>`).join("") : `<div class="empty-state" style="grid-column:1/-1"><h2>No open briefs yet.</h2><p>New opportunities from brands will show up here.</p></div>`;
    } catch (error) { list.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p>${esc(error.message)}</p></div>`; }
  }

  async function initDashboard() {
    const greeting = document.getElementById("welcome-name");
    if (!greeting) return;
    const user = Hub.currentUser();
    if (!user) {
      greeting.textContent = "maker.";
      document.getElementById("dashboard-intro").textContent = "Sign in to find your way back to the work.";
      document.getElementById("dashboard-projects").innerHTML = `<p class="muted">Sign in to see your projects. <a href="login.html"><strong>Log in ↗</strong></a></p>`;
      document.getElementById("quick-link").href = "login.html";
      document.getElementById("quick-link").textContent = "Sign in ↗";
      return;
    }
    greeting.textContent = `${user.name.split(" ")[0]}.`;
    document.getElementById("dashboard-date").textContent = user.role === "brand" ? "BRAND WORKSPACE" : "CREATOR WORKSPACE";
    document.getElementById("dashboard-intro").textContent = user.role === "brand" ? "Your next good campaign starts here." : "Your creative work, all in one place.";
    document.getElementById("stat-role").textContent = user.role === "brand" ? "Brand" : "Creator";
    document.getElementById("quick-title").textContent = user.role === "brand" ? "Find your next creative partner." : "Give brands a reason to find you.";
    document.getElementById("quick-copy").textContent = user.role === "brand" ? "Meet independent creators and make the next brief happen." : "Add your skills, tools, and best work to your creator profile.";
    const quickLink = document.getElementById("quick-link");
    quickLink.href = user.role === "brand" ? "creators.html" : "#creator-editor";
    quickLink.textContent = user.role === "brand" ? "Explore creators ↗" : "Edit creator profile ↓";
    try {
      const projects = await Hub.api("projects");
      const active = projects.filter(project => ["accepted", "in_progress"].includes(project.status)).length;
      const pending = projects.filter(project => project.status === "pending").length;
      document.getElementById("stat-active").textContent = active;
      document.getElementById("stat-pending").textContent = pending;
      const recent = projects.slice(0, 4);
      document.getElementById("dashboard-projects").innerHTML = recent.length ? recent.map(project => `<a class="mini-project" href="projects.html"><div><h3>${Hub.escapeHTML(project.title)}</h3><p>${Hub.escapeHTML(project.brand?.company || project.brand?.name || project.creator?.name || "Project")} · ${new Date(project.updatedAt).toLocaleDateString()}</p></div><span class="status status-${Hub.escapeHTML(project.status)}">${Hub.escapeHTML(statusLabel(project.status))}</span></a>`).join("") : `<p class="muted">No projects yet. A fresh start is a good place to be.</p>`;
    } catch (error) {
      document.getElementById("stat-active").textContent = "—";
      document.getElementById("stat-pending").textContent = "—";
      document.getElementById("dashboard-projects").innerHTML = `<p class="muted">${Hub.escapeHTML(error.message)}</p>`;
    }
    if (user.role === "creator") renderCreatorEditor();
  }

  async function renderCreatorEditor() {
    const quickActions = document.querySelector(".dashboard-columns");
    if (!quickActions || document.getElementById("creator-editor")) return;
    const editor = document.createElement("section");
    editor.id = "creator-editor";
    editor.className = "creator-editor wrap";
    editor.innerHTML = `<p class="eyebrow">YOUR PUBLIC PROFILE</p><h2>Make it easy to find your point of view.</h2><div id="creator-editor-status" class="muted">Loading your profile...</div><form id="creator-profile-form" class="form-panel hidden"><div class="form-grid"><label class="field">Display name<input name="name" required maxlength="80"></label><label class="field">Category<select name="category"><option>AI Video</option><option>AI Images</option><option>AI Copywriting</option><option>AI Animation</option><option>AI Social Media</option><option>AI Branding</option></select></label><label class="field field-full">Profile image URL<input name="avatar" type="url" placeholder="https://..."></label><label class="field">Location<input name="location" placeholder="Remote"></label><label class="field">Starting price (USD)<input name="startingPrice" type="number" min="0"></label><label class="field field-full">A little about your work<textarea name="bio" rows="3" maxlength="1200" placeholder="What do you make, and what do you care about?"></textarea></label><label class="field field-full">Skills <span class="field-hint">Separate with commas</span><input name="skills" placeholder="Art direction, motion, storytelling"></label><label class="field field-full">AI tools <span class="field-hint">Separate with commas</span><input name="tools" placeholder="Midjourney, Runway, Adobe Firefly"></label><label class="field field-full">Services <span class="field-hint">One per line, format: Service name | price | short description</span><textarea name="services" rows="3" placeholder="Campaign film | 850 | 15-30 second video"></textarea></label><label class="field field-full">Portfolio projects <span class="field-hint">One per line, format: Title | image URL | description</span><textarea name="portfolio" rows="3" placeholder="Campaign title | https://... | A short project summary"></textarea></label></div><div class="form-actions"><p>Your changes appear in the public creator directory.</p><button class="button button-dark" type="submit">Save profile ↗</button></div></form>`;
    quickActions.after(editor);
    const form = editor.querySelector("form");
    try {
      const profile = await Hub.api("creators/me");
      for (const field of ["name", "category", "avatar", "location", "startingPrice", "bio"]) form.elements[field].value = profile[field] ?? "";
      form.elements.skills.value = (profile.skills || []).join(", ");
      form.elements.tools.value = (profile.tools || []).join(", ");
      form.elements.services.value = (profile.services || []).map(item => `${item.title || ""} | ${item.price ?? ""} | ${item.description || ""}`).join("\n");
      form.elements.portfolio.value = (profile.portfolio || []).map(item => `${item.title || ""} | ${item.image || ""} | ${item.description || ""}`).join("\n");
      editor.querySelector("#creator-editor-status").classList.add("hidden");
      form.classList.remove("hidden");
    } catch (error) { editor.querySelector("#creator-editor-status").textContent = error.message; return; }
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form));
      values.startingPrice = Number(values.startingPrice || 0);
      values.skills = values.skills.split(",").map(item => item.trim()).filter(Boolean);
      values.tools = values.tools.split(",").map(item => item.trim()).filter(Boolean);
      values.services = values.services.split("\n").map(line => line.split("|").map(part => part.trim())).filter(parts => parts[0]).map(([title, price, description]) => ({ title, price: Number(price || 0), description: description || "" }));
      values.portfolio = values.portfolio.split("\n").map(line => line.split("|").map(part => part.trim())).filter(parts => parts[0]).map(([title, image, description]) => ({ title, image: image || "", description: description || "" }));
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      try {
        await Hub.api("creators/me", { method: "PUT", body: JSON.stringify(values) });
        Hub.toast("Creator profile saved.");
      } catch (error) { Hub.toast(error.message, "error"); }
      button.disabled = false;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBriefForm();
    initProjectsPage();
    initDashboard();
  });
})();
