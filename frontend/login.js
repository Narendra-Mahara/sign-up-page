let form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  try {
    const response = await fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the data type as JSON
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log("Data sent to server!", data);
  } catch (error) {
    console.log("Error fetching data::", error);
  }
});
