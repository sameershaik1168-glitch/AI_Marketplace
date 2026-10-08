const demoCreators = [
  { _id: "demo-nami", name: "Studio Nami", category: "AI Video", location: "New York, US", bio: "We build cinematic campaign worlds for brands with a point of view. From first frame to final cut, we blend human storytelling and new creative tools to make work that stays with you.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85", skills: ["Art direction", "Video", "Storytelling"], tools: ["Runway", "Midjourney", "Adobe Firefly"], rating: 4.9, projectCount: 28, startingPrice: 650, services: [{ title: "Social campaign film", description: "A 15-30 second campaign film, two aspect ratios, and cover frame.", price: 850 }, { title: "Creative direction", description: "A visual concept and treatment for your next launch.", price: 500 }], portfolio: [{ title: "A softer kind of energy", description: "Campaign film for a modern wellness brand", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80" }, { title: "Objects in motion", description: "Product study, generative video", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80" }], reviews: [{ author: "Maya, Northstar", rating: 5, comment: "They found the exact balance between unexpected and unmistakably us." }] },
  { _id: "demo-alex", name: "Alex Morgan", category: "AI Images", location: "London, UK", bio: "A visual artist creating distinct worlds for thoughtful consumer brands. Equal parts color, composition, and a healthy obsession with the details.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85", skills: ["Product imagery", "Visual systems", "Campaigns"], tools: ["Midjourney", "Adobe Firefly", "Photoshop"], rating: 5, projectCount: 19, startingPrice: 420, services: [{ title: "Product image set", description: "Five campaign-ready images with a cohesive visual direction.", price: 420 }, { title: "Art direction", description: "Moodboards, styling direction, and prompt exploration.", price: 300 }], portfolio: [{ title: "Color is a feeling", description: "Product campaign, 2025", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80" }, { title: "Small rituals", description: "Editorial stills for Goodform", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80" }], reviews: [{ author: "Leon, Goodform", rating: 5, comment: "Thoughtful, fast, and genuinely collaborative from day one." }] },
  { _id: "demo-forma", name: "Forma Futures", category: "AI Branding", location: "Berlin, DE", bio: "We help early-stage teams find the visual language that makes their big idea feel real. Naming, identity, and the building blocks for a world people want to step into.", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85", skills: ["Brand identity", "Creative strategy", "Typography"], tools: ["Adobe Firefly", "Midjourney", "Figma"], rating: 4.8, projectCount: 34, startingPrice: 1100, services: [{ title: "Identity starter", description: "Visual direction, logo suite, and a concise brand guide.", price: 1100 }, { title: "Brand world", description: "An immersive campaign concept with image direction.", price: 1600 }], portfolio: [{ title: "Tomorrow, naturally", description: "Identity system for Morrow", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80" }, { title: "A new kind of everyday", description: "Visual world and digital launch", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80" }], reviews: [{ author: "Sam, Morrow", rating: 5, comment: "They gave our product a world of its own. We couldn't be happier." }] },
  { _id: "demo-jules", name: "Jules Park", category: "AI Copywriting", location: "Toronto, CA", bio: "Clear words, a good rhythm, and messaging your audience actually wants to read. I build campaign concepts and copy for teams who want to sound like themselves.", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85", skills: ["Campaign copy", "Brand voice", "Social"], tools: ["ChatGPT", "Claude", "Notion"], rating: 4.9, projectCount: 42, startingPrice: 280, services: [{ title: "Launch copy kit", description: "Landing page, email intro, and social launch copy.", price: 480 }, { title: "Voice guide", description: "A usable brand voice system with examples.", price: 280 }], portfolio: [{ title: "Words with room to breathe", description: "A brand voice refresh for softgoods", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80" }, { title: "The good kind of daily", description: "A social-first launch", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80" }], reviews: [{ author: "Priya, Softgoods", rating: 5, comment: "Jules made our story sound like us on our very best day." }] },
  { _id: "demo-lee", name: "Lee & Light", category: "AI Animation", location: "Melbourne, AU", bio: "Motion-led storytelling for brands that have something to say. I make small visual moments with a big sense of character.", avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=900&q=85", skills: ["Motion design", "3D", "Storyboards"], tools: ["Runway", "After Effects", "Blender"], rating: 4.7, projectCount: 16, startingPrice: 750, services: [{ title: "Animated social loop", description: "A short, seamless motion asset for social placements.", price: 750 }], portfolio: [{ title: "A little more alive", description: "Motion identity explorations", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80" }], reviews: [] },
  { _id: "demo-ana", name: "Ana Campos", category: "AI Social Media", location: "Lisbon, PT", bio: "Social-first concepts and content systems that make showing up feel a little less like work. Curious by nature, collaborative by default.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85", skills: ["Social strategy", "Content systems", "Reels"], tools: ["ChatGPT", "Midjourney", "CapCut"], rating: 4.9, projectCount: 23, startingPrice: 350, services: [{ title: "Social launch kit", description: "A week of platform-ready content and direction.", price: 350 }], portfolio: [{ title: "Make space for slow", description: "Social launch for a mindful living brand", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80" }], reviews: [] }
];

const demoPortfolioArt = {
  "demo-nami": ["assets/campaign-film.svg", "assets/motion-study.svg"],
  "demo-alex": ["assets/product-still.svg", "assets/brand-world.svg"],
  "demo-forma": ["assets/brand-world.svg", "assets/motion-study.svg"],
  "demo-jules": ["assets/campaign-film.svg", "assets/product-still.svg"],
  "demo-lee": ["assets/motion-study.svg"],
  "demo-ana": ["assets/product-still.svg", "assets/campaign-film.svg"]
};
demoCreators.forEach(creator => {
  creator.avatar = `assets/creator-${creator._id.slice(5)}.svg`;
  creator.portfolio.forEach((project, index) => { project.image = demoPortfolioArt[creator._id][index]; });
});

(() => {
  const esc = Hub.escapeHTML;
  const displayName = creator => creator.name || creator.user?.name || "Creator";
  const imageFallback = "assets/creator-nami.svg";
  const tags = items => (items || []).slice(0, 3).map(item => `<span class="chip">${esc(item)}</span>`).join("");
  const card = creator => `<article class="creator-card"><a class="creator-card-image" href="creator-profile.html?id=${encodeURIComponent(creator._id)}"><img src="${esc(creator.avatar || imageFallback)}" alt="Portrait of ${esc(displayName(creator))}" loading="lazy"><span class="creator-category">${esc(creator.category || "AI Creator")}</span></a><div class="creator-card-body"><div class="creator-card-title"><h3>${esc(displayName(creator))}</h3><span class="rating"><span>★</span> ${Number(creator.rating || 5).toFixed(1)}</span></div><p class="creator-card-location">${esc(creator.location || "Independent creator")} · ${Number(creator.projectCount || 0)} projects</p><div class="chip-list">${tags(creator.skills)}</div><div class="creator-card-meta"><div><small>STARTING AT</small><strong>${Hub.money(creator.startingPrice)}</strong></div><a class="button button-dark" href="creator-profile.html?id=${encodeURIComponent(creator._id)}">View profile <span>↗</span></a></div></div></article>`;

  async function initDirectory() {
    const grid = document.getElementById("creator-grid");
    if (!grid) return;
    let creators = [];
    try { creators = await Hub.api("creators"); } catch { /* Discovery can still show example profiles while the API is being configured. */ }
    if (!Array.isArray(creators) || !creators.length) creators = demoCreators;
    const search = document.getElementById("creator-search");
    const category = document.getElementById("category-filter");
    const tool = document.getElementById("tool-filter");
    const price = document.getElementById("price-filter");
    const rating = document.getElementById("rating-filter");
    const count = document.getElementById("creator-count");
    const update = async () => {
      const params = new URLSearchParams();
      if (search.value.trim()) params.set("search", search.value.trim());
      if (category.value) params.set("category", category.value);
      if (tool.value) params.set("tool", tool.value);
      if (price.value) params.set("maxPrice", price.value);
      if (rating.value) params.set("minRating", rating.value);
      let results = creators;
      if (creators !== demoCreators) {
        try { results = await Hub.api(`creators?${params}`); } catch { results = creators; }
      }
      const term = search.value.trim().toLowerCase();
      results = results.filter(item => (!term || `${displayName(item)} ${item.bio || ""} ${(item.skills || []).join(" ")} ${(item.tools || []).join(" ")}`.toLowerCase().includes(term))
        && (!category.value || item.category === category.value)
        && (!tool.value || (item.tools || []).includes(tool.value))
        && (!price.value || Number(item.startingPrice || 0) <= Number(price.value))
        && (!rating.value || Number(item.rating || 0) >= Number(rating.value)));
      count.textContent = `${results.length} ${results.length === 1 ? "creator" : "creators"}`;
      grid.innerHTML = results.length ? results.map(card).join("") : `<div class="empty-state" style="grid-column:1/-1"><h2>No matches just yet.</h2><p>Try another search or clear a filter.</p></div>`;
    };
    [search, category, tool, price, rating].forEach(field => field.addEventListener(field === search ? "input" : "change", update));
    document.getElementById("clear-filters")?.addEventListener("click", () => { search.value = ""; category.value = ""; tool.value = ""; price.value = ""; rating.value = ""; update(); });
    update();
  }

  async function initProfile() {
    const root = document.getElementById("creator-profile-root");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    let creator;
    if (id) {
      try { creator = await Hub.api(`creators/${encodeURIComponent(id)}`); } catch { creator = demoCreators.find(item => item._id === id); }
    } else creator = demoCreators[0];
    if (!creator) {
      root.innerHTML = `<div class="empty-state"><h2>Creator not found.</h2><p>Head back to the directory and find another creative partner.</p><a class="button button-dark" href="creators.html">Browse creators ↗</a></div>`;
      return;
    }
    const realCreator = !String(creator._id).startsWith("demo-");
    const name = displayName(creator);
    const services = creator.services?.length ? creator.services.map(service => `<div class="service-row"><span><strong>${esc(service.title || "Creative service")}</strong><br>${esc(service.description || "")}</span><strong>${Hub.money(service.price)}</strong></div>`).join("") : `<p class="muted">Ask about a custom project.</p>`;
    const portfolio = creator.portfolio?.length ? creator.portfolio.map(item => `<article class="portfolio-item"><img src="${esc(item.image || imageFallback)}" alt="${esc(item.title || "Portfolio project")}" loading="lazy"><h3>${esc(item.title || "Selected work")}</h3><p>${esc(item.description || "")}</p></article>`).join("") : `<p class="muted">Portfolio projects coming soon.</p>`;
    const reviews = creator.reviews?.length ? creator.reviews.map(review => `<div class="service-row"><span><strong>${esc(review.author || "Client")} · ${"★".repeat(Math.max(1, Math.min(5, Number(review.rating || 5))) )}</strong><br>${esc(review.comment || "")}</span></div>`).join("") : `<p class="muted">Reviews will appear here as projects are completed.</p>`;
    root.innerHTML = `<div class="profile-hero"><img class="profile-avatar" src="${esc(creator.avatar || imageFallback)}" alt="Portrait of ${esc(name)}"><div class="profile-main"><span class="profile-eyebrow">${esc(creator.category || "AI Creator")} · ${esc(creator.location || "REMOTE")}</span><h1>${esc(name)}</h1><span class="rating"><span>★</span> ${Number(creator.rating || 5).toFixed(1)} <span class="muted">· ${Number(creator.projectCount || 0)} completed projects</span></span><p class="profile-bio">${esc(creator.bio || "Independent AI creator bringing thoughtful ideas to life.")}</p><div class="profile-actions"><button class="button button-dark" id="show-collab" ${realCreator ? "" : "disabled title=Example profiles cannot receive project requests"}>Request collaboration <span>↗</span></button><a href="creators.html" class="inline-link">Back to creators <span>→</span></a></div><div class="profile-metrics"><div><strong>${Hub.money(creator.startingPrice)}</strong><span>Starting price</span></div><div><strong>${Number(creator.projectCount || 0)}</strong><span>Projects</span></div><div><strong>${Number(creator.rating || 5).toFixed(1)} / 5</strong><span>Client rating</span></div></div></div></div><div id="collab-panel" class="form-panel hidden" style="margin-top:20px"><form id="collab-form"><div class="form-grid"><label class="field field-full">Project title<input name="title" required placeholder="What would you like to make?"></label><label class="field field-full">Project brief<textarea name="message" rows="3" placeholder="A little context goes a long way"></textarea></label><label class="field">Budget (USD)<input name="budget" type="number" min="0" placeholder="Optional"></label><label class="field">Delivery date<input name="dueDate" type="date"></label><label class="field field-full" id="brief-select-wrap">Attach one of your briefs<select name="briefId"><option value="">No linked brief</option></select></label></div><div class="form-actions"><p>Creator will see your request in their project workspace.</p><button class="button button-dark" type="submit">Send request ↗</button></div></form></div><div class="profile-layout"><div><section class="profile-section"><h2>Selected work</h2><div class="portfolio-grid">${portfolio}</div></section><section class="profile-section"><h2>Client notes</h2>${reviews}</section></div><aside class="profile-side"><section class="profile-section"><h2>What I do</h2>${services}</section><section class="profile-section"><h2>Skills</h2><div class="tool-list">${(creator.skills || []).map(item => `<span class="chip">${esc(item)}</span>`).join("") || `<span class="muted">Profile skills coming soon</span>`}</div></section><section class="profile-section"><h2>Tools of the trade</h2><div class="tool-list">${(creator.tools || []).map(item => `<span class="chip">${esc(item)}</span>`).join("") || `<span class="muted">Tools coming soon</span>`}</div></section></aside></div>`;
    const requestButton = document.getElementById("show-collab");
    requestButton?.addEventListener("click", async () => {
      const currentUser = Hub.currentUser();
      if (!currentUser) return location.href = "login.html";
      if (currentUser.role !== "brand") return Hub.toast("Only brand accounts can request a collaboration.", "error");
      const panel = document.getElementById("collab-panel");
      panel.classList.toggle("hidden");
      try {
        const briefs = await Hub.api("briefs");
        const select = panel.querySelector("select[name=briefId]");
        select.innerHTML = `<option value="">No linked brief</option>${briefs.map(brief => `<option value="${esc(brief._id)}">${esc(brief.title)}</option>`).join("")}`;
      } catch { /* A brand can still make a direct request without an existing brief. */ }
      panel.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    document.getElementById("collab-form")?.addEventListener("submit", async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const values = Object.fromEntries(new FormData(form));
      values.creatorId = creator._id;
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      try {
        await Hub.api("projects", { method: "POST", body: JSON.stringify(values) });
        Hub.toast("Request sent. You can follow it in Projects.");
        location.href = "projects.html";
      } catch (error) { Hub.toast(error.message, "error"); button.disabled = false; }
    });
  }

  document.addEventListener("DOMContentLoaded", () => { initDirectory(); initProfile(); });
})();
