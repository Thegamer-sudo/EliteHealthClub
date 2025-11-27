// ===== ELITE HEALTH CLUB - EMERGENCY BUG FIX =====

// Elite Chatbot Class - COMPLETELY REWRITTEN
class EliteChatbot {
    constructor() {
        this.userData = {
            name: '',
            selectedPackage: null,
            tourTime: null,
            branch: null
        };
        this.currentStep = 'welcome';
        this.isMobile = window.innerWidth <= 768;
        this.hasShownPackageMessage = false;
        this.isInitialized = false;
        
        console.log('Chatbot constructor called');
        this.init();
    }

    init() {
        console.log('Chatbot init started');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
            });
        } else {
            // DOM already ready, setup immediately
            setTimeout(() => {
                this.setupEventListeners();
            }, 100);
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        
        // CHATBOT TOGGLE BUTTON - FIXED
        const toggleBtn = document.getElementById('chatbot-toggle');
        if (toggleBtn) {
            console.log('Toggle button found');
            toggleBtn.addEventListener('click', (e) => {
                console.log('Toggle button clicked');
                e.stopPropagation();
                this.toggleChat();
            });
        } else {
            console.error('Toggle button NOT found!');
        }

        // CHATBOT CLOSE BUTTON
        const closeBtn = document.getElementById('chatbot-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeChat();
            });
        }

        // SEND BUTTON
        const sendBtn = document.getElementById('chatbot-send');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // INPUT FIELD ENTER KEY
        const inputField = document.getElementById('chatbot-input');
        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // PACKAGE SELECTION FROM PAGE
        document.addEventListener('click', (e) => {
            if (e.target.closest('.membership-plan .btn')) {
                console.log('Package button clicked');
                const planElement = e.target.closest('.membership-plan');
                const planTitle = planElement.querySelector('.plan-title').textContent.trim();
                const branch = this.detectBranchFromPage();
                this.handlePackageSelection(planTitle, branch);
            }
        });

        this.isInitialized = true;
        console.log('Event listeners setup complete');
    }

    detectBranchFromPage() {
        const activePricing = document.querySelector('.branch-pricing.active');
        if (activePricing && activePricing.id === 'merebank-pricing') {
            return 'MEREBANK';
        }
        return 'OVERPORT';
    }

    toggleChat() {
        console.log('toggleChat called');
        const container = document.getElementById('chatbot-container');
        if (!container) {
            console.error('Chatbot container not found!');
            return;
        }
        
        const isOpening = container.style.display !== 'flex';
        console.log('Is opening:', isOpening);
        
        container.style.display = isOpening ? 'flex' : 'none';
        
        if (isOpening) {
            console.log('Opening chatbot');
            // Focus on input for desktop
            if (!this.isMobile) {
                setTimeout(() => {
                    const input = document.getElementById('chatbot-input');
                    if (input) input.focus();
                }, 300);
            }
            // Show welcome message if no package selected
            if (!this.userData.selectedPackage) {
                console.log('Showing welcome message');
                this.showWelcomeMessage();
            }
        } else {
            console.log('Closing chatbot');
            this.hideKeyboard();
        }
    }

    closeChat() {
        const container = document.getElementById('chatbot-container');
        if (container) {
            container.style.display = 'none';
        }
        this.hideKeyboard();
    }

    hideKeyboard() {
        const input = document.getElementById('chatbot-input');
        if (input) input.blur();
    }

    showInput(show = true) {
        const inputArea = document.querySelector('.chatbot-input');
        if (!inputArea) return;
        
        if (show) {
            inputArea.classList.add('active');
            if (!this.isMobile) {
                setTimeout(() => {
                    const input = document.getElementById('chatbot-input');
                    if (input) input.focus();
                }, 300);
            }
        } else {
            inputArea.classList.remove('active');
            this.hideKeyboard();
        }
    }

    handlePackageSelection(packageName, branch = null) {
        console.log('handlePackageSelection:', packageName, branch);
        
        // CRITICAL FIX: Reset flag FIRST
        this.hasShownPackageMessage = false;
        
        this.userData.selectedPackage = packageName;
        this.userData.branch = branch || this.detectBranchFromPage();
        
        // Open chatbot
        const container = document.getElementById('chatbot-container');
        if (container) {
            container.style.display = 'flex';
        }
        
        // Clear messages
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
        this.clearQuickActions();
        
        // Show confirmation after short delay
        setTimeout(() => {
            this.showPackageConfirmation();
        }, 200);
    }

    showWelcomeMessage() {
        console.log('showWelcomeMessage called');
        this.addMessage('bot', `Hi! I'm Elite Assistant!\nWhat can I help you with today?`);
        this.showQuickActions(['Choose Membership Package', 'Ask Questions', 'Book Gym Tour']);
        this.currentStep = 'welcome';
        this.showInput(false);
    }

    showPackageConfirmation() {
        console.log('showPackageConfirmation called, flag:', this.hasShownPackageMessage);
        
        // CRITICAL FIX: Prevent double execution
        if (this.hasShownPackageMessage) {
            console.log('BLOCKED: Already showed package confirmation');
            return;
        }
        
        // Set flag IMMEDIATELY
        this.hasShownPackageMessage = true;
        console.log('Setting flag to true');
        
        const priceInfo = this.getPackagePrice(this.userData.selectedPackage, this.userData.branch);
        const cleanPackageName = this.userData.selectedPackage.replace(' - OVERPORT', '').replace(' - MEREBANK', '');
        
        this.addMessage('bot', `**Great Choice!**\n\nYou selected: **${cleanPackageName}**\n\n${priceInfo}\n\nReady to book your gym tour?`);
        
        this.showActionButtons([
            { text: 'Yes, Book Tour', action: () => this.startBookingFlow() },
            { text: 'Choose Different Plan', action: () => this.showBranchSelection() }
        ]);
        
        this.currentStep = 'package_confirmation';
        this.showInput(false);
    }

    showBranchSelection() {
        this.hasShownPackageMessage = false;
        this.userData.selectedPackage = null;
        this.userData.branch = null;
        
        this.addMessage('bot', `**Choose Your Branch:**`);
        
        this.showActionButtons([
            { text: 'Overport Branch', action: () => this.showOverportPackages() },
            { text: 'Merebank Plaza', action: () => this.showMerebankPackages() }
        ]);
    }

    showOverportPackages() {
        this.hasShownPackageMessage = false;
        this.userData.branch = 'OVERPORT';
        this.addMessage('user', 'Overport Branch');
        this.addMessage('bot', `**Overport Branch Packages:**`);
        
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
            action: () => this.selectPackageInChat(`${pkg.name} - OVERPORT`)
        })));
    }

    showMerebankPackages() {
        this.hasShownPackageMessage = false;
        this.userData.branch = 'MEREBANK';
        this.addMessage('user', 'Merebank Plaza');
        this.addMessage('bot', `**Merebank Plaza Packages:**`);
        
        const packages = [
            { name: 'GENERAL', price: 'R300/month' },
            { name: 'DEBIT ORDER', price: 'R200/month' },
            { name: 'STUDENT', price: 'R150/month' },
            { name: '6 MONTH PACKAGE', price: 'R1,200 once-off' },
            { name: 'FAMILY PACKAGE', price: 'R600/month' }
        ];
        
        this.showActionButtons(packages.map(pkg => ({
            text: `${pkg.name} - ${pkg.price}`,
            action: () => this.selectPackageInChat(`${pkg.name} - MEREBANK`)
        })));
    }

    selectPackageInChat(packageName) {
        this.hasShownPackageMessage = false;
        const branch = packageName.includes('MEREBANK') ? 'MEREBANK' : 'OVERPORT';
        this.userData.selectedPackage = packageName;
        this.userData.branch = branch;
        
        const cleanPackageName = packageName.replace(' - OVERPORT', '').replace(' - MEREBANK', '');
        this.addMessage('user', `${cleanPackageName}`);
        
        setTimeout(() => {
            this.showPackageConfirmation();
        }, 100);
    }

    getPackagePrice(packageName, branch = 'OVERPORT') {
        const overportPrices = {
            'STUDENT': '**First Payment:** R600\n(R200/month + R400 joining fee)',
            'GENERAL': '**First Payment:** R750\n(R350/month + R400 joining fee)',
            'DEBIT ORDER': '**First Payment:** R650\n(R250/month + R400 joining fee)',
            'PENSIONER': '**First Payment:** R650\n(R250/month + R400 joining fee)',
            '6 MONTH PACKAGE': '**Total:** R1,500\n(6 months - no joining fee)',
            'FAMILY PACKAGE': '**First Payment:** R1,200\n(R800/month + R400 joining fee)',
            'DAY PASS': '**Day Pass:** R50'
        };
        
        const merebankPrices = {
            'GENERAL': '**First Payment:** R400\n(R300/month + R100 card fee)',
            'DEBIT ORDER': '**First Payment:** R300\n(R200/month + R100 card fee)',
            'STUDENT': '**First Payment:** R250\n(R150/month + R100 card fee)',
            '6 MONTH PACKAGE': '**Total:** R1,300\n(R1,200 + R100 card fee)',
            'FAMILY PACKAGE': '**First Payment:** R700\n(R600/month + R100 card fee)',
            'DAY PASS': '**Day Pass:** R50'
        };

        const cleanPackageName = packageName.replace(' - OVERPORT', '').replace(' - MEREBANK', '');
        
        if (branch === 'MEREBANK') {
            return merebankPrices[cleanPackageName] || 'Contact for pricing';
        } else {
            return overportPrices[cleanPackageName] || 'Contact for pricing';
        }
    }

    startBookingFlow() {
        this.addMessage('user', 'Yes, book tour');
        this.addMessage('bot', `**Perfect!** Let's get you booked.`);
        
        setTimeout(() => {
            this.askForName();
        }, 800);
    }

    askForName() {
        this.addMessage('bot', `**What's your full name?**`);
        this.currentStep = 'awaiting_name';
        this.clearQuickActions();
        this.showInput(true);
        this.forceScrollToBottom();
    }

    forceScrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    }

    askForTourTime() {
        this.addMessage('bot', `**Choose tour time:**`);
        
        const tourTimes = [
            { time: 'Morning (Mon-Fri: 5AM-12PM)', type: 'Morning' },
            { time: 'Afternoon (Mon-Fri: 12PM-5PM)', type: 'Afternoon' },
            { time: 'Evening (Mon-Thu: 5PM-9PM)', type: 'Evening' },
            { time: 'Weekend (Sat 6AM-4PM, Sun 6AM-2PM)', type: 'Weekend' }
        ];
        
        this.showActionButtons(tourTimes.map(tour => ({
            text: tour.time,
            action: () => this.selectTourTime(tour.type)
        })));
        
        this.currentStep = 'awaiting_tour_time';
        this.showInput(false);
        this.forceScrollToBottom();
    }

    selectTourTime(tourTime) {
        this.userData.tourTime = tourTime;
        this.addMessage('user', `${tourTime} tour`);
        this.showBookingSummary();
    }

    showBookingSummary() {
        this.addMessage('bot', `**Booking Confirmed!**`);
        
        const location = this.userData.branch === 'MEREBANK' 
            ? 'Merebank Plaza, 50 Bombay Walk, Merebank' 
            : 'Spark Lifestyle Centre, 98 Cannon Avenue, Overport';
        
        const cleanPackageName = this.userData.selectedPackage.replace(' - OVERPORT', '').replace(' - MEREBANK', '');
        
        const summaryHTML = `
            <div class="booking-summary">
                <div class="summary-item">
                    <span class="summary-label">Name:</span>
                    <span class="summary-value">${this.userData.name}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Package:</span>
                    <span class="summary-value">${cleanPackageName}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Location:</span>
                    <span class="summary-value">${location}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Tour Time:</span>
                    <span class="summary-value">${this.userData.tourTime}</span>
                </div>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = summaryHTML;
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) messagesContainer.appendChild(tempDiv);
        
        setTimeout(() => {
            this.addMessage('bot', `**Ready to send to WhatsApp?**`);
            
            this.showActionButtons([
                { text: 'Send via WhatsApp', action: () => this.sendToWhatsApp() },
                { text: 'Edit Details', action: () => this.restartBookingFlow() }
            ]);
            this.forceScrollToBottom();
        }, 800);
    }

    sendToWhatsApp() {
        const message = this.createWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        
        this.addMessage('user', 'Send via WhatsApp');
        this.addMessage('bot', `**Opening WhatsApp...**`);
        
        setTimeout(() => {
            window.open(`https://wa.me/27655172764?text=${encodedMessage}`, '_blank');
            this.resetChatbot();
        }, 1500);
    }

    createWhatsAppMessage() {
        const location = this.userData.branch === 'MEREBANK' 
            ? 'Merebank Plaza, 50 Bombay Walk, Merebank' 
            : 'Spark Lifestyle Centre, 98 Cannon Avenue, Overport';
            
        const cleanPackageName = this.userData.selectedPackage.replace(' - OVERPORT', '').replace(' - MEREBANK', '');
            
        return `Hi Elite Health Club! 

I'd like to book a gym tour:

Name: ${this.userData.name}
Package: ${cleanPackageName}
Location: ${location}
Tour Time: ${this.userData.tourTime}

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
            tourTime: null,
            branch: null
        };
        this.hasShownPackageMessage = false;
        this.currentStep = 'welcome';
        
        setTimeout(() => {
            this.addMessage('bot', `**Anything else I can help with?**`);
            this.showQuickActions(['Choose Membership Package', 'Ask Questions', 'Book Gym Tour']);
            this.forceScrollToBottom();
        }, 2000);
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        if (!input) return;
        
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
                this.showInput(false);
                this.askForTourTime();
                break;
            default:
                this.handleAIResponse(message);
                break;
        }
    }

    handleAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            this.addMessage('bot', '**Hello!** Welcome to Elite Health Club!');
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            this.addMessage('bot', `**Membership Pricing:**\n\n• Overport Branch:\n  - Student: R200/month\n  - General: R350/month\n  - Debit: R250/month\n  - Pensioner: R250/month\n  - 6-Month: R1,500 once-off\n  - Family: R800/month\n  + R400 joining fee\n\n• Merebank Branch:\n  - General: R300/month\n  - Debit: R200/month\n  - Student: R150/month\n  - 6-Month: R1,200 once-off\n  - Family: R600/month\n  + R100 card fee`);
        } else if (lowerMessage.includes('hour') || lowerMessage.includes('open')) {
            this.addMessage('bot', `**Operating Hours:**\n\n• Mon-Thu: 5:00 AM - 9:00 PM\n• Friday: 5:00 AM - 8:00 PM\n• Saturday: 6:00 AM - 4:00 PM\n• Sunday: 6:00 AM - 2:00 PM`);
        } else if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
            this.addMessage('bot', `**Locations:**\n\n• Overport Branch:\n  Level 3 – The Spark Lifestyle Centre\n  98 Cannon Avenue, Overport, Durban\n\n• Merebank Branch:\n  Merebank Plaza\n  50 Bombay Walk, Merebank, Durban`);
        } else if (lowerMessage.includes('trainer') || lowerMessage.includes('coach')) {
            this.addMessage('bot', `**Our Trainers:**\n\nWe have certified trainers to help you reach your fitness goals! They can create personalized workout plans and provide guidance.`);
        } else if (lowerMessage.includes('equipment') || lowerMessage.includes('machine')) {
            this.addMessage('bot', `**Equipment:**\n\nWe have state-of-the-art equipment:\n• Cardio machines\n• Weight training\n• Functional training area\n• Free weights\n• And more!`);
        } else {
            this.addMessage('bot', `I'm here to help with memberships, tours, and gym info! Try asking about pricing, hours, or book a tour.`);
        }
        
        this.showQuickActions(['Choose Membership Package', 'Ask Questions', 'Book Gym Tour']);
        this.forceScrollToBottom();
    }

    showQuickActions(actions) {
        const actionsContainer = document.getElementById('chatbot-actions');
        if (!actionsContainer) return;
        
        actionsContainer.innerHTML = '';
        actions.forEach(actionText => {
            const button = document.createElement('button');
            button.className = 'quick-action';
            button.textContent = actionText;
            button.onclick = () => this.handleQuickAction(actionText);
            actionsContainer.appendChild(button);
        });
        
        this.showInput(false);
        this.forceScrollToBottom();
    }

    showActionButtons(actions) {
        const actionsContainer = document.getElementById('chatbot-actions');
        if (!actionsContainer) return;
        
        actionsContainer.innerHTML = '';
        actions.forEach(item => {
            const button = document.createElement('button');
            button.className = 'quick-action';
            button.innerHTML = item.text.replace(/\n/g, '<br>');
            button.onclick = item.action;
            actionsContainer.appendChild(button);
        });
        
        this.forceScrollToBottom();
    }

    clearQuickActions() {
        const actionsContainer = document.getElementById('chatbot-actions');
        if (actionsContainer) actionsContainer.innerHTML = '';
    }

    handleQuickAction(action) {
        switch(action) {
            case 'Choose Membership Package':
                this.showBranchSelection();
                break;
            case 'Ask Questions':
                this.addMessage('user', 'I have questions');
                this.addMessage('bot', `**Ask me anything!**\n\nI can help with:\n• Membership & pricing\n• Operating hours\n• Location & facilities\n• Booking tours\n\nWhat would you like to know?`);
                this.showInput(true);
                this.forceScrollToBottom();
                break;
            case 'Book Gym Tour':
                this.userData.selectedPackage = 'General - OVERPORT';
                this.userData.branch = 'OVERPORT';
                this.startBookingFlow();
                break;
        }
    }

    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        if (sender === 'user') this.clearQuickActions();
        this.forceScrollToBottom();
    }
}

// SIMPLE INITIALIZATION - NO COMPLEX TIMING
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing chatbot');
    window.eliteChatbot = new EliteChatbot();
});

// Fallback initialization
window.addEventListener('load', function() {
    console.log('Window loaded');
    if (!window.eliteChatbot) {
        console.log('Fallback: Initializing chatbot');
        window.eliteChatbot = new EliteChatbot();
    }
});
