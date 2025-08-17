// Main JavaScript functionality for WellCare Health & Wellness website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeAppointmentBooking();
    initializeContactForm();
    initializeLoginTabs();
    initializeCountdown();
    initializeDashboard();
    initializeNotificationForm();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Appointment booking functionality
function initializeAppointmentBooking() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (!appointmentForm) return;
    
    let currentStep = 1;
    const totalSteps = 4;
    
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Generate date options
    generateDateOptions();
    
    // Generate time slots
    generateTimeSlots();
    
    // Step navigation
    function showStep(step) {
        // Update step indicators
        steps.forEach((stepEl, index) => {
            stepEl.classList.toggle('active', index + 1 === step);
        });
        
        // Update form steps
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index + 1 === step);
        });
        
        // Update navigation buttons
        prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
        nextBtn.style.display = step === totalSteps ? 'none' : 'inline-flex';
        submitBtn.style.display = step === totalSteps ? 'inline-flex' : 'none';
        
        // Update appointment summary on last step
        if (step === totalSteps) {
            updateAppointmentSummary();
        }
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateCurrentStep()) {
                currentStep++;
                showStep(currentStep);
            }
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
        });
    }
    
    // Form submission
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateCurrentStep()) {
            // Simulate form submission
            showSuccessMessage('Appointment booked successfully! You will receive a confirmation email shortly.');
        }
    });
    
    // Service selection
    const serviceOptions = document.querySelectorAll('input[name="service"]');
    serviceOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Update time slots based on service type
            generateTimeSlots();
        });
    });
    
    function validateCurrentStep() {
        const currentFormStep = document.querySelector(`.form-step:nth-child(${currentStep})`);
        if (!currentFormStep) return true;
        
        const requiredFields = currentFormStep.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                field.style.borderColor = '#d1d5db';
            }
        });
        
        // Special validation for step 1 (service selection)
        if (currentStep === 1) {
            const selectedService = document.querySelector('input[name="service"]:checked');
            if (!selectedService) {
                showErrorMessage('Please select a service');
                return false;
            }
        }
        
        // Special validation for step 2 (date and time)
        if (currentStep === 2) {
            const selectedDate = document.querySelector('.date-option.selected');
            const selectedTime = document.querySelector('.time-option.selected');
            
            if (!selectedDate || !selectedTime) {
                showErrorMessage('Please select both date and time');
                return false;
            }
        }
        
        if (!isValid) {
            showErrorMessage('Please fill in all required fields');
        }
        
        return isValid;
    }
    
    function generateDateOptions() {
        const dateGrid = document.getElementById('dateGrid');
        if (!dateGrid) return;
        
        const today = new Date();
        const dates = [];
        
        // Generate next 14 days
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Skip Sundays
            if (date.getDay() !== 0) {
                dates.push(date);
            }
        }
        
        dateGrid.innerHTML = dates.map(date => {
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNumber = date.getDate();
            const monthName = date.toLocaleDateString('en-US', { month: 'short' });
            
            return `
                <div class="date-option" data-date="${date.toISOString().split('T')[0]}">
                    <div class="date-day">${dayName}</div>
                    <div class="date-number">${dayNumber}</div>
                    <div class="date-month">${monthName}</div>
                </div>
            `;
        }).join('');
        
        // Add click handlers
        dateGrid.querySelectorAll('.date-option').forEach(option => {
            option.addEventListener('click', function() {
                dateGrid.querySelectorAll('.date-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                generateTimeSlots();
            });
        });
    }
    
    function generateTimeSlots() {
        const timeGrid = document.getElementById('timeGrid');
        if (!timeGrid) return;
        
        const selectedDate = document.querySelector('.date-option.selected');
        if (!selectedDate) {
            timeGrid.innerHTML = '<p>Please select a date first</p>';
            return;
        }
        
        const timeSlots = [
            '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
            '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
        ];
        
        // Simulate some unavailable slots
        const unavailableSlots = ['09:00 AM', '02:00 PM', '04:00 PM'];
        
        timeGrid.innerHTML = timeSlots.map(time => {
            const isUnavailable = unavailableSlots.includes(time);
            return `
                <div class="time-option ${isUnavailable ? 'unavailable' : ''}" data-time="${time}">
                    ${time}
                </div>
            `;
        }).join('');
        
        // Add click handlers
        timeGrid.querySelectorAll('.time-option:not(.unavailable)').forEach(option => {
            option.addEventListener('click', function() {
                timeGrid.querySelectorAll('.time-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    function updateAppointmentSummary() {
        const summaryContainer = document.getElementById('appointmentSummary');
        if (!summaryContainer) return;
        
        const selectedService = document.querySelector('input[name="service"]:checked');
        const selectedDate = document.querySelector('.date-option.selected');
        const selectedTime = document.querySelector('.time-option.selected');
        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        
        if (!selectedService || !selectedDate || !selectedTime) return;
        
        const serviceText = selectedService.closest('.service-option').querySelector('h4').textContent;
        const servicePrice = selectedService.closest('.service-option').querySelector('.service-price').textContent;
        const dateText = new Date(selectedDate.dataset.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const timeText = selectedTime.dataset.time;
        
        summaryContainer.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Patient Name:</span>
                <span class="summary-value">${firstName} ${lastName}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Email:</span>
                <span class="summary-value">${email}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Phone:</span>
                <span class="summary-value">${phone}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Service:</span>
                <span class="summary-value">${serviceText}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Date:</span>
                <span class="summary-value">${dateText}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Time:</span>
                <span class="summary-value">${timeText}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Total Cost:</span>
                <span class="summary-value">${servicePrice}</span>
            </div>
        `;
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                field.style.borderColor = '#d1d5db';
            }
        });
        
        if (isValid) {
            showSuccessMessage('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
        } else {
            showErrorMessage('Please fill in all required fields');
        }
    });
}

// Login tabs functionality
function initializeLoginTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active form
            loginForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === targetTab + 'Login') {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Handle form submissions
    const patientLogin = document.getElementById('patientLogin');
    const adminLogin = document.getElementById('adminLogin');
    
    if (patientLogin) {
        patientLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate login
            showSuccessMessage('Login successful! Redirecting to patient portal...');
            setTimeout(() => {
                window.location.href = 'user-dashboard.html';
            }, 2000);
        });
    }
    
    if (adminLogin) {
        adminLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate login
            showSuccessMessage('Login successful! Redirecting to admin dashboard...');
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 2000);
        });
    }
}

// Countdown timer for coming soon page
function initializeCountdown() {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            countdown.innerHTML = '<div class="countdown-item"><div class="countdown-number">0</div><div class="countdown-label">Launch!</div></div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Dashboard functionality
function initializeDashboard() {
    // Simulate real-time updates for dashboard
    const isDashboard = document.querySelector('.dashboard-content') || document.querySelector('.admin-dashboard');
    if (!isDashboard) return;
    
    // Update timestamps
    updateTimestamps();
    setInterval(updateTimestamps, 60000); // Update every minute
    
    // Add click handlers for dashboard actions
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            showInfoMessage(`${action} feature coming soon!`);
        });
    });
    
    // Handle prescription refill buttons
    const refillBtns = document.querySelectorAll('.prescription-item .btn-primary');
    refillBtns.forEach(btn => {
        if (btn.textContent.includes('Refill')) {
            btn.addEventListener('click', function() {
                showSuccessMessage('Prescription refill request submitted successfully!');
                this.textContent = 'Requested';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline');
                this.disabled = true;
            });
        }
    });
    
    // Handle appointment reschedule buttons
    const reschedulebtns = document.querySelectorAll('.appointment-item .btn-outline');
    reschedulebtns.forEach(btn => {
        if (btn.textContent.includes('Reschedule')) {
            btn.addEventListener('click', function() {
                showInfoMessage('Redirecting to appointment booking...');
                setTimeout(() => {
                    window.location.href = 'book-appointment.html';
                }, 1500);
            });
        }
    });
}

// Notification form for coming soon page
function initializeNotificationForm() {
    const notifyForm = document.getElementById('notifyForm');
    if (!notifyForm) return;
    
    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('notifyEmail').value;
        if (email) {
            showSuccessMessage('Thank you! We\'ll notify you when these features are available.');
            notifyForm.reset();
        }
    });
}

// Utility functions
function updateTimestamps() {
    const timeElements = document.querySelectorAll('.message-time, .alert-time');
    timeElements.forEach(element => {
        // This would normally update with real timestamps
        // For demo purposes, we'll leave them as is
    });
}

function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showInfoMessage(message) {
    showNotification(message, 'info');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Intersection Observer for animations
function initializeAnimations() {
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
    
    // Observe elements that should animate in
    const animateElements = document.querySelectorAll('.service-card, .feature-card-modern, .testimonial-card, .dashboard-card, .admin-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers
        console.log('Page hidden');
    } else {
        // Page is visible, resume animations or timers
        console.log('Page visible');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    showSuccessMessage('Connection restored');
});

window.addEventListener('offline', function() {
    showErrorMessage('Connection lost. Some features may not work properly.');
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Enter key on service options
    if (e.key === 'Enter' && e.target.classList.contains('service-option')) {
        const radio = e.target.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change'));
        }
    }
});

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
        return null;
    }
}

// Export functions for use in other scripts
window.WellCareApp = {
    showSuccessMessage,
    showErrorMessage,
    showInfoMessage,
    validateEmail,
    validatePhone,
    saveToLocalStorage,
    loadFromLocalStorage
};