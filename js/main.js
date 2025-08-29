
// Optimized JavaScript for Centro de Estudios Zenit - Performance Enhanced
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle - Optimized
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenuButton && mobileMenu) {
        // Use single event listener with event delegation
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden', !isOpen);
            closeIcon.classList.toggle('hidden', isOpen);
        });

        // Close mobile menu when clicking on links - Event delegation
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    }

    // FAQ Accordion
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const answer = this.parentElement.querySelector('.faq-answer');
            const chevron = this.querySelector('.chevron');
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other FAQs
            faqButtons.forEach((otherButton, otherIndex) => {
                if (otherIndex !== index) {
                    const otherAnswer = otherButton.parentElement.querySelector('.faq-answer');
                    const otherChevron = otherButton.querySelector('.chevron');
                    otherAnswer.classList.add('hidden');
                    otherChevron.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            if (isOpen) {
                answer.classList.add('hidden');
                chevron.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.remove('hidden');
                chevron.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Smooth Scrolling - Optimized with event delegation
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetElement = document.querySelector(link.getAttribute('href'));
            if (targetElement) {
                const headerHeight = 120; // Fixed height for better performance
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                window.scrollBy(0, -headerHeight);
            }
        }
    });

    // Visitor Counter
    function initVisitorCounter() {
        const visitorCountElement = document.getElementById('visitor-count');
        if (!visitorCountElement) return;

        // Get current count from localStorage or start with 3965
        let visitorCount = localStorage.getItem('zenite-visitor-count');
        if (!visitorCount) {
            visitorCount = 3965;
            localStorage.setItem('zenite-visitor-count', visitorCount);
        } else {
            // Increment the count
            visitorCount = parseInt(visitorCount) + 1;
            localStorage.setItem('zenite-visitor-count', visitorCount);
        }

        // Display the count
        visitorCountElement.textContent = visitorCount;
    }

    // Initialize visitor counter
    initVisitorCounter();

    // Header background on scroll - Optimized with throttling
    const header = document.querySelector('header');
    if (header) {
        let ticking = false;
        const updateHeader = () => {
            const scrolled = window.scrollY > 100;
            header.style.backgroundColor = scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    // Optimized Intersection Observer for animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe only key elements for better performance
        const animateElements = document.querySelectorAll('.card-hover, section h2, section h3');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }
});

// Handle errors for missing icons (fallback) - Updated for WebP
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' && e.target.src.includes('logo-zenit.webp')) {
        console.warn('Logo image not found, using fallback');
        e.target.style.display = 'none';
    }
});
