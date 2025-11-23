// Wait until DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
  
    // ✅ Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
      });
    }
  
    // ✅ Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
  
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
  
          // Close mobile menu after clicking a link
          if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
          }
        }
      });
    });
});
    // ✅ Animate cards on scroll (courses + testimonials)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
  
    document.querySelectorAll(".course-card, .testimonial-card").forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(card);
    });
  

  



    // email.js

// Initialize EmailJS (replace with your Public Key)
(function () {
  emailjs.init("Mm_2oYJp1rGKjjnhp"); // 👉 Replace with your actual EmailJS Public Key
})();

// Select the booking form and button
const form = document.getElementById("bookCourseForm");
const submitBtn = form.querySelector("button[type='submit']");

// Create popup element for success message
const popup = document.createElement("div");
popup.id = "successPopup";
popup.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50";
popup.innerHTML = `
  <div class="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-fadeIn">
    <div class="text-5xl mb-3 text-green-500">✅</div>
    <h3 class="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
    <p class="text-gray-600 mb-5">Thank you for booking your course. We’ll contact you soon.</p>
    <button id="closePopup" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">OK</button>
  </div>
`;
document.body.appendChild(popup);

// Add animation style
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;
document.head.appendChild(style);

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Add loading spinner to button
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `<svg class="animate-spin h-5 w-5 inline-block mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"></path>
    </svg> Sending...`;

  // Send form data using EmailJS
  emailjs.sendForm("service_cq3src3", "template_f87v3ai", this)
    .then(function () {
      form.reset();
      popup.classList.remove("hidden");
    })
    .catch(function (error) {
      console.error("❌ EmailJS Error:", error);
      alert("Failed to send message. Please try again later.");
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
});

// Close popup on button click
document.addEventListener("click", (e) => {
  if (e.target.id === "closePopup") {
    popup.classList.add("hidden");
  }
});

