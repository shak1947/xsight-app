/**
 * Main application entry point for Xsight.
 * This script initializes all the application modules in the correct order
 * after the HTML document has fully loaded.
 */

// Import all necessary modules and page renderers
import { AuthManager } from './modules/auth.js';
import { Router } from './modules/router.js';
import { UIManager } from './modules/ui.js';
// Import page rendering functions
import { renderHomePage } from '../pages/home.js';
import { renderLoginPage } from '../pages/login.js';
import { renderSignupPage } from '../pages/signup.js';
import { renderAboutPage } from '../pages/about.js';
import { renderDashboardPage } from '../pages/dashboard.js';


/**
 * The main function that runs once the DOM is ready.
 * It sets up the entire application.
 */
function initializeApp() {
    console.log("🚀 DOM content loaded. Initializing Xsight App...");

    // 1. Initialize core managers
    const authManager = new AuthManager();
    const uiManager = new UIManager();
    
    // Make managers globally accessible for easier debugging if needed
    window.authManager = authManager;
    window.uiManager = uiManager;

    // 2. Initialize the router and register all the page routes
    const router = new Router(document.getElementById('app'));
    router.addRoute('home', renderHomePage);
    router.addRoute('login', renderLoginPage);
    router.addRoute('signup', renderSignupPage);
    router.addRoute('about', renderAboutPage);
    router.addRoute('dashboard', renderDashboardPage);
    
    // Make router globally accessible
    window.router = router;
    console.log("📍 Routes registered.");

    // 3. Set up listeners and initial state
    // Listen for auth state changes to update the UI (e.g., show/hide login/logout buttons)
    authManager.onAuthStateChange(user => {
        uiManager.updateAuthUI(user);
        
        // If the user logs out while on a protected page, redirect them home
        const currentPage = router.getCurrentPage();
        if (!user && currentPage === 'dashboard') {
            router.navigateTo('home');
        }
    });

    // Handle initial page load by checking the URL hash
    router.handleLocation();

    // Set up listeners for all navigation links
    uiManager.setupNavigationEvents();
    
    // Hide the initial loading screen
    uiManager.hideLoadingScreen();

    console.log("✅ Xsight Application initialized successfully!");
}

// This is the crucial part:
// We add an event listener that waits for the 'DOMContentLoaded' event.
// This ensures that the HTML page is fully built before we try to run any scripts
// that interact with it. This is the standard, reliable way to start a web app.
window.addEventListener('DOMContentLoaded', initializeApp);
