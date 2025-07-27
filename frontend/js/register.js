
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const message = document.getElementById("message");

  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role");

  document.getElementById("form-title").innerText = `Register as ${role}`;


  const loginLink = document.getElementById("login-link");
  if (loginLink && role) {
    loginLink.href = `login.html?role=${role}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      phone: document.getElementById("phone").value,
      area: document.getElementById("area").value,
      role: new URLSearchParams(window.location.search).get("role") || "vendor"
    };

    try {
      console.log("Submitting data to:", "/api/auth/register");
      console.log("Data:", data);

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

     if (response.ok) {
  localStorage.setItem("userName", result.user.name);
  localStorage.setItem("token", result.token);
  localStorage.setItem("role", result.user.role);

  if (role === "vendor") {
    window.location.href = "/vendor/dashboard.html";
  } else if (role === "supplier") {
    window.location.href = "/supplier/dashboard.html";
  } else {
    message.innerText = "Unknown role. Cannot redirect.";
  }
}
    } catch (err) {
      console.error("Error:", err);
      message.innerText = "Server error. Try again.";
    }
  });
});
