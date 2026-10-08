document.addEventListener("DOMContentLoaded", () => {
  const showError = (form, message = "") => {
    const target = form.querySelector(".form-message");
    if (target) target.textContent = message;
  };
  const saveSession = result => {
    localStorage.setItem(Hub.tokenKey, result.token);
    localStorage.setItem(Hub.userKey, JSON.stringify(result.user));
    location.href = "dashboard.html";
  };

  const loginForm = document.getElementById("login-form");
  loginForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const button = loginForm.querySelector("button[type=submit]");
    const originalText = button.innerHTML;
    button.disabled = true;
    button.textContent = "Signing in...";
    showError(loginForm);
    try {
      const values = Object.fromEntries(new FormData(loginForm));
      saveSession(await Hub.api("auth/login", { method: "POST", body: JSON.stringify(values) }));
    } catch (error) {
      showError(loginForm, error.message);
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });

  const registerForm = document.getElementById("register-form");
  const roleSelect = document.getElementById("account-role");
  const companyField = registerForm?.querySelector(".company-field");
  const updateCompanyVisibility = () => {
    if (companyField) companyField.classList.toggle("hidden", roleSelect.value !== "brand");
  };
  roleSelect?.addEventListener("change", updateCompanyVisibility);
  updateCompanyVisibility();
  registerForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const button = registerForm.querySelector("button[type=submit]");
    const originalText = button.innerHTML;
    button.disabled = true;
    button.textContent = "Creating account...";
    showError(registerForm);
    try {
      const values = Object.fromEntries(new FormData(registerForm));
      saveSession(await Hub.api("auth/register", { method: "POST", body: JSON.stringify(values) }));
    } catch (error) {
      showError(registerForm, error.message);
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });
});
