// ========================================
// Mobile Navigation Toggle
// ========================================

const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========================================
// Smooth Scroll to Section
// ========================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// Testimonials Carousel
// ========================================

let currentTestimonialIndex = 0;

function showTestimonial(index) {
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (index >= cards.length) {
        currentTestimonialIndex = 0;
    } else if (index < 0) {
        currentTestimonialIndex = cards.length - 1;
    }

    // For larger screens, show all cards
    // For smaller screens, show one at a time
    if (window.innerWidth < 768) {
        cards.forEach((card, i) => {
            card.style.display = i === currentTestimonialIndex ? 'block' : 'none';
        });
    }
}

function nextTestimonial() {
    currentTestimonialIndex++;
    showTestimonial(currentTestimonialIndex);
}

function previousTestimonial() {
    currentTestimonialIndex--;
    showTestimonial(currentTestimonialIndex);
}

// Initialize testimonials on load
window.addEventListener('load', () => {
    showTestimonial(currentTestimonialIndex);
});

// Update testimonial display on window resize
window.addEventListener('resize', () => {
    showTestimonial(currentTestimonialIndex);
});

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Form will submit to Google Apps Script via hidden iframe
        // Show success message after a short delay
        setTimeout(() => {
            showSuccessMessage();
            contactForm.reset();
        }, 500);
    });
}

// Listen to messages from the Google Apps Script (if it sends one)
window.addEventListener('message', (event) => {
    if (event.data === 'success') {
        showSuccessMessage();
        if (contactForm) contactForm.reset();
    }
});

function showSuccessMessage() {
    // Create and show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        ">
            ✓ Request received! We'll contact you soon.
        </div>
    `;

    document.body.appendChild(successMsg);

    // Remove message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// ========================================
// Add CSS Animation
// ========================================

const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Scroll Animation for Elements
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, features, etc.
document.querySelectorAll('.service-card, .feature, .testimonial-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ========================================
// Mobile Menu Toggle Animation
// ========================================

const toggleButton = document.querySelector('.mobile-toggle');
if (toggleButton) {
    toggleButton.addEventListener('click', function() {
        const spans = this.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translate(10px, 10px)' 
            : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') 
            ? '0' 
            : '1';
        spans[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -7px)' 
            : 'none';
    });
}

// ========================================
// Add Loading State to Buttons
// ========================================

document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.type === 'submit') return; // Skip form submit buttons
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 1500);
    });
});

// ========================================
// Lazy Loading Images (when added)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ========================================
// Analytics and Tracking (Placeholder)
// ========================================

// Track button clicks
document.querySelectorAll('.cta-btn, .float-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('CTA Button clicked:', this.textContent);
        // Add your analytics tracking here (Google Analytics, etc.)
    });
});

// ========================================
// FAQ Collapsible Sections
// ========================================

function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other FAQ items (accordion behavior)
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ========================================
// Utility: Add class to navbar on scroll
// ========================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});
