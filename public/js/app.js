/**
 * Main application entry point for Xsight.
 * SIMPLIFIED FOR DEBUGGING: This version removes all imports to test if the
 * script itself is executing and can hide the loading screen. If this works,
 * it proves the problem is in one of the imported files (like router.js or a page file).
 */

function initializeApp() {
    const appContainer = document.getElementById('app');
    const loadingScreen = document.getElementById('loading-screen');

    try {
        console.log("🚀 DEBUG: initializeApp function has started.");

        if (!appContainer) {
            // This would be a critical error in the HTML file itself.
            throw new Error("Fatal Error: #app container not found.");
        }
        
        // Bypass the router and all other modules.
        // Directly write a success message to the page to confirm this script is running.
        appContainer.innerHTML = `
            <div class="text-center p-8">
                <h2 class="text-2xl font-bold text-green-600 mb-4">Success! app.js is running.</h2>
                <p class="text-slate-700">The infinite loading screen issue is caused by a failing import in one of the other JavaScript files.</p>
                <p class="text-slate-600 mt-2">Next, we will add the imports back one by one to find the broken file.</p>
            </div>
        `;
        
        console.log("✅ DEBUG: Successfully wrote to #app container.");

    } catch (error) {
        console.error("A fatal error occurred during initialization:", error);
        if (appContainer) {
            // Display any unexpected errors on the page itself.
            appContainer.innerHTML = `<div class="p-4 bg-red-100 text-red-800 rounded-lg"><pre>${error.stack || error}</pre></div>`;
        }
    } finally {
        // This block ALWAYS runs, guaranteeing the loading screen is hidden
        // as long as this script itself is loaded and parsed correctly.
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        console.log("Hiding loading screen.");
    }
}

// Standard event listener to start the app safely.
window.addEventListener('DOMContentLoaded', initializeApp);
