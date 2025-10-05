// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const course = document.getElementById('course').value;
            
            // Simple validation
            if (!name || !phone || !course) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demonstration, we'll just show a success message
            alert(`Thank you ${name}! We have received your inquiry for the ${course} course. We will contact you at ${phone} shortly.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Add animation to course cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all course cards and testimonial cards
    document.querySelectorAll('.course-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});


// ✅ Initialize EmailJS with Public Key
emailjs.init({
    publicKey: "Mm_2oYJp1rGKjjnhp", // replace with your EmailJS Public Key
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form values
        let params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            course: document.getElementById("course").value,
            message: document.getElementById("message").value,
            to_email: "rajeshkumartharu959@gmail.com" // your recipient email
        };

        console.log("📩 Sending inquiry:", params);

        // Send email using EmailJS
        emailjs.send("service_e2i7jmi", "template_uw6dain", params)
            .then(function (response) {
                alert("✅ Your inquiry has been sent successfully!");
                console.log("SUCCESS!", response.status, response.text);
                form.reset();
            }, function (error) {
                alert("❌ Failed to send inquiry. Please try again.");
                console.error("EmailJS Error:", error);
            });
    });
});
