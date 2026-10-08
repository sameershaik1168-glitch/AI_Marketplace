document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("generator-form");
  const output = document.getElementById("generation-output");
  const footer = document.getElementById("output-footer");
  if (!form || !output) return;
  let latestText = "";
  const copy = async () => {
    if (!latestText) return;
    try {
      await navigator.clipboard.writeText(latestText);
      document.getElementById("copy-status").textContent = "Copied to clipboard.";
      Hub.toast("Draft copied.");
    } catch {
      Hub.toast("Clipboard access is unavailable in this browser.", "error");
    }
  };
  document.getElementById("copy-text")?.addEventListener("click", copy);
  document.getElementById("copy-output")?.addEventListener("click", copy);
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!Hub.currentUser()) return location.href = "login.html";
    const button = form.querySelector("button[type=submit]");
    const label = button.querySelector(".button-label");
    button.disabled = true;
    label.textContent = "Finding the words...";
    footer.classList.add("hidden");
    output.innerHTML = `<div class="output-empty"><span class="spinner-mark">✳</span><h2>Giving the idea a shape.</h2><p>This usually takes a few seconds.</p></div>`;
    try {
      const values = Object.fromEntries(new FormData(form));
      const result = await Hub.api("ai/generate", { method: "POST", body: JSON.stringify(values) });
      latestText = result.content;
      output.textContent = latestText;
      footer.classList.remove("hidden");
      document.getElementById("copy-status").textContent = "Made to be edited.";
    } catch (error) {
      latestText = "";
      output.innerHTML = `<div class="output-empty"><span>✳</span><h2>Not quite yet.</h2><p>${Hub.escapeHTML(error.message)}</p>${error.message.includes("OMNIROUTE_API_KEY") ? `<p>Configure the API key in <strong>backend/.env</strong> and restart the server.</p>` : ""}</div>`;
    } finally {
      button.disabled = false;
      label.textContent = "Generate a first draft";
    }
  });
});
