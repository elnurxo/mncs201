const loginForm = document.querySelector("form");

const setJWTToken = (token) => {
  document.cookie = `jwt_token=${token}; path=/; max-age=3600; Secure; SameSite=Strict`;
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  fetch("http://localhost:5050/api/users/login", {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data: ", data);
      if (data?.message === "Invalid username or password") {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "invalid username or password",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setJWTToken(data.token);
      }
    });
});

const getProdsButton = document.querySelector("#get-prods");

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null; // Return null if cookie not found
};

getProdsButton.addEventListener("click", function () {
  const fetchProducts = async () => {
    // Get the JWT token from cookies
    const token = getCookie("jwt_token");

    if (!token) {
      console.error("JWT token not found in cookies.");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "no token provided",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      // Make the fetch request with Authorization header
      const response = await fetch("http://localhost:5050/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Parse and log the response JSON
      const data = await response.json();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "products get successfully in console",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("products", data);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "invalid or expired token",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error fetching products:", error);
    }
  };

  // Call the function to fetch products
  fetchProducts();
});
