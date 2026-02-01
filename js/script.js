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
// Hero Carousel Functionality
// ========================================

let currentSlide = 0;
let autoSlideInterval;
const IDLE_TIME = 5000; // 10 seconds idle time before auto-slide

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    // Wrap around
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoSlide();
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function autoSlide() {
    showSlide(currentSlide + 1);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, IDLE_TIME);
}

// Initialize carousel
window.addEventListener('load', () => {
    showSlide(0);
    autoSlideInterval = setInterval(autoSlide, IDLE_TIME);
});

// Reset timer on any user interaction
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    // Reset on mouse hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        resetAutoSlide();
    });

    // Reset on mouse click anywhere in carousel
    carouselContainer.addEventListener('click', () => {
        resetAutoSlide();
    });

    // Touch/Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval); // Stop auto-slide when user touches
    });

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    carouselContainer.addEventListener('touchmove', () => {
        clearInterval(autoSlideInterval); // Stop during swipe
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            changeSlide(1);
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            changeSlide(-1);
        } else {
            // No swipe detected, restart timer
            resetAutoSlide();
        }
    }
}

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
    const carousel = document.querySelector('.testimonials-carousel');
    
    if (!cards.length || !carousel) return;
    
    // Calculate how many cards to show based on screen size
    const cardsToShow = window.innerWidth >= 768 ? 3 : 1;
    const maxIndex = Math.max(0, cards.length - cardsToShow);
    
    // Wrap around or constrain index
    if (index > maxIndex) {
        currentTestimonialIndex = 0;
    } else if (index < 0) {
        currentTestimonialIndex = maxIndex;
    } else {
        currentTestimonialIndex = index;
    }

    // For mobile screens, show one card at a time
    if (window.innerWidth < 768) {
        cards.forEach((card, i) => {
            card.style.display = i === currentTestimonialIndex ? 'block' : 'none';
        });
        carousel.style.transform = 'translateX(0)';
    } else {
        // For desktop screens, slide the carousel
        cards.forEach(card => {
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
        });
        
        // Calculate the slide offset
        const container = carousel.parentElement;
        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem gap between cards
        const offset = -(currentTestimonialIndex * (cardWidth + gap));
        
        carousel.style.transform = `translateX(${offset}px)`;
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
