document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "vendor") {
    alert("Unauthorized. Please login.");
    window.location.href = "/auth/login.html?role=vendor";
    return;
  }

  console.log("Token:", token);
  console.log("Role:", role);

  try {
    const userRes = await fetch(`/api/vendor/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    let result;
    try {
      result = await userRes.json(); 
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      throw new Error("Invalid response from server");
    }

    if (userRes.ok) {
      const user = result; 
      document.getElementById("userName").innerText = user.name;
      document.getElementById("email").innerText = user.email;
      document.getElementById("phone").innerText = user.phone;
      document.getElementById("area").innerText = user.area;
    } else {
      throw new Error("Failed to fetch user data");
    }

  
    const orderRes = await fetch(`/api/vendor/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const orderData = await orderRes.json();

    if (orderRes.ok) {
      const list = document.getElementById("order-list");
      list.innerHTML = ""; 

      orderData
        .slice(-3) 
        .reverse()
        .forEach(order => {
          const li = document.createElement("li");
          li.innerText = `Order to ${order.supplierName || "Supplier"} - Status: ${order.status}`;
          list.appendChild(li);
        });
    } else {
      document.getElementById("order-list").innerText = "No recent orders";
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong");
    localStorage.clear();
    window.location.href = "/auth/login.html?role=vendor";
  }

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/auth/login.html?role=vendor";
  });
});
