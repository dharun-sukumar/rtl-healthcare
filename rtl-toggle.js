// RTL Toggle functionality for WellCare Health & Wellness website

document.addEventListener('DOMContentLoaded', function() {
    initializeRTLToggle();
});

function initializeRTLToggle() {
    const rtlToggle = document.getElementById('rtlToggle');
    const htmlElement = document.documentElement;
    
    if (!rtlToggle) return;
    
    // Load saved direction preference
    const savedDirection = localStorage.getItem('wellcare-direction') || 'ltr';
    setDirection(savedDirection);
    
    // Toggle button click handler
    rtlToggle.addEventListener('click', function() {
        const currentDirection = htmlElement.getAttribute('dir') || 'ltr';
        const newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';
        setDirection(newDirection);
        
        // Save preference
        localStorage.setItem('wellcare-direction', newDirection);
        
        // Show notification
        const message = newDirection === 'rtl' ? 
            'Direction switched' : 
            'Direction switched';
        showDirectionChangeNotification(message);
    });
    
    function setDirection(direction) {
        htmlElement.setAttribute('dir', direction);
        htmlElement.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en');
        document.body.setAttribute('dir', direction);
        
        // Update toggle button text
        rtlToggle.textContent = direction === 'ltr' ? 'RTL' : 'RTL';
        
        // Update body class for additional styling
        document.body.className = document.body.className.replace(/\b(ltr|rtl)\b/g, '');
        document.body.classList.add(direction);
        
        // Update all major containers
        updateContainerDirection(direction);
        
        // Update navigation alignment
        updateNavigationAlignment(direction);
        
        // Update form placeholders if needed
        updateFormPlaceholders(direction);
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('directionChange', {
            detail: { direction }
        }));
    }
    
    function updateContainerDirection(direction) {
        // Update all containers and major layout elements
        const containers = document.querySelectorAll('.container, .nav-container, .hero, .main-content, .footer, .dashboard-content, .admin-dashboard');
        containers.forEach(container => {
            container.setAttribute('dir', direction);
        });
        
        // Update all cards and content areas
        const contentAreas = document.querySelectorAll('.card, .service-card, .feature-card-modern, .dashboard-card, .admin-card, .pricing-card, .testimonial-card');
        contentAreas.forEach(area => {
            area.setAttribute('dir', direction);
        });
        
        // Update all form elements
        const forms = document.querySelectorAll('form, .form-group, .form-step');
        forms.forEach(form => {
            form.setAttribute('dir', direction);
        });
    }
    
    function updateNavigationAlignment(direction) {
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navbar) navbar.setAttribute('dir', direction);
        if (navContainer) navContainer.setAttribute('dir', direction);
        if (navMenu) navMenu.setAttribute('dir', direction);
        
        // Update dropdown positioning
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.setAttribute('dir', direction);
            if (direction === 'rtl') {
                dropdown.style.left = 'auto';
                dropdown.style.right = '0';
            } else {
                dropdown.style.left = '0';
                dropdown.style.right = 'auto';
            }
        });
    }
    
    function updateFormPlaceholders(direction) {
        const placeholders = {
            'ltr': {
                'أدخل عنوان بريدك الإلكتروني': 'Enter your email address',
                'أدخل اسمك الأول': 'Enter your first name',
                'أدخل اسمك الأخير': 'Enter your last name',
                'أدخل رقم هاتفك': 'Enter your phone number',
                'أدخل رسالتك': 'Enter your message',
                'يرجى وصف استفسارك': 'Please describe your inquiry or how we can help you...',
                'يرجى وصف سبب زيارتك': 'Please describe the reason for your visit or any specific concerns...'
            },
            'rtl': {
                'Enter your email address': 'أدخل عنوان بريدك الإلكتروني',
                'Enter your first name': 'أدخل اسمك الأول',
                'Enter your last name': 'أدخل اسمك الأخير',
                'Enter your phone number': 'أدخل رقم هاتفك',
                'Enter your message': 'أدخل رسالتك',
                'Please describe your inquiry or how we can help you...': 'يرجى وصف استفسارك أو كيف يمكننا مساعدتك...',
                'Please describe the reason for your visit or any specific concerns...': 'يرجى وصف سبب زيارتك أو أي مخاوف محددة...'
            }
        };
        
        const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach(input => {
            const currentPlaceholder = input.getAttribute('placeholder');
            const translations = placeholders[direction];
            
            // Find matching placeholder and update
            Object.keys(translations).forEach(key => {
                if (currentPlaceholder && currentPlaceholder.includes(key)) {
                    input.setAttribute('placeholder', translations[key]);
                }
            });
        });
    }
    
    function showDirectionChangeNotification(message) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.direction-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'direction-notification';
        const currentDirection = htmlElement.getAttribute('dir') || 'ltr';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            ${currentDirection === 'rtl' ? 'left' : 'right'}: 20px;
            background: #059669;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            font-weight: 500;
            font-size: 14px;
            animation: slideIn 0.3s ease-out;
            direction: ${currentDirection};
        `;
        
        notification.textContent = message;
        
        // Add animation styles if not already present
        if (!document.querySelector('#direction-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'direction-animation-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(${currentDirection === 'rtl' ? '-' : ''}100%);
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
                        transform: translateX(${currentDirection === 'rtl' ? '-' : ''}100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
}

// Listen for direction changes from other components
window.addEventListener('directionChange', function(event) {
    const direction = event.detail.direction;
    
    // Update any dynamic content that needs direction-specific handling
    updateDynamicContent(direction);
    
    // Update charts or graphs if present
    updateChartsDirection(direction);
    
    // Update calendar components if present
    updateCalendarDirection(direction);
});

function updateDynamicContent(direction) {
    // Update any dynamically generated content
    const dynamicElements = document.querySelectorAll('[data-rtl-content]');
    dynamicElements.forEach(element => {
        const rtlContent = element.getAttribute('data-rtl-content');
        const ltrContent = element.getAttribute('data-ltr-content');
        
        if (direction === 'rtl' && rtlContent) {
            element.textContent = rtlContent;
        } else if (direction === 'ltr' && ltrContent) {
            element.textContent = ltrContent;
        }
    });
}

function updateChartsDirection(direction) {
    // Update chart libraries if present (Chart.js, etc.)
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = direction === 'rtl' ? 
            'Tahoma, Arial, sans-serif' : 
            'Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
    }
}

function updateCalendarDirection(direction) {
    // Update calendar components if present
    const calendars = document.querySelectorAll('.calendar, .date-picker, .date-grid, .time-grid');
    calendars.forEach(calendar => {
        calendar.setAttribute('dir', direction);
        
        // Update month/day names if needed
        if (direction === 'rtl') {
            calendar.classList.add('rtl-calendar');
        } else {
            calendar.classList.remove('rtl-calendar');
        }
    });
}

// Utility function to get current direction
function getCurrentDirection() {
    return document.documentElement.getAttribute('dir') || 'ltr';
}

// Utility function to check if RTL is active
function isRTL() {
    return getCurrentDirection() === 'rtl';
}

// Export utilities for use in other scripts
window.RTLUtils = {
    getCurrentDirection,
    isRTL,
    setDirection: function(direction) {
        const event = new CustomEvent('directionChange', {
            detail: { direction }
        });
        window.dispatchEvent(event);
    }
};

// Handle keyboard shortcuts for RTL toggle
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Shift + R to toggle RTL
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        const rtlToggle = document.getElementById('rtlToggle');
        if (rtlToggle) {
            rtlToggle.click();
        }
    }
});

// Handle browser back/forward navigation
window.addEventListener('popstate', function() {
    // Restore direction preference when navigating
    const savedDirection = localStorage.getItem('wellcare-direction') || 'ltr';
    const currentDirection = document.documentElement.getAttribute('dir') || 'ltr';
    
    if (savedDirection !== currentDirection) {
        document.documentElement.setAttribute('dir', savedDirection);
        document.documentElement.setAttribute('lang', savedDirection === 'rtl' ? 'ar' : 'en');
        document.body.setAttribute('dir', savedDirection);
        
        const rtlToggle = document.getElementById('rtlToggle');
        if (rtlToggle) {
            rtlToggle.textContent = savedDirection === 'ltr' ? 'RTL' : 'RTL';
        }
    }
});

// Initialize RTL on page load for all pages
window.addEventListener('load', function() {
    const savedDirection = localStorage.getItem('wellcare-direction') || 'ltr';
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    htmlElement.setAttribute('dir', savedDirection);
    htmlElement.setAttribute('lang', savedDirection === 'rtl' ? 'ar' : 'en');
    bodyElement.setAttribute('dir', savedDirection);
    bodyElement.classList.add(savedDirection);
    
    const rtlToggle = document.getElementById('rtlToggle');
    if (rtlToggle) {
        rtlToggle.textContent = savedDirection === 'ltr' ? 'RTL' : 'RTL';
    }
});

// Handle print styles for RTL
window.addEventListener('beforeprint', function() {
    const direction = getCurrentDirection();
    const printStyles = document.createElement('style');
    printStyles.id = 'print-rtl-styles';
    
    if (direction === 'rtl') {
        printStyles.textContent = `
            @media print {
                * {
                    direction: rtl !important;
                    text-align: right !important;
                }
                .container {
                    direction: rtl !important;
                }
            }
        `;
    }
    
    document.head.appendChild(printStyles);
});

window.addEventListener('afterprint', function() {
    const printStyles = document.getElementById('print-rtl-styles');
    if (printStyles) {
        printStyles.remove();
    }
});