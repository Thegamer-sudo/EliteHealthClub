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


// ===== ELITE CHATBOT - MOBILE OPTIMIZED =====
class EliteChatbot {
    constructor() {
        this.userData = {
            name: '',
            selectedPackage: null,
            tourTime: null
        };
        this.currentStep = 'welcome';
        this.isMobile = this.checkMobile();
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log('Elite Chatbot initialized - Mobile:', this.isMobile);
    }

    checkMobile() {
        return window.innerWidth <= 768;
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

        // Package selection from join page - FIXED FOR MOBILE
        document.addEventListener('click', (e) => {
            if (e.target.closest('.membership-plan .btn')) {
                const planElement = e.target.closest('.membership-plan');
                const planTitle = planElement.querySelector('.plan-title').textContent;
                this.handlePackageSelection(planTitle);
                
                // PREVENT DEFAULT BEHAVIOR
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });

        // Hide keyboard when clicking outside input
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.chatbot-input') && !e.target.closest('#chatbot-input')) {
                this.hideKeyboard();
            }
        });
    }

    toggleChat() {
        const container = document.getElementById('chatbot-container');
        const isOpening = container.style.display !== 'flex';
        
        container.style.display = isOpening ? 'flex' : 'none';
        
        if (isOpening) {
            // Don't auto-focus on mobile to prevent keyboard popup
            if (!this.isMobile) {
                document.getElementById('chatbot-input').focus();
            }
            // If opening fresh (not from package click), show welcome
            if (!this.userData.selectedPackage) {
                this.showWelcomeMessage();
            }
        } else {
            this.hideKeyboard();
        }
    }

    closeChat() {
        document.getElementById('chatbot-container').style.display = 'none';
        this.hideKeyboard();
    }

    hideKeyboard() {
        document.getElementById('chatbot-input').blur();
    }

    showInput(show = true) {
        const inputArea = document.querySelector('.chatbot-input');
        if (show) {
            inputArea.classList.add('active');
            // Only focus on desktop to avoid mobile keyboard popup
            if (!this.isMobile) {
                setTimeout(() => {
                    document.getElementById('chatbot-input').focus();
                }, 300);
            }
        } else {
            inputArea.classList.remove('active');
            this.hideKeyboard();
        }
    }

    // FIXED: Handle package selection with FORCE OPEN on mobile
    handlePackageSelection(packageName) {
        console.log('Package selected:', packageName);
        
        this.userData.selectedPackage = packageName;
        
        // FORCE OPEN CHATBOT - ESPECIALLY ON MOBILE
        const container = document.getElementById('chatbot-container');
        container.style.display = 'flex';
        
        // Clear any existing messages
        document.getElementById('chatbot-messages').innerHTML = '';
        this.clearQuickActions();
        
        // Small delay to ensure chatbot is open
        setTimeout(() => {
            this.showPackageConfirmation();
        }, 100);
    }

    // FLOW 1: Welcome (Standalone chatbot)
    showWelcomeMessage() {
        this.addMessage('bot', `Hi! I'm Elite Assistant! 🏋️‍♂️\nWhat can I help you with today?`);
        this.showQuickActions(['Choose Membership Package', 'Ask Questions', 'Book Gym Tour']);
        this.currentStep = 'welcome';
        this.showInput(false); // Hide input initially
    }

    // FLOW 2: Package already selected (from join page)
    showPackageConfirmation() {
        const priceInfo = this.getPackagePrice(this.userData.selectedPackage);
        
        this.addMessage('bot', `🎯 **Great Choice!**\n\nYou selected: **${this.userData.selectedPackage}**\n\n${priceInfo}\n\n*Includes full gym access & premium facilities*`);
        
        setTimeout(() => {
            this.addMessage('bot', `Ready to book your gym tour and proceed with this plan?`);
            
            this.showActionButtons([
                { 
                    text: '✅ Yes, Book Tour & Continue', 
                    action: () => this.startBookingFlow() 
                },
                { 
                    text: '🔄 Choose Different Plan', 
                    action: () => this.showPackageSelection() 
                }
            ]);
        }, 800);
        
        this.currentStep = 'package_confirmation';
        this.showInput(false);
    }

    // Package selection inside chatbot
    showPackageSelection() {
        this.userData.selectedPackage = null;
        this.addMessage('bot', `📋 **Choose Your Membership Package:**\n\nSelect the plan that fits your goals:`);
        
        const packages = [
            { name: 'GENERAL', price: 'R350/month', desc: 'Full gym access' },
            { name: 'STUDENT', price: 'R200/month', desc: 'Student discount' },
            { name: 'DEBIT ORDER', price: 'R250/month', desc: 'Monthly debit' },
            { name: 'PENSIONER', price: 'R250/month', desc: 'Senior rate' },
            { name: '6 MONTH PACKAGE', price: 'R1,500 once-off', desc: 'Best value' },
            { name: 'FAMILY PACKAGE', price: 'R800/month', desc: '4+ members' }
        ];
        
        this.showActionButtons(packages.map(pkg => ({
            text: `${pkg.name}\n${pkg.price} • ${pkg.desc}`,
            action: () => this.selectPackageInChat(pkg.name)
        })));
        
        this.showInput(false);
    }

    selectPackageInChat(packageName) {
        this.userData.selectedPackage = packageName;
        this.addMessage('user', `I choose ${packageName}`);
        this.showPackageConfirmation();
    }

    getPackagePrice(packageName) {
        const prices = {
            'STUDENT': '💰 **First Payment:** R600\n(R200/month + R400 joining fee)',
            'GENERAL': '💰 **First Payment:** R750\n(R350/month + R400 joining fee)',
            'DEBIT ORDER': '💰 **First Payment:** R650\n(R250/month + R400 joining fee)',
            'PENSIONER': '💰 **First Payment:** R650\n(R250/month + R400 joining fee)',
            '6 MONTH PACKAGE': '💰 **Total:** R1,500\n(6 months access - no joining fee)',
            'FAMILY PACKAGE': '💰 **First Payment:** R1,200\n(R800/month + R400 joining fee)',
            'DAY PASS': '💰 **Day Pass:** R50\n(Single day access)'
        };
        
        return prices[packageName] || 'Contact for pricing';
    }

    // SIMPLIFIED Booking flow - NO EMAIL
    startBookingFlow() {
        this.addMessage('user', 'Yes, book tour and continue');
        this.addMessage('bot', `🎉 **Perfect!** Let's get you booked for a tour.`);
        
        setTimeout(() => {
            this.askForName();
        }, 1000);
    }

    askForName() {
        setTimeout(() => {
            this.addMessage('bot', `👤 **What's your full name?**\n\n*We'll use this for your booking confirmation*`);
            this.currentStep = 'awaiting_name';
            this.clearQuickActions();
            this.showInput(true); // Show input for name
        }, 800);
    }

    askForTourTime() {
        setTimeout(() => {
            this.addMessage('bot', `🕒 **Choose Your Preferred Tour Time:**\n\nSelect when you'd like to visit us:`);
            
            const tourTimes = [
                { time: '🌅 Morning Tour\nMon-Fri: 5:00 AM - 12:00 PM', type: 'Morning' },
                { time: '☀️ Afternoon Tour\nMon-Fri: 12:00 PM - 5:00 PM', type: 'Afternoon' },
                { time: '🌙 Evening Tour\nMon-Thu: 5:00 PM - 9:00 PM', type: 'Evening' },
                { time: '📅 Weekend Tour\nSat: 6AM-4PM • Sun: 6AM-2PM', type: 'Weekend' }
            ];
            
            this.showActionButtons(tourTimes.map(tour => ({
                text: tour.time,
                action: () => this.selectTourTime(tour.type)
            })));
            
            this.currentStep = 'awaiting_tour_time';
            this.showInput(false);
        }, 800);
    }

    selectTourTime(tourTime) {
        this.userData.tourTime = tourTime;
        this.addMessage('user', `I choose ${tourTime} tour`);
        this.showBookingSummary();
    }

    showBookingSummary() {
        setTimeout(() => {
            this.addMessage('bot', `✅ **Booking Confirmed!**\n\nHere's your tour booking summary:`);
            
            const summaryHTML = `
                <div class="booking-summary">
                    <div class="summary-item">
                        <span class="summary-label">Name:</span>
                        <span class="summary-value">${this.userData.name}</span>
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
                        <span class="summary-value">Spark Lifestyle Centre</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Address:</span>
                        <span class="summary-value">98 Cannon Ave, Overport</span>
                    </div>
                </div>
            `;
            
            // Create a temporary div to insert HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = summaryHTML;
            document.getElementById('chatbot-messages').appendChild(tempDiv);
            
            setTimeout(() => {
                this.addMessage('bot', `📱 **Ready to send this to our team?**\n\nWe'll create a WhatsApp message with your booking details.`);
                
                this.showActionButtons([
                    { 
                        text: '💬 Send via WhatsApp', 
                        action: () => this.sendToWhatsApp() 
                    },
                    { 
                        text: '✏️ Edit Details', 
                        action: () => this.restartBookingFlow() 
                    }
                ]);
            }, 1000);
            
            this.showInput(false);
        }, 800);
    }

    sendToWhatsApp() {
        const message = this.createWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        
        this.addMessage('user', 'Send via WhatsApp');
        this.addMessage('bot', `📲 **Opening WhatsApp...**\n\nYour booking details are ready to send!`);
        
        setTimeout(() => {
            window.open(`https://wa.me/27655172764?text=${encodedMessage}`, '_blank');
            this.resetChatbot();
        }, 1500);
    }

    createWhatsAppMessage() {
        return `Hi Elite Health Club! 

I'd like to book a gym tour:

👤 Name: ${this.userData.name}
📦 Package: ${this.userData.selectedPackage}
🕒 Tour Time: ${this.userData.tourTime}

Please confirm my booking!`;
    }

    restartBookingFlow() {
        this.userData.name = '';
        this.userData.tourTime = null;
        this.askForName();
    }

    resetChatbot() {
        this.userData = {
            name: '',
            selectedPackage: null,
            tourTime: null
        };
        this.currentStep = 'welcome';
        
        setTimeout(() => {
            this.addMessage('bot', `💪 **Is there anything else I can help you with?**`);
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
                this.showInput(false); // Hide input after name
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
            this.addMessage('bot', '👋 **Hello!** Welcome to Elite Health Club!\n\nHow can I help you today? 🏋️‍♂️');
        } else if (lowerMessage.includes('package') || lowerMessage.includes('membership')) {
            this.showPackageSelection();
        } else if (lowerMessage.includes('tour') || lowerMessage.includes('book') || lowerMessage.includes('visit')) {
            this.userData.selectedPackage = 'General';
            this.startBookingFlow();
        } else if (lowerMessage.includes('hour') || lowerMessage.includes('open')) {
            this.addMessage('bot', `🕒 **Operating Hours:**\n\n• Mon-Thu: 5:00 AM - 9:00 PM\n• Friday: 5:00 AM - 8:00 PM\n• Saturday: 6:00 AM - 4:00 PM\n• Sunday: 6:00 AM - 2:00 PM\n• Public Holidays: 6:00 AM - 2:00 PM`);
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            this.addMessage('bot', `💰 **Membership Pricing:**\n\n• Student: R200/month\n• General: R350/month  \n• Debit: R250/month\n• Pensioner: R250/month\n• 6-Month: R1,500 once-off\n• Family: R800/month\n\n➕ R400 joining fee for all new members`);
        } else if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
            this.addMessage('bot', `📍 **Location:**\n\nElite Health Club\nLevel 3 – The Spark Lifestyle Centre\n98 Cannon Avenue, Overport\nDurban, South Africa\n\nEasy to find! 🗺️`);
        } else {
            this.addMessage('bot', `🤔 **I'm here to help!**\n\nYou can ask me about:\n• Membership packages & pricing\n• Booking gym tours  \n• Operating hours\n• Location & facilities\n\nOr use the buttons below! 💪`);
            this.showQuickActions(['Choose Membership Package', 'Ask Questions', 'Book Gym Tour']);
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
        
        this.showInput(false);
    }

    showActionButtons(actions) {
        const actionsContainer = document.getElementById('chatbot-actions');
        actionsContainer.innerHTML = '';
        
        actions.forEach(item => {
            const button = document.createElement('button');
            const isPackage = item.text.includes('GENERAL') || item.text.includes('STUDENT') || item.text.includes('DEBIT') || item.text.includes('PENSIONER') || item.text.includes('6 MONTH') || item.text.includes('FAMILY');
            const isBooking = item.text.includes('Tour') || item.text.includes('Morning') || item.text.includes('Afternoon') || item.text.includes('Evening') || item.text.includes('Weekend');
            
            if (isPackage) {
                button.className = 'quick-action package-option';
            } else if (isBooking) {
                button.className = 'quick-action booking-option';
            } else {
                button.className = 'quick-action';
            }
            
            button.innerHTML = item.text.replace(/\n/g, '<br>');
            button.onclick = item.action;
            actionsContainer.appendChild(button);
        });
        
        this.showInput(false);
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
                this.addMessage('bot', `❓ **Ask me anything!**\n\nI can help with:\n• Membership information\n• Pricing & packages\n• Operating hours\n• Location & facilities\n• Booking process\n\nWhat would you like to know?`);
                this.showInput(true);
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
        messageDiv.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Clear quick actions after user message
        if (sender === 'user') {
            this.clearQuickActions();
        }
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.eliteChatbot = new EliteChatbot();
});
// ===== END CHATBOT =====
