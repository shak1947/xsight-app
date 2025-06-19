// Router Module - handles client-side routing
class Router {
    constructor() {
        this.routes = new Map();
        this.currentPage = null;
        this.init();
    }

    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigateTo(page, false);
        });

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            }
        });

        // Load initial page
        const initialPage = this.getPageFromURL() || 'home';
        this.navigateTo(initialPage, false);
    }

    // Register a route with its render function
    addRoute(path, renderFunction) {
        this.routes.set(path, renderFunction);
    }

    // Navigate to a specific page
    async navigateTo(page, pushState = true) {
        if (!this.routes.has(page)) {
            console.warn(`Route '${page}' not found. Redirecting to home.`);
            page = 'home';
        }

        // Update browser history
        if (pushState) {
            history.pushState({ page }, '', `#${page}`);
        }

        // Update active navigation
        this.updateActiveNavigation(page);

        // Show loading
        this.showLoading();

        try {
            // Get the render function for this page
            const renderFunction = this.routes.get(page);
            
            // Render the page
            await renderFunction();
            
            this.currentPage = page;
            
            // Update page title
            this.updatePageTitle(page);
            
        } catch (error) {
            console.error('Error rendering page:', error);
            this.showError('Failed to load page');
        } finally {
            this.hideLoading();
        }
    }

    // Get current page from URL hash
    getPageFromURL() {
        const hash = window.location.hash.substring(1);
        return hash || 'home';
    }

    // Update active navigation links
    updateActiveNavigation(page) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page link
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Update page title
    updatePageTitle(page) {
        const titles = {
            home: 'Xsight - AI Query Builder',
            about: 'About Us - Xsight',
            login: 'Login - Xsight',
            signup: 'Sign Up - Xsight',
            dashboard: 'Dashboard - Xsight'
        };
        document.title = titles[page] || 'Xsight';
    }

    // Show loading screen
    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    // Hide loading screen
    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }

    // Show error message
    showError(message) {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = `
            <div class="error-container">
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Oops! Something went wrong</h2>
                    <p>${message}</p>
                    <button onclick="window.router.navigateTo('home')" class="btn btn-primary">
                        Go Home
                    </button>
                </div>
            </div>
        `;
    }

    // Get current page
    getCurrentPage() {
        return this.currentPage;
    }
}

// Create global router instance
window.router = new Router();

export default Router;
