document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const message = document.getElementById("message");

  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role") || "vendor";

  document.getElementById("form-title").innerText = `Login as ${role}`;
  const switchLink = document.getElementById("switch-register");
  switchLink.href = `register.html?role=${role}`;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: role
    };

    console.log("Data sent to server:", data);

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok && result.token) {
        message.innerText = "Login successful!";
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.user.role); 

        console.log("Token stored:", result.token);
        console.log("Role stored:", result.user.role);

        if (result.user.role === "vendor") {
          window.location.href = "/vendor/dashboard.html";
        } else {
          window.location.href = "/supplier/dashboard.html";
        }
      } else {
        message.innerText = result.message || "Login failed";
        console.warn("Login failed:", result.message);
      }
    } catch (err) {
      console.error("Error in login:", err);
      message.innerText = "Server error. Try again.";
    }
  });
});
