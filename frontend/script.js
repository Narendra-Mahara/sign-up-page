let form = document.querySelector("form");
let button = document.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  button.disabled = true; // Disable the button to prevent multiple submissions
  button.textContent = "Signing up..."; // Change button text to indicate processing
  let username = document.querySelector("#username").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  try {
    const response = await fetch("http://localhost:5000/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the data type as JSON
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    button.textContent = "Register";
    button.disabled = false;
    username = "";
    email = "";
    password = "";

    showModal(data.message, true);

    // If registration is successful, redirect to login page after 3 seconds
    if (data.id) {
      setTimeout(() => {
        window.location.href = "login.html"; // Change to your login page URL
      }, 3000);
    }
  } catch (error) {
    showModal("Registration failed. Please try again.", false);
    button.textContent = "Register";
    button.disabled = false;
  }
});

function showModal(message, isSuccess) {
  const oldModal = document.getElementById("message-modal");
  if (oldModal) oldModal.remove();

  // Create modal
  let messageModal = document.createElement("div");
  messageModal.id = "message-modal";
  messageModal.style.backgroundColor = isSuccess ? "#28a745" : "#dc3545";
  messageModal.style.borderRadius = "10px";
  messageModal.style.position = "fixed";
  messageModal.style.top = "30px";
  messageModal.style.right = "30px";
  messageModal.style.color = "#fff";
  messageModal.style.padding = "20px 30px";
  messageModal.style.zIndex = "9999";
  messageModal.style.opacity = "0";
  messageModal.style.transition = "opacity 0.5s";

  messageModal.innerHTML = `<p style="margin:0;font-size:1.1em;">${message}</p>`;

  document.body.appendChild(messageModal);

  // Trigger fade-in
  setTimeout(() => {
    messageModal.style.opacity = "1";
  }, 10);

  // Fade out and remove after 2.5s
  setTimeout(() => {
    messageModal.style.opacity = "0";
    setTimeout(() => {
      messageModal.remove();
    }, 500);
  }, 2500);
}
