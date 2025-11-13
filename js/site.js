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

// Video Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.video-carousel');
    const videos = document.querySelectorAll('.training-video');
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentVideo = null;
    
    // Pause all videos except the current one
    function pauseOtherVideos(currentVideoElement) {
        videos.forEach(video => {
            if (video !== currentVideoElement) {
                video.pause();
                video.currentTime = 0;
                video.parentElement.classList.remove('playing');
            }
        });
    }
    
    // Video click to play/pause
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.training-video');
        
        wrapper.addEventListener('click', function() {
            if (video.paused) {
                // Pause other videos
                pauseOtherVideos(video);
                // Play current video
                video.play();
                wrapper.classList.add('playing');
                currentVideo = video;
            } else {
                video.pause();
                wrapper.classList.remove('playing');
                currentVideo = null;
            }
        });
        
        // Video ended
        video.addEventListener('ended', function() {
            wrapper.classList.remove('playing');
            currentVideo = null;
        });
    });
    
    // Navigation for mobile/tablet
    if (window.innerWidth <= 1024) {
        let startX = 0;
        let currentScroll = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentScroll = carousel.scrollLeft;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const x = e.touches[0].clientX;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = currentScroll - walk;
        });
        
        // Button navigation for tablets
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -300, behavior: 'smooth' });
            });
            
            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    }
    
    // Auto-pause when video goes out of view (mobile)
    if (window.innerWidth <= 768) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    const video = entry.target.querySelector('.training-video');
                    if (video && !video.paused) {
                        video.pause();
                        video.parentElement.classList.remove('playing');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.video-item').forEach(item => {
            observer.observe(item);
        });
    }
});

// ===== PAYMENT DEMO - EASY TO REMOVE LATER =====
function openPaymentDemo(plan) {
    const modal = document.createElement('div');
    modal.className = 'payment-demo-modal';
    modal.id = 'payment-demo-modal';
    modal.innerHTML = `
        <div class="payment-demo-content">
            <div class="payment-demo-header">
                <h4 class="mb-0">Complete Your Membership</h4>
            </div>
            <div class="payment-demo-body">
                <div class="text-center mb-4">
                    <h5 class="gold-text">Student Membership</h5>
                    <p class="text-light mb-2">R400 Joining Fee + R200 First Month</p>
                    <h3 class="gold-text">Total: R600.00</h3>
                </div>
                
                <div class="payment-option" onclick="showPaymentForm('card')">
                    <h6 class="gold-text">💳 Credit/Debit Card</h6>
                    <p class="text-light mb-0">Pay securely with card</p>
                </div>
                
                <div class="payment-option" onclick="showPaymentForm('bank')">
                    <h6 class="gold-text">🏦 Bank Transfer</h6>
                    <p class="text-light mb-0">Transfer to our bank account</p>
                </div>
                
                <div class="payment-option" onclick="showPaymentForm('speedpoint')">
                    <h6 class="gold-text">⚡ Speedpoint</h6>
                    <p class="text-light mb-0">Secure SA payment gateway</p>
                </div>
                
                <div class="demo-note">
                    <small>🔒 This is a demo. No real payments will be processed.</small>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePaymentDemo();
        }
    });
}

function showPaymentForm(method) {
    const modalBody = document.querySelector('.payment-demo-body');
    
    if (method === 'card') {
        modalBody.innerHTML = `
            <div class="text-center mb-4">
                <h5 class="gold-text">💳 Card Payment</h5>
                <p class="text-light">Total: R600.00</p>
            </div>
            
            <div class="mb-3">
                <label class="form-label text-light">Card Number</label>
                <input type="text" class="form-control" value="4242 4242 4242 4242" readonly>
            </div>
            
            <div class="row mb-3">
                <div class="col-6">
                    <label class="form-label text-light">Expiry</label>
                    <input type="text" class="form-control" value="12/25" readonly>
                </div>
                <div class="col-6">
                    <label class="form-label text-light">CVC</label>
                    <input type="text" class="form-control" value="123" readonly>
                </div>
            </div>
            
            <button class="btn btn-gold w-100 mb-3" onclick="processDemoPayment()">
                Pay R600.00 Now
            </button>
            
            <div class="demo-note">
                <small>💡 Demo: Click to simulate successful payment</small>
            </div>
        `;
    }
    else if (method === 'bank') {
        modalBody.innerHTML = `
            <div class="text-center mb-4">
                <h5 class="gold-text">🏦 Bank Transfer</h5>
                <p class="text-light">Total: R600.00</p>
            </div>
            
            <div class="bank-details">
                <div class="mb-3">
                    <label class="form-label text-light">Bank</label>
                    <input type="text" class="form-control" value="First National Bank" readonly>
                </div>
                
                <div class="mb-3">
                    <label class="form-label text-light">Account Number</label>
                    <input type="text" class="form-control" value="627 3685 1245" readonly>
                </div>
                
                <div class="mb-3">
                    <label class="form-label text-light">Reference</label>
                    <input type="text" class="form-control" value="STUDENT-YOURNAME" readonly>
                </div>
            </div>
            
            <button class="btn btn-gold w-100 mb-3" onclick="processDemoPayment()">
                I've Made Transfer
            </button>
            
            <div class="demo-note">
                <small>💡 Demo: Click to simulate payment confirmation</small>
            </div>
        `;
    }
    else if (method === 'speedpoint') {
        modalBody.innerHTML = `
            <div class="text-center mb-4">
                <h5 class="gold-text">⚡ Speedpoint Payment</h5>
                <p class="text-light">Total: R600.00</p>
            </div>
            
            <div class="text-center mb-4">
                <p class="text-light">You would be redirected to Speedpoint's secure payment page</p>
            </div>
            
            <button class="btn btn-gold w-100 mb-3" onclick="processDemoPayment()">
                Continue to Speedpoint
            </button>
            
            <div class="demo-note">
                <small>💡 Demo: Click to simulate Speedpoint payment</small>
            </div>
        `;
    }
}

function processDemoPayment() {
    const modalBody = document.querySelector('.payment-demo-body');
    
    modalBody.innerHTML = `
        <div class="payment-success">
            <i class="fas fa-check-circle success-icon"></i>
            <h4 class="gold-text mb-3">Payment Successful! 🎉</h4>
            <p class="text-light mb-2">R600.00 received for Student Membership</p>
            <p class="text-light mb-4">Welcome to Elite Health Club!</p>
            
            <div class="demo-note mb-3">
                <small>📧 Demo: Confirmation email would be sent</small><br>
                <small>📱 Demo: WhatsApp notification to gym owner</small>
            </div>
            
            <button class="btn btn-gold" onclick="closePaymentDemo()">
                Start Your Elite Journey
            </button>
        </div>
    `;
}

function closePaymentDemo() {
    const modal = document.getElementById('payment-demo-modal');
    if (modal) {
        modal.remove();
    }
}
// ===== END PAYMENT DEMO =====
