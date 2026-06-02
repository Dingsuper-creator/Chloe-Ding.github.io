// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.publication-item, .timeline-item, .news-item, .info-card, .research-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    /* Animation styles */
    section, .publication-item, .timeline-item, .news-item, .info-card, .research-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    section.animate-in, .publication-item.animate-in, .timeline-item.animate-in, .news-item.animate-in, .info-card.animate-in, .research-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Hamburger animation */
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    /* Loading animation for images */
    .profile-image img, .research-image img {
        transition: opacity 0.3s ease;
    }

    .profile-image img:not([src]), .research-image img:not([src]) {
        opacity: 0;
    }

    /* Hover effects */
    .timeline-item:hover .timeline-content {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .news-item:hover {
        transform: translateX(5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .info-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    /* Stagger animation for timeline items */
    .timeline-item:nth-child(1) { transition-delay: 0.1s; }
    .timeline-item:nth-child(2) { transition-delay: 0.2s; }
    .timeline-item:nth-child(3) { transition-delay: 0.3s; }
    .timeline-item:nth-child(4) { transition-delay: 0.4s; }

    /* Stagger animation for news items */
    .news-item:nth-child(1) { transition-delay: 0.1s; }
    .news-item:nth-child(2) { transition-delay: 0.2s; }
    .news-item:nth-child(3) { transition-delay: 0.3s; }

    /* Stagger animation for info cards */
    .info-card:nth-child(1) { transition-delay: 0.1s; }
    .info-card:nth-child(2) { transition-delay: 0.2s; }
`;

document.head.appendChild(style);

// Typing effect for the main title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Add scroll-to-top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');

    const scrollToTopStyle = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-to-top:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = scrollToTopStyle;
    document.head.appendChild(styleSheet);

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: ${this.width || '300'}px;
                height: ${this.height || '300'}px;
                background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
                border-radius: ${this.style.borderRadius || '0'};
                display: flex;
                align-items: center;
                justify-content: center;
                color: #64748b;
                font-size: 14px;
                text-align: center;
                padding: 20px;
                box-sizing: border-box;
            `;
            placeholder.textContent = 'Image not available';

            if (this.parentNode) {
                this.parentNode.replaceChild(placeholder, this);
            }
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.nav-menu');

    if (modal) {
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && modal.classList.contains('active')) {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
});

console.log('Academic homepage script loaded successfully!');