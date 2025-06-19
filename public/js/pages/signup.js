// Sign Up Page Component
export function renderSignupPage() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
        <section class="auth-section">
            <div class="auth-container">
                <div class="auth-content">
                    <div class="auth-form-container">
                        <div class="auth-header">
                            <h1>Create Account</h1>
                            <p>Join thousands of users already using Xsight</p>
                        </div>

                        <form id="signupForm" class="auth-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstName">First Name</label>
                                    <div class="input-group">
                                        <i class="fas fa-user"></i>
                                        <input 
                                            type="text" 
                                            id="firstName" 
                                            name="firstName" 
                                            required 
                                            placeholder="First name"
                                            autocomplete="given-name"
                                        >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="lastName">Last Name</label>
                                    <div class="input-group">
                                        <i class="fas fa-user"></i>
                                        <input 
                                            type="text" 
                                            id="lastName" 
                                            name="lastName" 
                                            required 
                                            placeholder="Last name"
                                            autocomplete="family-name"
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="signupEmail">Email Address</label>
                                <div class="input-group">
                                    <i class="fas fa-envelope"></i>
                                    <input 
                                        type="email" 
                                        id="signupEmail" 
                                        name="email" 
                                        required 
                                        placeholder="Enter your email"
                                        autocomplete="email"
                                    >
                                </div>
                                <div class="field-hint">We'll never share your email with anyone else.</div>
                            </div>

                            <div class="form-group">
                                <label for="signupPassword">Password</label>
                                <div class="input-group">
                                    <i class="fas fa-lock"></i>
                                    <input 
                                        type="password" 
                                        id="signupPassword" 
                                        name="password" 
                                        required 
                                        placeholder="Create a password"
                                        autocomplete="new-password"
                                    >
                                    <button type="button" class="password-toggle" id="toggleSignupPassword">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                                <div class="password-strength" id="passwordStrength">
                                    <div class="strength-bar">
                                        <div class="strength-fill"></div>
                                    </div>
                                    <span class="strength-text">Password strength</span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <div class="input-group">
                                    <i class="fas fa-lock"></i>
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        required 
                                        placeholder="Confirm your password"
                                        autocomplete="new-password"
                                    >
                                    <button type="button" class="password-toggle" id="toggleConfirmPassword">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="company">Company (Optional)</label>
                                <div class="input-group">
                                    <i class="fas fa-building"></i>
                                    <input 
                                        type="text" 
                                        id="company" 
                                        name="company" 
                                        placeholder="Company name"
                                        autocomplete="organization"
                                    >
                                </div>
                            </div>

                            <div class="form-options">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="agreeTerms" name="agreeTerms" required>
                                    <span class="checkmark"></span>
                                    I agree to the <a href="#" class="terms-link">Terms of Service</a> and 
                                    <a href="#" class="terms-link">Privacy Policy</a>
                                </label>

                                <label class="checkbox-label">
                                    <input type="checkbox" id="newsletter" name="newsletter" checked>
                                    <span class="checkmark"></span>
                                    Send me product updates and news
                                </label>
                            </div>

                            <button type="submit" class="btn btn-primary btn-full" id="signupBtn">
                                <span class="btn-text">Create Account</span>
                                <span class="btn-loader" style="display: none;">
                                    <i class="fas fa-spinner fa-spin"></i>
                                </span>
                            </button>

                            <div class="divider">
                                <span>or sign up with</span>
                            </div>

                            <div class="social-auth">
                                <button type="button" class="btn btn-social btn-google" id="googleSignup">
                                    <i class="fab fa-google"></i>
                                    Google
                                </button>
                                <button type="button" class="btn btn-social btn-github" id="githubSignup">
                                    <i class="fab fa-github"></i>
                                    GitHub
                                </button>
                            </div>

                            <div class="auth-footer">
                                <p>Already have an account? 
                                    <a href="#" data-page="login" class="auth-link">Sign in</a>
                                </p>
                            </div>
                        </form>

                        <div id="signupError" class="error-message" style="display: none;">
                            <i class="fas fa-exclamation-circle"></i>
                            <span class="error-text"></span>
                        </div>

                        <div id="signupSuccess" class="success-message" style="display: none;">
                            <i class="fas fa-check-circle"></i>
                            <span class="success-text"></span>
                        </div>
                    </div>

                    <div class="auth-visual">
                        <div class="auth-image">
                            <div class="feature-showcase">
                                <div class="feature-item">
                                    <div class="feature-icon">
                                        <i class="fas fa-rocket"></i>
                                    </div>
                                    <div class="feature-content">
                                        <h4>Quick Setup</h4>
                                        <p>Get started in under 5 minutes</p>
                                    </div>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <div class="feature-content">
                                        <h4>Secure & Private</h4>
                                        <p>Enterprise-grade security</p>
                                    </div>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon">
                                        <i class="fas fa-heart"></i>
                                    </div>
                                    <div class="feature-content">
                                        <h4>14-Day Free Trial</h4>
                                        <p>No credit card required</p>
                                    </div>
                                </div>
                            </div>

                            <div class="signup-stats">
                                <div class="stat-item">
                                    <span class="stat-number">10,000+</span>
                                    <span class="stat-label">Active Users</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">500+</span>
                                    <span class="stat-label">Companies</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">4.9★</span>
                                    <span class="stat-label">User Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Initialize signup functionality
    initializeSignupForm();
}

function initializeSignupForm() {
    const signupForm = document.getElementById('signupForm');
    const signupBtn = document.getElementById('signupBtn');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const errorDiv = document.getElementById('signupError');
    const successDiv = document.getElementById('signupSuccess');

    // Password visibility toggles
    setupPasswordToggle('toggleSignupPassword', 'signupPassword');
    setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

    // Password strength indicator
    passwordInput.addEventListener('input', updatePasswordStrength);

    // Password confirmation validation
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);

    // Form submission
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(signupForm);
        const userData = Object.fromEntries(formData);

        // Show loading state
        showLoading(signupBtn);
        hideMessage(errorDiv);
        hideMessage(successDiv);

        try {
            // Validate form data
            validateSignupForm(userData);
            
            // Simulate account creation
            await simulateSignup(userData);
            
            showMessage(successDiv, 'Account created successfully! Redirecting...', 'success');
            
            // Redirect to dashboard after successful signup
            setTimeout(() => {
                window.router.navigateTo('dashboard');
            }, 1500);

        } catch (error) {
            showMessage(errorDiv, error.message, 'error');
        } finally {
            hideLoading(signupBtn);
        }
    });

    // Social auth handlers
    document.getElementById('googleSignup').addEventListener('click', function() {
        handleSocialSignup('google');
    });

    document.getElementById('githubSignup').addEventListener('click', function() {
        handleSocialSignup('github');
    });

    // Add input animations
    setupInputAnimations();
}

function setupPasswordToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    
    toggle.addEventListener('click', function() {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

function updatePasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthFill = strengthContainer.querySelector('.strength-fill');
    const strengthText = strengthContainer.querySelector('.strength-text');
    
    const strength = calculatePasswordStrength(password);
    
    // Update visual indicator
    strengthFill.style.width = `${strength.percentage}%`;
    strengthFill.className = `strength-fill ${strength.level}`;
    strengthText.textContent = strength.text;
    
    // Show/hide strength indicator
    strengthContainer.style.display = password.length > 0 ? 'block' : 'none';
}

function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score += 1;
    else feedback.push('at least 8 characters');
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('lowercase letter');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('uppercase letter');
    
    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('number');
    
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('special character');
    
    const levels = [
        { level: 'weak', text: 'Weak password', percentage: 20 },
        { level: 'fair', text: 'Fair password', percentage: 40 },
        { level: 'good', text: 'Good password', percentage: 60 },
        { level: 'strong', text: 'Strong password', percentage: 80 },
        { level: 'excellent', text: 'Excellent password', percentage: 100 }
    ];
    
    return levels[score] || levels[0];
}

function validatePasswordMatch() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmInput = document.getElementById('confirmPassword');
    
    if (confirmPassword && password !== confirmPassword) {
        confirmInput.setCustomValidity('Passwords do not match');
        confirmInput.classList.add('error');
    } else {
        confirmInput.setCustomValidity('');
        confirmInput.classList.remove('error');
    }
}

function validateSignupForm(userData) {
    // Check required fields
    if (!userData.firstName || !userData.lastName) {
        throw new Error('Please enter your first and last name');
    }
    
    if (!userData.email) {
        throw new Error('Please enter your email address');
    }
    
    if (!isValidEmail(userData.email)) {
        throw new Error('Please enter a valid email address');
    }
    
    if (!userData.password) {
        throw new Error('Please create a password');
    }
    
    if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    
    if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
    }
    
    if (!userData.agreeTerms) {
        throw new Error('Please agree to the Terms of Service');
    }
}

async function simulateSignup(userData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate email already exists check
            const existingEmails = ['admin@example.com', 'test@test.com'];
            if (existingEmails.includes(userData.email)) {
                reject(new Error('An account with this email already exists'));
                return;
            }
            
            // Create user object
            const user = {
                uid: 'user_' + Date.now(),
                email: userData.email,
                displayName: `${userData.firstName} ${userData.lastName}`,
                firstName: userData.firstName,
                lastName: userData.lastName,
                company: userData.company || '',
                newsletter: userData.newsletter || false,
                createdAt: new Date().toISOString()
            };
            
            // Store user session
            sessionStorage.setItem('xsight_user', JSON.stringify(user));
            
            // Update global auth state
            window.currentUser = user;
            updateAuthUI(user);
            
            resolve(user);
        }, 2000); // Simulate network delay
    });
}

function handleSocialSignup(provider) {
    showMessage(
        document.getElementById('signupError'), 
        `${provider} signup will be available soon!`, 
        'info'
    );
}

function setupInputAnimations() {
    const inputs = document.querySelectorAll('.auth-form input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Utility functions (shared with login.js)
function showLoading(button) {
    const text = button.querySelector('.btn-text');
    const loader = button.querySelector('.btn-loader');
    
    text.style.display = 'none';
    loader.style.display = 'inline-block';
    button.disabled = true;
}

function hideLoading(button) {
    const text = button.querySelector('.btn-text');
    const loader = button.querySelector('.btn-loader');
    
    text.style.display = 'inline-block';
    loader.style.display = 'none';
    button.disabled = false;
}

function showMessage(element, message, type) {
    const textSpan = element.querySelector('.error-text, .success-text, .info-text') || 
                   element.querySelector('span:last-child');
    if (textSpan) {
        textSpan.textContent = message;
    }
    element.style.display = 'block';
    element.className = `${type}-message`;
}

function hideMessage(element) {
    element.style.display = 'none';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function updateAuthUI(user) {
    // Update navigation to show user is logged in
    const navAuth = document.getElementById('nav-auth');
    const navUser = document.getElementById('nav-user');
    const dashboardLink = document.getElementById('dashboard-link');
    const userName = document.getElementById('user-name');

    if (navAuth) navAuth.style.display = 'none';
    if (navUser) navUser.style.display = 'flex';
    if (dashboardLink) dashboardLink.style.display = 'block';
    if (userName) userName.textContent = user.displayName || user.email;
}

