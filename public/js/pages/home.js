/**
 * Renders the Home Page content into the #app container.
 * This function builds the HTML structure to match the professional design
 * of the main Xsight marketing website.
 */
export function renderHomePage() {
    // Set the app container's content with the new, structured HTML.
    document.getElementById('app').innerHTML = `
        <main class="home-page">
            <!-- Hero Section: The main landing view -->
            <section class="hero">
                <div class="hero-container container">
                    <div class="hero-content">
                        <!-- Left side: Text content -->
                        <div class="hero-text">
                            <h1 class="hero-title">Unlock the Power of Your Data with AI</h1>
                            <p class="hero-description">
                                Xsight is an intelligent, no-code platform that transforms your natural language questions into powerful, precise queries. Connect your data, ask questions, and get insights in seconds.
                            </p>
                            <div class="hero-actions">
                                <a href="#" class="btn btn-primary btn-large" data-page="signup">Get Started for Free</a>
                                <a href="#" class="btn btn-outline-white btn-large" data-page="about">Learn More</a>
                            </div>
                        </div>
                        <!-- Right side: Visual mockup -->
                        <div class="hero-visual">
                            <div class="hero-dashboard-mockup">
                                <div class="mockup-header">
                                    <div class="mockup-controls">
                                        <span class="control red"></span>
                                        <span class="control yellow"></span>
                                        <span class="control green"></span>
                                    </div>
                                    <div class="mockup-title">AI Query Builder</div>
                                </div>
                                <div class="mockup-body">
                                    <p class="query-line"><span class="query-keyword">FROM</span> customers</p>
                                    <p class="query-line"><span class="query-keyword">WHERE</span> total_spend > 500</p>
                                    <p class="query-line"><span class="query-keyword">AND</span> last_seen < '3 months ago'</p>
                                    <div class="ai-suggestion">
                                        <span>✨</span>
                                        <p>AI Suggestion: Include users from 'premium_members' for a wider reach.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Features Section -->
            <section class="features">
                <div class="container">
                    <div class="section-header">
                        <h2>Why Choose Xsight?</h2>
                        <p>Our platform is designed to be powerful for developers and intuitive for everyone else.</p>
                    </div>
                    <div class="features-grid">
                        <!-- Feature 1 -->
                        <div class="feature-card">
                            <div class="feature-icon"><i class="fas fa-magic"></i></div>
                            <h3>AI-Powered Queries</h3>
                            <p>Translate plain English into complex, accurate queries across your datasets without writing a single line of code.</p>
                        </div>
                        <!-- Feature 2 -->
                        <div class="feature-card">
                            <div class="feature-icon"><i class="fas fa-cogs"></i></div>
                            <h3>Seamless Integration</h3>
                            <p>Connect to databases, warehouses, and business apps you already use. Xsight works with your existing data stack.</p>
                        </div>
                        <!-- Feature 3 -->
                        <div class="feature-card">
                            <div class="feature-icon"><i class="fas fa-chart-line"></i></div>
                            <h3>Advanced Analytics</h3>
                            <p>Go beyond simple queries. Uncover trends, identify opportunities, and visualize your data with our integrated analytics tools.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Call to Action (CTA) Section -->
            <section class="cta">
                <div class="container">
                    <div class="cta-content">
                        <h2>Ready to Dive In?</h2>
                        <p>Start building intelligent queries and unlock the true potential of your data today.</p>
                        <a href="#" class="btn btn-primary btn-large" data-page="signup">Sign Up Now</a>
                    </div>
                </div>
            </section>
        </main>
    `;

    // Note: The event listeners for the buttons (like 'Get Started') are handled by the global router in app.js
    // which listens for clicks on elements with 'data-page' attributes.
}
