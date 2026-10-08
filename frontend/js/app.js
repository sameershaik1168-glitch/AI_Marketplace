(() => {
  const tokenKey = "creatorhub_token";
  const userKey = "creatorhub_user";
  const currentUser = () => {
    try { return JSON.parse(localStorage.getItem(userKey) || "null"); } catch { return null; }
  };
  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  async function api(url, options = {}) {
    const token = localStorage.getItem(tokenKey);
    const response = await fetch(url.startsWith("/") ? url : `/api/${url}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
    return data;
  }
  function toast(message, type = "") {
    document.querySelector(".toast")?.remove();
    const node = document.createElement("div");
    node.className = `toast ${type}`;
    node.setAttribute("role", "status");
    node.textContent = message;
    document.body.append(node);
    window.setTimeout(() => node.remove(), 3600);
  }
  const money = value => value === undefined || value === null || value === "" ? "Let's talk" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  const initials = name => String(name || "Creator").split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();

  const page = document.body.dataset.page;
  const user = currentUser();
  const localAvatars = ["assets/creator-nami.svg", "assets/creator-alex.svg", "assets/creator-forma.svg"];
  document.querySelectorAll("img[src*='images.unsplash.com']").forEach(image => {
    if (image.closest(".avatar-stack")) {
      image.src = localAvatars[[...image.parentElement.children].indexOf(image) % localAvatars.length];
    } else if (image.classList.contains("hero-image")) {
      image.src = "assets/hero-art.svg";
    } else if (image.closest(".creator-feature")) {
      const artwork = ["assets/campaign-film.svg", "assets/product-still.svg", "assets/brand-world.svg"];
      image.src = artwork[[...image.closest(".creator-feature-grid").children].indexOf(image.closest(".creator-feature"))];
    } else {
      image.src = "assets/hero-art.svg";
    }
  });
  document.addEventListener("error", event => {
    const image = event.target;
    if (image instanceof HTMLImageElement && !image.dataset.localFallback && !image.src.includes("/assets/")) {
      image.dataset.localFallback = "true";
      image.src = image.closest(".portfolio-item") ? "assets/campaign-film.svg" : "assets/creator-nami.svg";
    }
  }, true);
  const header = document.getElementById("site-header");
  if (header) {
    const links = [
      ["Home", "index.html", "home"], ["Discover creators", "creators.html", "creators"],
      ["Projects", "projects.html", "projects"], ["AI generator", "ai-generator.html", "generator"]
    ];
    header.innerHTML = `<header class="site-header"><a class="brand-mark" href="index.html"><span class="brand-symbol">✳</span> AI CreatorHub</a><button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="nav-links" aria-label="Main navigation">${links.map(([label, href, key]) => `<a href="${href}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}</nav><div class="nav-actions">${user ? `<a class="nav-login" href="dashboard.html">${escapeHTML(user.name.split(" ")[0])}</a><button class="button button-dark nav-join" id="logout-button" type="button">Sign out</button>` : `<a class="nav-login" href="login.html">Log in</a><a class="button button-dark nav-join" href="register.html">Join CreatorHub ↗</a>`}</div></header>`;
    header.querySelector(".nav-toggle").addEventListener("click", event => {
      const nav = header.querySelector(".nav-links");
      const open = nav.classList.toggle("open");
      event.currentTarget.setAttribute("aria-expanded", String(open));
      event.currentTarget.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    header.querySelector("#logout-button")?.addEventListener("click", () => {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(userKey);
      location.href = "index.html";
    });
  }
  const footer = document.getElementById("site-footer");
  if (footer) footer.innerHTML = `<footer class="site-footer"><div class="wrap footer-inner"><a class="brand-mark" href="index.html"><span class="brand-symbol">✳</span> AI CreatorHub</a><span>Made for what's next. © ${new Date().getFullYear()}</span><div class="footer-links"><a href="creators.html">Creators</a><a href="projects.html">Projects</a><a href="ai-generator.html">AI generator</a></div></div></footer>`;

  window.Hub = { api, currentUser, escapeHTML, toast, money, initials, tokenKey, userKey };
})();
