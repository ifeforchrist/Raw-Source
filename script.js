const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = menuToggle.querySelector("i");
      if(icon){
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    });
  });
}

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function(event){
     event.preventDefault();
     const name = document.getElementById("name").value.trim();
     const email = document.getElementById("email").value.trim();
     const message = document.getElementById("message").value.trim();
     const nameError = document.getElementById("nameError");
     const emailError = document.getElementById("emailError");
     const messageError = document.getElementById("messageError");
     const successMessage = document.getElementById("successful");

     nameError.textContent = "";
     emailError.textContent = "";
     messageError.textContent = "";
     successMessage.textContent = "";

     let valid = true;
     if(name == ""){ nameError.textContent = "please enter name"; valid = false; }
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(email == ""){ emailError.textContent = "please enter your email"; valid = false; }
     else if(!emailPattern.test(email)){ emailError.textContent = "please enter a valid email"; valid = false; }
     if(message == ""){ messageError.textContent = "please enter your message"; valid = false; }
     if(!valid) return;

     try {
        successMessage.textContent = "Sending...";
        const formData = new FormData(form);
        const response = await fetch(form.action, { method: "POST", body: formData });
        if(response.ok){
           successMessage.textContent = "message sent successfully!";
           form.reset();
        } else {
           successMessage.textContent = "Failed to send, try again";
        }
     } catch (error) {
        successMessage.textContent = "Network error, check your internet";
     }
  });
}