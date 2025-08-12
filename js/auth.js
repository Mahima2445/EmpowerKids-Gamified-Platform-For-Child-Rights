// Authentication functionality for EmpowerKids Platform
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('empowerKidsUsers') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
    }
    
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Registration form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }
        
        // Show/hide password
        const togglePasswordBtns = document.querySelectorAll('.toggle-password');
        togglePasswordBtns.forEach(btn => {
            btn.addEventListener('click', () => this.togglePassword(btn));
        });
    }
    
    handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const userType = formData.get('userType') || 'student';
        
        // Validate inputs
        if (!email || !password) {
            this.showError('Please fill in all fields');
            return;
        }
        
        // Find user
        const user = this.users.find(u => u.email === email && u.userType === userType);
        
        if (!user) {
            this.showError('User not found. Please check your credentials.');
            return;
        }
        
        // Verify password (in real app, use proper hashing)
        if (user.password !== password) {
            this.showError('Incorrect password');
            return;
        }
        
        // Login successful
        this.loginUser(user);
    }
    
    handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            id: Date.now().toString(),
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            userType: formData.get('userType') || 'student',
            age: formData.get('age'),
            school: formData.get('school'),
            createdAt: new Date().toISOString()
        };
        
        // Validate inputs
        if (!userData.name || !userData.email || !userData.password) {
            this.showError('Please fill in all required fields');
            return;
        }
        
        if (userData.password !== userData.confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }
        
        if (userData.password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }
        
        // Check if user already exists
        const existingUser = this.users.find(u => u.email === userData.email);
        if (existingUser) {
            this.showError('User with this email already exists');
            return;
        }
        
        // Remove confirmPassword before saving
        delete userData.confirmPassword;
        
        // Save user
        this.users.push(userData);
        localStorage.setItem('empowerKidsUsers', JSON.stringify(this.users));
        
        this.showSuccess('Registration successful! Please login.');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login page.html';
        }, 2000);
    }
    
    loginUser(user) {
        // Save current user
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userLoggedIn', 'true');
        
        this.showSuccess(`Welcome back, ${user.name}!`);
        
        // Update UI
        this.updateAuthUI();
        
        // Redirect based on user type
        setTimeout(() => {
            switch(user.userType) {
                case 'parent':
                    window.location.href = 'parent.html';
                    break;
                case 'teacher':
                    window.location.href = 'teacher.html';
                    break;
                default:
                    window.location.href = 'homepage.html';
            }
        }, 1500);
    }
    
    handleLogout() {
        // Clear user data
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.setItem('userLoggedIn', 'false');
        
        this.showSuccess('Logged out successfully');
        
        // Update UI
        this.updateAuthUI();
        
        // Redirect to homepage
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1500);
    }
    
    checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        if (isLoggedIn && currentUser) {
            this.currentUser = currentUser;
            this.updateAuthUI();
        }
    }
    
    updateAuthUI() {
        const userNameDisplay = document.getElementById('userNameDisplay');
        const loginButton = document.getElementById('loginButton');
        const logoutButton = document.getElementById('logoutButton');
        const userDropdown = document.getElementById('userDropdown');
        
        if (this.currentUser) {
            // User is logged in
            if (userNameDisplay) {
                userNameDisplay.textContent = this.currentUser.name;
            }
            
            if (loginButton) {
                loginButton.style.display = 'none';
            }
            
            if (logoutButton) {
                logoutButton.style.display = 'block';
            }
            
            if (userDropdown) {
                userDropdown.style.display = 'block';
            }
        } else {
            // User is not logged in
            if (loginButton) {
                loginButton.style.display = 'block';
            }
            
            if (logoutButton) {
                logoutButton.style.display = 'none';
            }
            
            if (userDropdown) {
                userDropdown.style.display = 'none';
            }
        }
    }
    
    togglePassword(button) {
        const input = button.previousElementSibling;
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    showError(message) {
        this.showMessage(message, 'error');
    }
    
    showSuccess(message) {
        this.showMessage(message, 'success');
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.auth-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message p-4 rounded-lg mb-4 ${
            type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' : 
            'bg-green-100 text-green-700 border border-green-300'
        }`;
        messageDiv.textContent = message;
        
        // Insert message at the top of the form
        const form = document.querySelector('form');
        if (form) {
            form.insertBefore(messageDiv, form.firstChild);
        }
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
        
        // Also use notification system if available
        if (window.EmpowerKids) {
            window.EmpowerKids.showNotification(message, type);
        }
    }
    
    // Utility methods
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    getUserType() {
        return this.currentUser ? this.currentUser.userType : null;
    }
    
    requireAuth(userType = null) {
        if (!this.isLoggedIn()) {
            alert('Please log in to access this feature');
            window.location.href = 'login page.html';
            return false;
        }
        
        if (userType && this.getUserType() !== userType) {
            alert(`This feature is only available for ${userType}s`);
            return false;
        }
        
        return true;
    }
}

// Initialize auth manager
document.addEventListener('DOMContentLoaded', function() {
    window.authManager = new AuthManager();
});

// Export for use in other files
window.EmpowerKids = window.EmpowerKids || {};
window.EmpowerKids.AuthManager = AuthManager;
