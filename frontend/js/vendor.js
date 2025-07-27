document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "../auth/login.html";
    return;
  }

  const productList = document.getElementById("product-list");

  // 1. Fetch all available products
  async function loadProducts() {
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        showProducts(data.products);
      } else {
        productList.innerText = data.message || "Error loading products.";
      }
    } catch (err) {
      productList.innerText = "Failed to load products.";
    }
  }

  // 2. Show products and order button
  function showProducts(products) {
    productList.innerHTML = "";

    products.forEach((p) => {
      const div = document.createElement("div");
      div.className = "product";

      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>Price: ₹${p.price}</p>
        <p>Available: ${p.quantity}</p>
        <button data-id="${p._id}">Order Now</button>
      `;

      div.querySelector("button").addEventListener("click", () => {
        placeOrder(p._id);
      });

      productList.appendChild(div);
    });
  }

  // 3. Place Order
  async function placeOrder(productId) {
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully!");
      } else {
        alert(data.message || "Order failed");
      }
    } catch (err) {
      alert("Failed to place order");
    }
  }

  loadProducts();
});
