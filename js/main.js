// Main JavaScript file for EmpowerKids Platform
document.addEventListener('DOMContentLoaded', function() {
    // Initialize platform
    initializePlatform();
    
    // Setup navigation
    setupNavigation();
    
    // Setup animations
    setupAnimations();
    
    // Setup dark mode toggle
    setupDarkMode();
});

function initializePlatform() {
    console.log('EmpowerKids Platform Initialized');
    
    // Check if user is logged in
    checkAuthStatus();
    
    // Setup page-specific functionality
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'homepage.html':
        case '':
            setupHomepage();
            break;
        case 'quiz.html':
            setupQuiz();
            break;
        case 'corusesreal.html':
            setupCourses();
            break;
        default:
            console.log('Page loaded:', currentPage);
    }
}

function setupNavigation() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'homepage.html')) {
            link.classList.add('text-yellow-400', 'font-semibold');
        }
    });
}

function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function setupDarkMode() {
    const darkModeToggle = document.querySelector('[data-dark-mode-toggle]');
    const html = document.documentElement;
    
    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            
            // Save preference
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

function setupHomepage() {
    // Hero section animations
    const heroElements = document.querySelectorAll('.hero-animate');
    
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-slideIn');
        }, index * 200);
    });
    
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('scale-105');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('scale-105');
        });
    });
}

function setupCourses() {
    // Course progress tracking
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.dataset.progress || 0;
        const fill = bar.querySelector('.progress-fill');
        
        if (fill) {
            setTimeout(() => {
                fill.style.width = progress + '%';
            }, 500);
        }
    });
}

function checkAuthStatus() {
    // Check if user is logged in (simple localStorage check)
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const authButtons = document.querySelectorAll('[data-auth-required]');
    
    authButtons.forEach(btn => {
        if (!isLoggedIn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showLoginPrompt();
            });
        }
    });
}

function showLoginPrompt() {
    // Simple login prompt (can be replaced with modal)
    const loginConfirm = confirm('Please log in to access this feature. Would you like to go to the login page?');
    
    if (loginConfirm) {
        window.location.href = 'login page.html';
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${getNotificationStyle(type)}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function getNotificationStyle(type) {
    switch(type) {
        case 'success':
            return 'bg-green-500 text-white';
        case 'error':
            return 'bg-red-500 text-white';
        case 'warning':
            return 'bg-yellow-500 text-black';
        default:
            return 'bg-blue-500 text-white';
    }
}

// Export functions for use in other files
window.EmpowerKids = {
    showNotification,
    checkAuthStatus,
    setupNavigation
};
