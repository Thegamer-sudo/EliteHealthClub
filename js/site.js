// SUPER SIMPLE QUOTES CAROUSEL - NO COMPLEXITY
document.addEventListener('DOMContentLoaded', function () {
    // QUOTES CAROUSEL - SIMPLE AND RELIABLE
    const quotes = document.querySelectorAll('.quote-slide');
    let currentIndex = 0;

    function rotateQuotes() {
        // Remove active from current quote
        quotes[currentIndex].classList.remove('active');

        // Move to next quote
        currentIndex = (currentIndex + 1) % quotes.length;

        // Add active to new quote
        quotes[currentIndex].classList.add('active');
    }

    // Start carousel if quotes exist
    if (quotes.length > 0) {
        // Show first quote
        quotes[0].classList.add('active');

        // Rotate every 4 seconds
        setInterval(rotateQuotes, 4000);
    }

    // CYLINDER ANIMATION
    const cylinder = document.querySelector('.cylinder');
    if (cylinder) {
        cylinder.addEventListener('mouseenter', () => {
            cylinder.style.animationPlayState = 'paused';
        });

        cylinder.addEventListener('mouseleave', () => {
            cylinder.style.animationPlayState = 'running';
        });
    }

    // NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.padding = '1rem 0';
            }
        });
    }

    // SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // PAGE LOAD ANIMATION
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
