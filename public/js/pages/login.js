// Login Page Component
export function renderLoginPage() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
        <section class="auth-section">
            <div class="auth-container">
                <div class="auth-content">
                    <div class="auth-form-container">
                        <div class="auth-header">
                            <h1>Welcome Back</h1>
                            <p>Sign in to your Xsight account</p>
                        </div>

                        <form id="loginForm" class="auth-form">
                            <div class="form-group">
                                <label for="loginEmail">Email Address</label>
                                <div class="input-group">
                                    <i class="fas fa-envelope"></i>
                                    <input 
                                        type="email" 
                                        id="loginEmail" 
                                        name="email" 
                                        required 
                                        placeholder="Enter your email"
                                        autocomplete="email"
                                    >
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="loginPassword">Password</label>
                                <div class="input-group">
                                    <i class="fas fa-lock"></i>
                                    <input 
                                        type="password" 
                                        id="loginPassword" 
                                        name="password" 
                                        required 
                                        placeholder="Enter your password"
                                        autocomplete="current-password"
                                    >
                                    <button type="button" class="password-toggle" id="togglePassword">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-options">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="rememberMe" name="remember">
                                    <span class="checkmark"></span>
                                    Remember me
                                </label>
                                <a href="#" class="forgot-password">Forgot password?</a>
                            </div>

                            <button type="submit" class="btn btn-primary btn-full" id="loginBtn">
                                <span class="btn-text">Sign In</span>
                                <span class="btn-loader" style="display: none;">
                                    <i class="fas fa-spinner fa-spin"></i>
                                </span>
                            </button>

                            <div class="divider">
                                <span>or continue with</span>
                            </div>

                            <div class="social-auth">
                                <button type="button" class="btn btn-social btn-google" id="googleLogin">
                                    <i class="fab fa-google"></i>
                                    Google
                                </button>
                                <button type="button" class="btn btn-social btn-github" id="githubLogin">
                                    <i class="fab fa-github"></i>
                                    GitHub
                                </button>
                            </div>

                            <div class="auth-footer">
                                <p>Don't have an account? 
                                    <a href="#" data-page="signup" class="auth-link">Sign up</a>
                                </p>
                            </div>
                        </form>

                        <div id="loginError" class="error-message" style="display: none;">
                            <i class="fas fa-exclamation-circle"></i>
                            <span class="error-text"></span>
                        </div>

                        <div id="loginSuccess" class="success-message" style="display: none;">
                            <i class="fas fa-check-circle"></i>
                            <span class="success-text"></span>
                        </div>
                    </div>

                    <div class="auth-visual">
                        <div class="auth-image">
                            <div class="floating-card card-1">
                                <i class="fas fa-chart-bar"></i>
                                <span>Real-time Analytics</span>
                            </div>
                            <div class="floating-card card-2">
                                <i class="fas fa-brain"></i>
                                <span>AI-Powered</span>
                            </div>
                            <div class="floating-card card-3">
                                <i class="fas fa-users"></i>
                                <span>Team Collaboration</span>
                            </div>
                            <div class="auth-illustration">
                                <div class="data-visualization">
                                    <div class="chart-bars">
                                        <div class="bar" style="height: 60%"></div>
                                        <div class="bar" style="height: 80%"></div>
                                        <div class="bar" style="height: 40%"></div>
                                        <div class="bar" style="height: 90%"></div>
                                        <div class="bar" style="height: 70%"></div>
                                    </div>
                                    <div class="chart-line">
                                        <svg viewBox="0 0 100 50">
                                            <polyline points="0,40 20,30 40,20 60,25 80,15 100,10" 
                                                     fill="none" stroke="var(--primary-color)" stroke-width="2"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Initialize login functionality
    initializeLoginForm();
}

function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');
    const errorDiv = document.getElementById('loginError');
    const successDiv = document.getElementById('loginSuccess');

    // Password visibility toggle
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Show loading state
        showLoading(loginBtn);
        hideMessage(errorDiv);
        hideMessage(successDiv);

        try {
            // Simulate authentication (replace with real Firebase auth)
            await simulateLogin(email, password, rememberMe);
            
            showMessage(successDiv, 'Login successful! Redirecting...', 'success');
            
            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.router.navigateTo('dashboard');
            }, 1500);

        } catch (error) {
            showMessage(errorDiv, error.message, 'error');
        } finally {
            hideLoading(loginBtn);
        }
    });

    // Social auth handlers
    document.getElementById('googleLogin').addEventListener('click', function() {
        handleSocialLogin('google');
    });

    document.getElementById('githubLogin').addEventListener('click', function() {
        handleSocialLogin('github');
    });

    // Add input animations
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

// Simulate login (replace with real Firebase authentication)
async function simulateLogin(email, password, rememberMe) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Basic validation
            if (!email || !password) {
                reject(new Error('Please fill in all fields'));
                return;
            }

            if (!isValidEmail(email)) {
                reject(new Error('Please enter a valid email address'));
                return;
            }

            if (password.length < 6) {
                reject(new Error('Password must be at least 6 characters'));
                return;
            }

            // For demo purposes, accept any valid email/password
            const user = {
                uid: 'user_' + Date.now(),
                email: email,
                displayName: email.split('@')[0],
                rememberMe: rememberMe
            };

            // Store user session
            if (rememberMe) {
                localStorage.setItem('xsight_user', JSON.stringify(user));
            } else {
                sessionStorage.setItem('xsight_user', JSON.stringify(user));
            }

            // Update global auth state
            window.currentUser = user;
            updateAuthUI(user);

            resolve(user);
        }, 1500); // Simulate network delay
    });
}

function handleSocialLogin(provider) {
    showMessage(
        document.getElementById('loginError'), 
        `${provider} login will be available soon!`, 
        'info'
    );
}

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
    const textSpan = element.querySelector('.error-text, .success-text, .info-text');
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


