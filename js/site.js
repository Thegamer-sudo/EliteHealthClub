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


// ===== ELITE CHATBOT - EASY TO REMOVE =====
class EliteChatbot {
    constructor() {
        this.currentFlow = null;
        this.selectedPackage = null;
        this.init();
    }

    init() {
        this.createChatbot();
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    createChatbot() {
        // Chatbot HTML is already in the page
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
        container.style.display = container.style.display === 'flex' ? 'none' : 'flex';
        
        if (container.style.display === 'flex') {
            document.getElementById('chatbot-input').focus();
        }
    }

    closeChat() {
        document.getElementById('chatbot-container').style.display = 'none';
    }

    showWelcomeMessage() {
        this.addMessage('bot', `Hi! I'm your Elite Health Assistant! 🏋️‍♂️ How can I help you today?`);
        this.showQuickActions(['Membership Info', 'Book Gym Tour', 'Operating Hours', 'Location']);
    }

    handlePackageSelection(packageName) {
        this.selectedPackage = packageName;
        this.toggleChat(); // Open chatbot
        
        setTimeout(() => {
            this.addMessage('user', `I'm interested in the ${packageName} package`);
            this.showPackageResponse(packageName);
        }, 500);
    }

    showPackageResponse(packageName) {
        const priceMap = {
            'STUDENT': 'R200/month + R400 joining fee',
            'GENERAL': 'R350/month + R400 joining fee', 
            'DEBIT ORDER': 'R250/month + R400 joining fee',
            'PENSIONER': 'R250/month + R400 joining fee',
            '6 MONTH PACKAGE': 'R1,500 once-off',
            'FAMILY PACKAGE': 'R800/month + R400 joining fee'
        };

        const price = priceMap[packageName] || 'this package';
        
        this.addMessage('bot', `Excellent choice! The ${packageName} package is ${price}. 🎯`);
        
        setTimeout(() => {
            this.addMessage('bot', `At Elite, we believe in *fit first, pay later*. We'd love for you to experience our premium facilities before committing!`);
            this.showBookingOptions();
        }, 1000);
    }

    showBookingOptions() {
        const actions = [
            { text: '📅 Book Gym Tour (Recommended)', action: 'showTourTimes' },
            { text: '💬 Continue on WhatsApp', action: 'redirectToWhatsApp' },
            { text: '❓ Ask Questions First', action: 'showFAQ' }
        ];
        
        this.showActionButtons(actions);
    }

    showTourTimes() {
        this.addMessage('user', 'I want to book a gym tour');
        this.addMessage('bot', 'Perfect! Choose your preferred visit time: 🗓️');
        
        const tourTimes = [
            { time: '🏋️ Morning (Mon-Fri: 5:00 AM - 12:00 PM)', type: 'morning' },
            { time: '💪 Afternoon (Mon-Fri: 12:00 PM - 5:00 PM)', type: 'afternoon' },
            { time: '🏃 Evening (Mon-Thu: 5:00 PM - 9:00 PM)', type: 'evening' },
            { time: '📅 Weekend (Sat: 6:00 AM - 4:00 PM, Sun: 6:00 AM - 2:00 PM)', type: 'weekend' }
        ];
        
        this.showActionButtons(tourTimes.map(tour => ({
            text: tour.time,
            action: () => this.confirmBooking(tour.type)
        })));
    }

    confirmBooking(tourType) {
        const timeMap = {
            'morning': 'Morning (Mon-Fri: 5:00 AM - 12:00 PM)',
            'afternoon': 'Afternoon (Mon-Fri: 12:00 PM - 5:00 PM)', 
            'evening': 'Evening (Mon-Thu: 5:00 PM - 9:00 PM)',
            'weekend': 'Weekend (Sat: 6:00 AM - 4:00 PM, Sun: 6:00 AM - 2:00 PM)'
        };
        
        this.addMessage('user', `I choose ${timeMap[tourType]}`);
        this.addMessage('bot', `🎉 Excellent! You're booked for a ${timeMap[tourType]} tour!`);
        
        setTimeout(() => {
            this.addMessage('bot', `📍 **Location:** Level 3 – The Spark Lifestyle Centre, 98 Cannon Avenue, Overport, Durban`);
            this.addMessage('bot', `💡 **Pro Tip:** Mention "I booked online" when you arrive for a personal tour!`);
            this.addMessage('bot', `We can't wait to show you why we're Durban's premier fitness destination! 💪`);
        }, 800);
    }

    redirectToWhatsApp() {
        const packageName = this.selectedPackage || 'membership';
        const message = `Hi! I'm interested in the ${packageName} and would like to book a gym tour.`;
        const encodedMessage = encodeURIComponent(message);
        
        this.addMessage('user', 'I want to continue on WhatsApp');
        this.addMessage('bot', `Perfect! Taking you to WhatsApp... 💬`);
        
        setTimeout(() => {
            window.open(`https://wa.me/27655172764?text=${encodedMessage}`, '_blank');
        }, 1000);
    }

    showFAQ() {
        this.addMessage('user', 'I have some questions first');
        this.addMessage('bot', `Sure! Here's what I can help with:`);
        
        const faqOptions = [
            { text: '🕒 Operating Hours', action: () => this.showOperatingHours() },
            { text: '💰 All Pricing', action: () => this.showAllPricing() },
            { text: '📍 Location & Directions', action: () => this.showLocation() },
            { text: '🏋️ Equipment & Facilities', action: () => this.showFacilities() },
            { text: '📝 Joining Process', action: () => this.showJoiningProcess() }
        ];
        
        this.showActionButtons(faqOptions);
    }

    showOperatingHours() {
        this.addMessage('user', 'What are your operating hours?');
        this.addMessage('bot', `🏋️ **Operating Hours:**\n• Mon-Thu: 5:00 AM - 9:00 PM\n• Friday: 5:00 AM - 8:00 PM\n• Saturday: 6:00 AM - 4:00 PM\n• Sunday: 6:00 AM - 2:00 PM\n• Public Holidays: 6:00 AM - 2:00 PM`);
    }

    showAllPricing() {
        this.addMessage('user', 'Show me all pricing');
        this.addMessage('bot', `💰 **Membership Plans:**\n• Student: R200/month\n• General: R350/month\n• Debit Order: R250/month\n• Pensioner: R250/month\n• 6-Month: R1,500 once-off\n• Family: R800/month\n➕ R400 Joining Fee for all new members`);
    }

    showLocation() {
        this.addMessage('user', 'Where are you located?');
        this.addMessage('bot', `📍 **Elite Health Club**\nLevel 3 – The Spark Lifestyle Centre\n98 Cannon Avenue, Overport\nDurban, South Africa\n\nWe're in the heart of Overport - easy to find! 🗺️`);
    }

    showFacilities() {
        this.addMessage('user', 'What equipment do you have?');
        this.addMessage('bot', `🏋️ **Premium Facilities:**\n• Strength training area\n• Cardio equipment\n• Free weights section\n• Functional training space\n• Locker rooms\n• Professional atmosphere\n\nAll maintained to elite standards! 💪`);
    }

    showJoiningProcess() {
        this.addMessage('user', 'How do I join?');
        this.addMessage('bot', `📝 **Simple Joining Process:**\n1. Visit the gym for a tour\n2. Choose your membership\n3. Pay R400 joining + first month\n4. Get your membership card\n5. Start training immediately!\n\nNo long-term contracts! 🎉`);
    }

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
            button.className = item.text.includes('Tour') ? 'quick-action booking-option' : 'quick-action';
            button.textContent = item.text;
            button.onclick = typeof item.action === 'function' ? item.action : () => this[item.action]();
            actionsContainer.appendChild(button);
        });
    }

    handleQuickAction(action) {
        switch(action) {
            case 'Membership Info':
                this.addMessage('user', 'Tell me about memberships');
                this.showAllPricing();
                break;
            case 'Book Gym Tour':
                this.addMessage('user', 'I want to book a tour');
                this.showTourTimes();
                break;
            case 'Operating Hours':
                this.showOperatingHours();
                break;
            case 'Location':
                this.showLocation();
                break;
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage('user', message);
            input.value = '';
            this.handleUserMessage(message);
        }
    }

    handleUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple response logic
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            this.addMessage('bot', 'Hello! How can I help you with Elite Health Club today? 🏋️‍♂️');
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            this.showAllPricing();
        } else if (lowerMessage.includes('hour') || lowerMessage.includes('open')) {
            this.showOperatingHours();
        } else if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
            this.showLocation();
        } else if (lowerMessage.includes('book') || lowerMessage.includes('tour')) {
            this.showTourTimes();
        } else if (lowerMessage.includes('whatsapp')) {
            this.redirectToWhatsApp();
        } else {
            this.addMessage('bot', `I'm here to help with membership info, gym tours, and any questions about Elite Health Club! Try asking about pricing, hours, or booking a tour. 💪`);
        }
    }

    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.textContent = text;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Clear quick actions after user message
        if (sender === 'user') {
            document.getElementById('chatbot-actions').innerHTML = '';
        }
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.eliteChatbot = new EliteChatbot();
});
// ===== END CHATBOT =====
