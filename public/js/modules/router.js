/**
 * A simple, robust client-side router for a single-page application (SPA).
 * It uses the URL hash (#) for routing, which is reliable for static hosting.
 * This version is designed to be controlled by a main application script (app.js).
 */
export class Router {
    /**
     * Creates a new Router instance.
     * @param {HTMLElement} appContainer - The main element where page content will be rendered.
     */
    constructor(appContainer) {
        // The router needs to know where to render the content.
        if (!appContainer) {
            throw new Error("Router constructor requires a valid app container element.");
        }
        this.appContainer = appContainer;
        this.routes = new Map(); // Stores the registered routes (e.g., 'home' -> renderHomePage)
        this.currentPage = null;
    }

    /**
     * Registers a route and its corresponding render function.
     * This is called by app.js to teach the router about available pages.
     * @param {string} path - The route path (e.g., 'home', 'about').
     * @param {Function} renderFunction - The function to call to render the page.
     */
    addRoute(path, renderFunction) {
        this.routes.set(path, renderFunction);
    }

    /**
     * Reads the route from the URL hash and calls the appropriate render function.
     * This is the central method that handles page rendering.
     */
    handleLocation() {
        // Get the page name from the URL hash (e.g., #home -> 'home')
        const page = window.location.hash.substring(1) || 'home';

        // Check if the route is one we know about.
        if (!this.routes.has(page)) {
            console.error(`Route '${page}' not found. Showing error page.`);
            this.renderErrorPage('Page not found.');
            return;
        }

        try {
            console.log(`Navigating to page: ${page}`);
            this.currentPage = page;
            
            // Get the function associated with this page.
            const renderFunction = this.routes.get(page);
            
            // Execute the render function (e.g., renderHomePage()).
            // The function itself is responsible for updating the appContainer's innerHTML.
            renderFunction();
            
            // Update which nav link looks "active".
            this.updateActiveNavLink(page);

        } catch (error) {
            console.error(`Error rendering page '${page}':`, error);
            this.renderErrorPage('Failed to load page. Check the console for details.');
        }
    }

    /**
     * Renders a generic error message into the app container.
     * @param {string} message - The error message to display.
     */
    renderErrorPage(message) {
        this.appContainer.innerHTML = `
            <div class="text-center p-8">
                <h2 class="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
                <p class="text-slate-700">${message}</p>
                <a href="#home" class="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">Go Home</a>
            </div>
        `;
    }

    /**
     * Updates the active class on navigation links to provide visual feedback.
     * @param {string} page - The currently active page.
     */
    updateActiveNavLink(page) {
        // This query finds all links that have a `data-page` attribute.
        document.querySelectorAll('[data-page]').forEach(link => {
            if (link.dataset.page === page) {
                link.classList.add('active'); // You can style '.active' in your CSS
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Returns the name of the current page.
     * @returns {string|null}
     */
    getCurrentPage() {
        return this.currentPage;
    }
}
