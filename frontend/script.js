let form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log("Data sent to server!", data);
  } catch (error) {
    console.log("Error fetching data::", error);
  }
});
