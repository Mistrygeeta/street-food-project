
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "supplier") {
    alert("Unauthorized. Please login as supplier.");
    window.location.href = "/auth/login.html?role=supplier";
    return;
  }

  try {
    const response = await fetch(`/api/supplier/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (response.ok) {
      // Show supplier section
      document.getElementById("supplier-section").style.display = "block";
    } else {
      throw new Error("Session expired");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Session expired or invalid token. Please login again.");
    localStorage.clear();
    window.location.href = "/auth/login.html?role=supplier";
  }

  // Logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/auth/login.html?role=supplier";
    });
  }
});


