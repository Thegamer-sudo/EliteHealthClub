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


// ===== ELITE CHATBOT - DUAL FLOW SYSTEM =====
class EliteChatbot {
    constructor() {
        this.userData = {
            name: '',
            email: '',
            selectedPackage: null,
            tourTime: null
        };
        this.currentStep = 'welcome';
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('Elite Chatbot initialized');
    }

    setupEventListeners() {
        // Toggle chatbot
        document.getElementById('chatbot-toggle').addEventListener('click', () => {
            this.toggleChat();
        });

        // Close chatbot
        document.getElementById('chatbot-close').addEventListener('click', () => {
            this.closeChat();
        });

        // Send message
        document.getElementById('chatbot-send').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Package selection from join page
        document.addEventListener('click', (e) => {
            if (e.target.closest('.membership-plan .btn')) {
                const planElement = e.target.closest('.membership-plan');
                const planTitle = planElement.querySelector('.plan-title').textContent;
                this.handlePackageSelection(planTitle);
            }
        });
    }

    toggleChat() {
        const container = document.getElementById('chatbot-container');
        const isOpening = container.style.display !== 'flex';
        
        container.style.display = isOpening ? 'flex' : 'none';
        
        if (isOpening) {
            document.getElementById('chatbot-input').focus();
            // If opening fresh (not from package click), show welcome
            if (!this.userData.selectedPackage) {
                this.showWelcomeMessage();
            }
        }
    }

    closeChat() {
        document.getElementById('chatbot-container').style.display = 'none';
    }

    handlePackageSelection(packageName) {
        this.userData.selectedPackage = packageName;
        this.toggleChat(); // Open chatbot
        
        setTimeout(() => {
            this.showPackageConfirmation();
        }, 500);
    }

    // FLOW 1: Welcome (Standalone chatbot)
    showWelcomeMessage() {
        this.addMessage('bot', `Hi! I'm Elite Assistant! 🏋️‍♂️ What can I help you with today?`);
        this.showQuickActions(['Choose Membership Package', 'Ask Questions', 'Book Gym Tour']);
        this.currentStep = 'welcome';
    }

    // FLOW 2: Package already selected (from join page)
    showPackageConfirmation() {
        const priceInfo = this.getPackagePrice(this.userData.selectedPackage);
        
        this.addMessage('bot', `Great! You selected ${this.userData.selectedPackage} Membership: ${priceInfo} 🎯`);
        this.addMessage('bot', `Ready to proceed with this plan?`);
        
        this.showActionButtons([
            { text: 'Yes, Continue', action: () => this.startBookingFlow() },
            { text: 'Choose Different Plan', action: () => this.showPackageSelection() }
        ]);
        
        this.currentStep = 'package_confirmation';
    }

    // Package selection inside chatbot
    showPackageSelection() {
        this.addMessage('bot', `No problem! Choose your membership package:`);
        
        const packages = [
            { name: 'GENERAL', price: 'R350/month' },
            { name: 'STUDENT', price: 'R200/month' },
            { name: 'DEBIT ORDER', price: 'R250/month' },
            { name: 'PENSIONER', price: 'R250/month' },
            { name: '6 MONTH PACKAGE', price: 'R1,500 once-off' },
            { name: 'FAMILY PACKAGE', price: 'R800/month' }
        ];
        
        this.showActionButtons(packages.map(pkg => ({
            text: `${pkg.name} - ${pkg.price}`,
            action: () => this.selectPackageInChat(pkg.name)
        })));
    }

    selectPackageInChat(packageName) {
        this.userData.selectedPackage = packageName;
        this.addMessage('user', `I choose ${packageName}`);
        this.showPackageConfirmation();
    }

    getPackagePrice(packageName) {
        const prices = {
            'STUDENT': 'R200/month + R400 joining fee = R600 first payment',
            'GENERAL': 'R350/month + R400 joining fee = R750 first payment',
            'DEBIT ORDER': 'R250/month + R400 joining fee = R650 first payment',
            'PENSIONER': 'R250/month + R400 joining fee = R650 first payment',
            '6 MONTH PACKAGE': 'R1,500 once-off (no joining fee)',
            'FAMILY PACKAGE': 'R800/month + R400 joining fee = R1,200 first payment'
        };
        
        return prices[packageName] || 'this package';
    }

    // Booking flow
    startBookingFlow() {
        this.addMessage('user', 'Yes, continue');
        this.addMessage('bot', `Perfect! Let's book your gym tour and collect your details.`);
        
        setTimeout(() => {
            this.askForName();
        }, 1000);
    }

    askForName() {
        this.addMessage('bot', `What's your full name?`);
        this.currentStep = 'awaiting_name';
        this.clearQuickActions();
    }

    askForEmail() {
        this.addMessage('bot', `Thanks ${this.userData.name}! What's your email address?`);
        this.currentStep = 'awaiting_email';
    }

    askForTourTime() {
        this.addMessage('bot', `Now choose your preferred tour time:`);
        
        const tourTimes = [
            { time: '🏋️ Morning (Mon-Fri: 5:00 AM - 12:00 PM)', type: 'Morning' },
            { time: '💪 Afternoon (Mon-Fri: 12:00 PM - 5:00 PM)', type: 'Afternoon' },
            { time: '🏃 Evening (Mon-Thu: 5:00 PM - 9:00 PM)', type: 'Evening' },
            { time: '📅 Weekend (Sat: 6:00 AM - 4:00 PM, Sun: 6:00 AM - 2:00 PM)', type: 'Weekend' }
        ];
        
        this.showActionButtons(tourTimes.map(tour => ({
            text: tour.time,
            action: () => this.selectTourTime(tour.type)
        })));
        
        this.currentStep = 'awaiting_tour_time';
    }

    selectTourTime(tourTime) {
        this.userData.tourTime = tourTime;
        this.addMessage('user', `I choose ${tourTime}`);
        this.showBookingSummary();
    }

    showBookingSummary() {
        this.addMessage('bot', `🎉 All set! Here's your booking summary:`);
        
        const summaryHTML = `
            <div class="booking-summary">
                <div class="summary-item">
                    <span class="summary-label">Name:</span>
                    <span class="summary-value">${this.userData.name}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Email:</span>
                    <span class="summary-value">${this.userData.email}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Package:</span>
                    <span class="summary-value">${this.userData.selectedPackage}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Tour Time:</span>
                    <span class="summary-value">${this.userData.tourTime}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Location:</span>
                    <span class="summary-value">Spark Lifestyle Centre, Overport</span>
                </div>
            </div>
        `;
        
        // Create a temporary div to insert HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = summaryHTML;
        document.getElementById('chatbot-messages').appendChild(tempDiv);
        
        this.addMessage('bot', `Ready to send this to our team via WhatsApp?`);
        
        this.showActionButtons([
            { text: '📱 Send to WhatsApp', action: () => this.sendToWhatsApp() },
            { text: '✏️ Edit Details', action: () => this.restartBookingFlow() }
        ]);
    }

    sendToWhatsApp() {
        const message = this.createWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        
        this.addMessage('user', 'Send to WhatsApp');
        this.addMessage('bot', `Perfect! Opening WhatsApp... 📱`);
        
        setTimeout(() => {
            window.open(`https://wa.me/27655172764?text=${encodedMessage}`, '_blank');
            this.resetChatbot();
        }, 1500);
    }

    createWhatsAppMessage() {
        return `Hi! I'm ${this.userData.name} (${this.userData.email}). I'm interested in the ${this.userData.selectedPackage} and would like to book a ${this.userData.tourTime} tour at Elite Health Club.`;
    }

    restartBookingFlow() {
        this.userData.name = '';
        this.userData.email = '';
        this.userData.tourTime = null;
        this.askForName();
    }

    resetChatbot() {
        this.userData = {
            name: '',
            email: '',
            selectedPackage: null,
            tourTime: null
        };
        this.currentStep = 'welcome';
        
        setTimeout(() => {
            this.addMessage('bot', `Is there anything else I can help you with? 💪`);
            this.showQuickActions(['Choose Membership Package', 'Ask Questions', 'Book Gym Tour']);
        }, 2000);
    }

    // Handle user input
    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage('user', message);
            input.value = '';
            this.handleUserInput(message);
        }
    }

    handleUserInput(message) {
        switch(this.currentStep) {
            case 'awaiting_name':
                this.userData.name = message;
                this.askForEmail();
                break;
                
            case 'awaiting_email':
                this.userData.email = message;
                this.askForTourTime();
                break;
                
            default:
                this.handleGeneralMessage(message);
                break;
        }
    }

    handleGeneralMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            this.addMessage('bot', 'Hello! How can I help you with Elite Health Club today? 🏋️‍♂️');
        } else if (lowerMessage.includes('package') || lowerMessage.includes('membership')) {
            this.showPackageSelection();
        } else if (lowerMessage.includes('tour') || lowerMessage.includes('book') || lowerMessage.includes('visit')) {
            this.userData.selectedPackage = 'General'; // Default
            this.startBookingFlow();
        } else {
            this.addMessage('bot', `I'm here to help with membership packages, gym tours, and any questions about Elite Health Club! Try asking about our packages or booking a tour. 💪`);
        }
    }

    // UI Helpers
    showQuickActions(actions) {
        const actionsContainer = document.getElementById('chatbot-actions');
        actionsContainer.innerHTML = '';
        
        actions.forEach(actionText => {
            const button = document.createElement('button');
            button.className = 'quick-action';
            button.textContent = actionText;
            button.onclick = () => this.handleQuickAction(actionText);
            actionsContainer.appendChild(button);
        });
    }

    showActionButtons(actions) {
        const actionsContainer = document.getElementById('chatbot-actions');
        actionsContainer.innerHTML = '';
        
        actions.forEach(item => {
            const button = document.createElement('button');
            const isPackage = item.text.includes('GENERAL') || item.text.includes('STUDENT') || item.text.includes('DEBIT') || item.text.includes('PENSIONER') || item.text.includes('6 MONTH') || item.text.includes('FAMILY');
            const isBooking = item.text.includes('Morning') || item.text.includes('Afternoon') || item.text.includes('Evening') || item.text.includes('Weekend');
            
            if (isPackage) {
                button.className = 'quick-action package-option';
            } else if (isBooking) {
                button.className = 'quick-action booking-option';
            } else {
                button.className = 'quick-action';
            }
            
            button.textContent = item.text;
            button.onclick = item.action;
            actionsContainer.appendChild(button);
        });
    }

    clearQuickActions() {
        document.getElementById('chatbot-actions').innerHTML = '';
    }

    handleQuickAction(action) {
        switch(action) {
            case 'Choose Membership Package':
                this.showPackageSelection();
                break;
            case 'Ask Questions':
                this.addMessage('user', 'I have questions');
                this.addMessage('bot', `Sure! You can ask me about:\n• Membership pricing\n• Operating hours\n• Location & facilities\n• Joining process\n\nOr type your specific question!`);
                break;
            case 'Book Gym Tour':
                this.userData.selectedPackage = 'General';
                this.startBookingFlow();
                break;
        }
    }

    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.textContent = text;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.eliteChatbot = new EliteChatbot();
});
// ===== END CHATBOT =====
