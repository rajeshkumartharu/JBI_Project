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
  

  // 1. Add your EmailJS public key and service/template IDs
const serviceID = 'service_e2i7jmiID';
const templateID = 'template_uw6dain';
const publicKey = 'Mm_2oYJp1rGKjjnhp';

// 2. Form submit event
document.getElementById('bookCourseForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // 3. Collect form values
    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        course: this.course.value,
        message: this.message.value
    };

    // 4. Send form data using EmailJS
    emailjs.send(serviceID, templateID, formData, publicKey)
        .then(() => {
            alert('Your booking message has been sent successfully!');
            this.reset(); // Reset form after successful submission
        }, (error) => {
            console.error('Failed to send message:', error);
            alert('Oops! Something went wrong, please try again.');
        });
});
