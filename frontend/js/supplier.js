document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addProductForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized. Please login.");
      window.location.href = "/auth/login.html?role=supplier";
      return;
    }

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;

    try {
      const response = await fetch("/api/supplier/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price, quantity }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        form.reset();
      } else {
        alert(result.message || "Failed to add product.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Something went wrong. Try again later.");
    }
  });
});
