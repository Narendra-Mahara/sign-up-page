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

    if (response.ok) {
      showModal(data.message || "Login successful!", true);
      // Redirect after 2 seconds if needed
      setTimeout(() => {
        window.location.href = "dashboard.html"; // Change to your dashboard or home page
      }, 2000);
    } else {
      showModal(data.message || "Login failed. Please try again.", false);
    }
  } catch (error) {
    showModal("Network error. Please try again.", false);
  }
});

function showModal(message, isSuccess = true) {
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
