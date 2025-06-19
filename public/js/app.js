/**
 * Main application entry point for Xsight.
 * This script initializes all the application modules in the correct order
 * after the HTML document has fully loaded, preventing race conditions.
 */

// Import the Router class and all page-rendering functions.
import { Router } from './modules/router.js';
// Note: Ensure auth.js and ui.js export their respective classes if you plan to use them here.
// For now, we focus on getting the router and pages working.
import { renderHomePage } from './pages/home.js';
import { renderLoginPage } from './pages/login.js';
import { renderSignupPage } from './pages/signup.js';
import { renderAboutPage } from './pages/about.js';
import { renderDashboardPage } from './pages/dashboard.js';

/**
 * The main function that runs once the DOM is ready.
 * It sets up the entire application.
 */
function initializeApp() {
    console.log("🚀 DOM content loaded. Initializing Xsight App...");

    const appContainer = document.getElementById('app');
    if (!appContainer) {
        console.error("Fatal Error: #app container not found. Application cannot start.");
        return;
    }

    // 1. Create a new Router instance, telling it where to render pages.
    const router = new Router(appContainer);

    // 2. Register all the page routes. This teaches the router what to do for each page hash.
    router.addRoute('home', renderHomePage);
    router.addRoute('login', renderLoginPage);
    router.addRoute('signup', renderSignupPage);
    router.addRoute('about', renderAboutPage);
    router.addRoute('dashboard', renderDashboardPage);
    
    // Make the router globally accessible for debugging and other modules.
    window.router = router;
    console.log("📍 Routes registered successfully.");

    // 3. Start the router. This sets up event listeners and loads the initial page.
    router.start();

    // 4. Hide the initial loading screen now that the app is ready.
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    console.log("✅ Xsight Application initialized successfully!");
}

// This is the crucial part:
// Add an event listener that waits for the 'DOMContentLoaded' event.
// This ensures that the HTML page is fully built before we try to run any scripts
// that interact with it. This is the standard, reliable way to start a web app.
window.addEventListener('DOMContentLoaded', initializeApp);
