// Main Application Entry Point - Integrated with Router
import { AuthManager } from './modules/auth.js';
import { ProjectsManager } from './modules/projects.js';
import { AgentsManager } from './modules/agents.js';
import { UIManager } from './modules/ui.js';
import { FileUploadManager } from './modules/fileUpload.js';
import './modules/router.js'; // Import the new router

class XsightApp {
    constructor() {
        console.log("🚀 Initializing Xsight Application...");
        
        this.currentUser = null;
        this.isInitialized = false;
        
        // Initialize managers in correct order
        this.authManager = new AuthManager();
        this.uiManager = new UIManager();
        this.projectsManager = new ProjectsManager(this.authManager, this.uiManager);
        this.agentsManager = new AgentsManager(this.authManager, this.uiManager, this.projectsManager);
        this.fileUploadManager = new FileUploadManager(this.authManager, this.agentsManager);
        
        // Make managers globally available for debugging
        window.authManager = this.authManager;
        window.projectsManager = this.projectsManager;
        window.agentsManager = this.agentsManager;
        window.uiManager = this.uiManager;
        window.fileUploadManager = this.fileUploadManager;
        
        // Make app instance globally available
        window.app = this;
        
        // Set up cross-manager communications
        this.setupManagerConnections();
        
        // Initialize routing and navigation
        this.initializeRouting();
        
        // Initialize authentication state
        this.initializeAuth();
        
        console.log("✅ Xsight Application initialized successfully!");
        this.isInitialized = true;
    }
    
    setupManagerConnections() {
        // Connect UI manager with other managers
        this.uiManager.setManagers(this.agentsManager, this.fileUploadManager);
        
        // Set up demo functionality
        this.setupDemoFunctionality();
        
        // Set up auth state change listeners
        this.setupAuthListeners();
    }
    
    setupAuthListeners() {
        // Listen for auth state changes from your existing AuthManager
        if (this.authManager.onAuthStateChange) {
            this.authManager.onAuthStateChange((user) => {
                this.handleAuthStateChange(user);
            });
        }
        
        // Set up logout functionality
        this.setupLogoutHandler();
    }
    
    handleAuthStateChange(user) {
        this.currentUser = user;
        window.currentUser = user;
        this.updateAuthUI();
        
        // If user logs out and is on dashboard, redirect to home
        if (!user && window.router && window.router.getCurrentPage() === 'dashboard') {
            window.router.navigateTo('home');
        }
    }
    
    initializeAuth() {
        // Check for existing user session (your existing logic)
        const savedUser = this.getSavedUser();
        if (savedUser) {
            this.setCurrentUser(savedUser);
            console.log('👤 User session restored:', savedUser.email);
        }
    }
    
    getSavedUser() {
        // Check sessionStorage first (temporary session)
        let userData = sessionStorage.getItem('xsight_user');
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (e) {
                console.warn('Invalid user data in sessionStorage');
            }
        }

        // Check localStorage (persistent session)
        userData = localStorage.getItem('xsight_user');
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (e) {
                console.warn('Invalid user data in localStorage');
            }
        }

        return null;
    }
    
    setCurrentUser(user) {
        this.currentUser = user;
        window.currentUser = user;
        this.updateAuthUI();
        
        // Notify your existing AuthManager
        if (this.authManager && this.authManager.setUser) {
            this.authManager.setUser(user);
        }
    }
    
    updateAuthUI() {
        const navAuth = document.getElementById('nav-auth');
        const navUser = document.getElementById('nav-user');
        const dashboardLink = document.getElementById('dashboard-link');
        const userName = document.getElementById('user-name');

        if (this.currentUser) {
            // User is logged in
            if (navAuth) navAuth.style.display = 'none';
            if (navUser) navUser.style.display = 'flex';
            if (dashboardLink) dashboardLink.style.display = 'block';
            if (userName) userName.textContent = this.currentUser.displayName || this.currentUser.email;
        } else {
            // User is logged out
            if (navAuth) navAuth.style.display = 'flex';
            if (navUser) navUser.style.display = 'none';
            if (dashboardLink) dashboardLink.style.display = 'none';
        }
    }
    
    setupLogoutHandler() {
        // Set up logout with a slight delay to ensure DOM is ready
        setTimeout(() => {
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    this.logout();
                });
            }
        }, 100);
    }
    
    logout() {
        // Use your existing auth manager logout if available
        if (this.authManager && this.authManager.logout) {
            this.authManager.logout();
        }
        
        // Clear user data
        sessionStorage.removeItem('xsight_user');
        localStorage.removeItem('xsight_user');
        
        // Reset current user
        this.currentUser = null;
        window.currentUser = null;
        
        // Update UI
        this.updateAuthUI();
        
        // Redirect to home
        if (window.router) {
            window.router.navigateTo('home');
        }
        
        console.log('👋 User logged out');
    }
    
    initializeRouting() {
        // Wait for router to be available, then register routes
        setTimeout(() => {
            if (window.router) {
                this.registerRoutes();
                this.initializeNavigation();
            } else {
                console.warn('Router not available, retrying...');
                setTimeout(() => this.initializeRouting(), 100);
            }
        }, 50);
    }
    
    registerRoutes() {
        // Register the dashboard route to use your existing functionality
        window.router.addRoute('dashboard', () => this.renderDashboardPage());
        
        // The other routes (home, login, signup, about) are already registered in their respective files
        console.log('📍 Routes registered with existing dashboard functionality');
    }
    
    renderDashboardPage() {
        // Check if user is authenticated
        if (!this.currentUser) {
            window.router.navigateTo('login');
            return;
        }

        const appContainer = document.getElementById('app');
        
        // Use your existing dashboard structure but adapt it for the router
        appContainer.innerHTML = `
            <div class="dashboard">
                <!-- Dashboard Header -->
                <header class="dashboard-header">
                    <div class="dashboard-nav">
                        <h1>Welcome back, ${this.currentUser.displayName || this.currentUser.email || 'User'}!</h1>
                        <p class="dashboard-subtitle">Build intelligent queries and analyze your data</p>
                    </div>
                    <div class="dashboard-actions">
                        <button class="btn btn-outline" id="quickTourBtn">
                            <i class="fas fa-question-circle"></i>
                            Quick Tour
                        </button>
                        <button class="btn btn-primary" id="newProjectBtn">
                            <i class="fas fa-plus"></i>
                            New Project
                        </button>
                    </div>
                </header>

                <!-- Your existing dashboard content will be injected here -->
                <div id="dashboard-content">
                    <!-- This is where your existing dashboard UI will load -->
                    <div class="loading-dashboard">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading dashboard...</p>
                    </div>
                </div>
            </div>
        `;

        // Initialize your existing dashboard functionality
        setTimeout(() => {
            this.initializeExistingDashboard();
        }, 100);
    }
    
    initializeExistingDashboard() {
        // Let your existing UI manager handle the dashboard content
        if (this.uiManager && this.uiManager.initializeDashboard) {
            this.uiManager.initializeDashboard();
        } else if (this.uiManager && this.uiManager.setupUI) {
            this.uiManager.setupUI();
        }
        
        // Re-initialize your existing components
        if (this.projectsManager && this.projectsManager.initialize) {
            this.projectsManager.initialize();
        }
        
        if (this.agentsManager && this.agentsManager.initialize) {
            this.agentsManager.initialize();
        }
        
        if (this.fileUploadManager && this.fileUploadManager.initialize) {
            this.fileUploadManager.initialize();
        }
        
        // Set up event listeners for dashboard actions
        this.setupDashboardActions();
        
        // Hide loading and show content
        const loadingEl = document.querySelector('.loading-dashboard');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    }
    
    setupDashboardActions() {
        // Set up your existing button functionality
        const newProjectBtn = document.getElementById('newProjectBtn');
        if (newProjectBtn) {
            newProjectBtn.addEventListener('click', () => {
                if (this.projectsManager && this.projectsManager.createNewProject) {
                    this.projectsManager.createNewProject();
                } else {
                    console.log('New project functionality not available');
                }
            });
        }
        
        const quickTourBtn = document.getElementById('quickTourBtn');
        if (quickTourBtn) {
            quickTourBtn.addEventListener('click', () => {
                if (this.uiManager && this.uiManager.startTour) {
                    this.uiManager.startTour();
                } else {
                    alert('Quick tour will be available soon!');
                }
            });
        }
    }
    
    initializeNavigation() {
        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link')) {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    }
    
    setupDemoFunctionality() {
        // Your existing demo functionality
        window.runDemo = () => {
            const selectedAgent = this.agentsManager.getSelectedAgent();
            if (!selectedAgent) {
                alert("Please select an agent first to run a demo.");
                return;
            }
            
            console.log("Running demo for agent:", selectedAgent.name);
            
            // Simulate some demo results
            const demoResults = document.getElementById('agentDemoResults');
            if (demoResults) {
                demoResults.style.display = 'block';
                demoResults.innerHTML = `
                    <div class="results-header">
                        <h3>🤖 Demo Results for ${selectedAgent.name}</h3>
                    </div>
                    <div class="results-content">
                        <p><strong>Agent Description:</strong> ${selectedAgent.description || 'No description provided.'}</p>
                        <p><strong>Initial Instructions:</strong> ${selectedAgent.initialInstructions || 'No instructions provided.'}</p>
                        <p><strong>Available AI Models:</strong> ${(selectedAgent.selectedGpts || []).join(', ') || 'None selected'}</p>
                        <p><strong>Training Materials:</strong> ${(selectedAgent.trainingMaterials || []).length} files uploaded</p>
                        <div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 6px; border-left: 4px solid #3b82f6;">
                            <strong>💡 Demo Mode:</strong> This is a demonstration of how your agent would respond. In a real implementation, this would connect to your selected AI models and process the input using the training materials.
                        </div>
                    </div>
                `;
                
                // Smooth scroll to results
                demoResults.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }
    
    // Public methods for external access
    getAuthManager() {
        return this.authManager;
    }
    
    getProjectsManager() {
        return this.projectsManager;
    }
    
    getAgentsManager() {
        return this.agentsManager;
    }
    
    getUIManager() {
        return this.uiManager;
    }
    
    getFileUploadManager() {
        return this.fileUploadManager;
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    isUserAuthenticated() {
        return !!this.currentUser;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        new XsightApp();
    } catch (error) {
        console.error("Failed to initialize Xsight Application:", error);
        
        // Show error to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fee2e2;
            color: #dc2626;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            text-align: center;
            z-index: 9999;
        `;
        errorDiv.innerHTML = `
            <h3>⚠️ Application Error</h3>
            <p>Failed to initialize the application. Please refresh the page.</p>
            <button onclick="window.location.reload()" style="
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background: #dc2626;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">Refresh Page</button>
        `;
        document.body.appendChild(errorDiv);
    }
});

// Handle service worker registration for PWA functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed');
            });
    });
}

export default XsightApp;
