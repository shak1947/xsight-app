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
    const appContainer = document.getElementById('app');
    const loadingScreen = document.getElementById('loading-screen');

    try {
        console.log("🚀 DOM content loaded. Initializing Xsight App...");

        if (!appContainer) {
            throw new Error("Fatal Error: #app container not found. Application cannot start.");
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

        console.log("✅ Xsight Application initialized successfully!");

    } catch (error) {
        // If any error occurs during initialization, catch it here.
        console.error("A fatal error occurred during application initialization:", error);
        
        // Display a helpful error message to the user inside the main app container.
        if (appContainer) {
            appContainer.innerHTML = `
                <div class="text-center p-8">
                    <h2 class="text-2xl font-bold text-red-600 mb-4">Application Initialization Failed</h2>
                    <p class="text-slate-700">There was a critical error starting the app. Please check the developer console for details.</p>
                    <pre class="mt-4 text-left bg-slate-100 p-4 rounded-lg text-sm overflow-auto" style="white-space: pre-wrap; word-wrap: break-word;">${error.stack || error}</pre>
                </div>
            `;
        }
    } finally {
        // 4. This block ALWAYS runs, whether there was an error or not.
        // This ensures the user never gets stuck on the loading screen.
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        console.log("Hiding loading screen.");
    }
}

// This is the crucial part:
// Add an event listener that waits for the 'DOMContentLoaded' event.
// This ensures that the HTML page is fully built before we try to run any scripts
// that interact with it. This is the standard, reliable way to start a web app.
window.addEventListener('DOMContentLoaded', initializeApp);
