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
        
        // Update toggle button SVG (replace button content with SVG)
        rtlToggle.innerHTML = `<svg width="32" height="32" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve"><path fill="#000000" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 38,15.8333C 50.2423,15.8333 60.1667,25.7577 60.1667,38C 60.1667,50.2423 50.2423,60.1667 38,60.1667C 25.7577,60.1667 15.8333,50.2423 15.8333,38C 15.8333,25.7577 25.7577,15.8333 38,15.8333 Z M 19.065,36.4167L 25.3651,36.4167C 25.4708,33.796 25.8368,31.3011 26.4182,29.0106C 24.9471,28.4945 23.5896,27.8831 22.3719,27.1913C 20.5281,29.8522 19.3463,33.0068 19.065,36.4167 Z M 30.0541,20.7363C 27.8969,21.7308 25.9579,23.1177 24.3286,24.8056C 25.236,25.2756 26.2395,25.6989 27.3232,26.0677C 28.064,24.0419 28.9879,22.241 30.0541,20.7363 Z M 36.4167,36.4167L 36.4167,30.8432C 33.9463,30.7436 31.5878,30.4126 29.4069,29.8881C 28.9321,31.8962 28.6282,34.0974 28.5325,36.4167L 36.4167,36.4167 Z M 36.4167,19.2627C 33.9024,20.1063 31.7231,22.9251 30.2911,26.8939C 32.1894,27.3157 34.2515,27.5865 36.4167,27.6758L 36.4167,19.2627 Z M 56.9349,36.4167C 56.6536,33.0068 55.4719,29.8523 53.6281,27.1913C 52.4104,27.8831 51.0528,28.4946 49.5818,29.0107C 50.1631,31.3011 50.5291,33.796 50.6348,36.4167L 56.9349,36.4167 Z M 45.9459,20.7363C 47.012,22.241 47.9359,24.042 48.6767,26.0677C 49.7605,25.6989 50.7639,25.2756 51.6714,24.8056C 50.0421,23.1177 48.1031,21.7308 45.9459,20.7363 Z M 39.5833,36.4167L 47.4674,36.4167C 47.3718,34.0974 47.0678,31.8962 46.5931,29.8881C 44.4122,30.4126 42.0536,30.7436 39.5833,30.8432L 39.5833,36.4167 Z M 39.5833,19.2627L 39.5833,27.6758C 41.7484,27.5865 43.8106,27.3157 45.7088,26.8939C 44.2769,22.9251 42.0975,20.1064 39.5833,19.2627 Z M 56.9349,39.5834L 50.6348,39.5834C 50.5291,42.204 50.1631,44.6989 49.5818,46.9894C 51.0528,47.5055 52.4104,48.1169 53.6281,48.8087C 55.4719,46.1478 56.6536,42.9932 56.9349,39.5834 Z M 45.9459,55.2638C 48.1031,54.2692 50.0421,52.8823 51.6714,51.1944C 50.764,50.7244 49.7605,50.3011 48.6767,49.9323C 47.9359,51.9581 47.012,53.7591 45.9459,55.2638 Z M 39.5833,39.5834L 39.5833,45.1568C 42.0536,45.2564 44.4122,45.5874 46.5931,46.1119C 47.0678,44.1038 47.3718,41.9027 47.4675,39.5834L 39.5833,39.5834 Z M 39.5833,56.7373C 42.0975,55.8937 44.2769,53.075 45.7089,49.1061C 43.8106,48.6843 41.7484,48.4135 39.5833,48.3242L 39.5833,56.7373 Z M 19.065,39.5834C 19.3463,42.9932 20.5281,46.1478 22.3719,48.8087C 23.5896,48.1169 24.9471,47.5055 26.4182,46.9894C 25.8368,44.6989 25.4708,42.204 25.3651,39.5834L 19.065,39.5834 Z M 30.0541,55.2638C 28.988,53.7591 28.0641,51.9581 27.3232,49.9323C 26.2395,50.3011 25.236,50.7244 24.3286,51.1945C 25.9579,52.8823 27.8969,54.2693 30.0541,55.2638 Z M 36.4167,39.5834L 28.5325,39.5834C 28.6282,41.9027 28.9321,44.1039 29.4069,46.1119C 31.5878,45.5874 33.9463,45.2564 36.4167,45.1568L 36.4167,39.5834 Z M 36.4167,56.7373L 36.4167,48.3242C 34.2515,48.4135 32.1893,48.6843 30.2911,49.1061C 31.7231,53.075 33.9024,55.8937 36.4167,56.7373 Z"/></svg>`;
        
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