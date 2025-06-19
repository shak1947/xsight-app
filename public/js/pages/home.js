// Home Page Component
export function renderHomePage() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-container">
                <div class="hero-content">
                    <div class="hero-text">
                        <h1 class="hero-title">
                            Build Intelligent Queries with 
                            <span class="gradient-text">AI-Powered Xsight</span>
                        </h1>
                        <p class="hero-description">
                            Transform your data into actionable insights with our advanced AI query builder. 
                            Create complex queries, analyze patterns, and unlock the power of your data 
                            without writing a single line of code.
                        </p>
                        <div class="hero-actions">
                            <button class="btn btn-primary btn-large" data-page="signup">
                                Get Started Free
                                <i class="fas fa-arrow-right"></i>
                            </button>
                            <button class="btn btn-outline btn-large" data-page="about">
                                Learn More
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <div class="hero-stats">
                            <div class="stat">
                                <span class="stat-number">10K+</span>
                                <span class="stat-label">Queries Built</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">500+</span>
                                <span class="stat-label">Companies</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">99.9%</span>
                                <span class="stat-label">Uptime</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="hero-dashboard">
                            <div class="dashboard-header">
                                <div class="dashboard-controls">
                                    <span class="control red"></span>
                                    <span class="control yellow"></span>
                                    <span class="control green"></span>
                                </div>
                                <span class="dashboard-title">Xsight Query Builder</span>
                            </div>
                            <div class="dashboard-content">
                                <div class="query-builder">
                                    <div class="query-line">
                                        <span class="query-keyword">SELECT</span>
                                        <span class="query-field">customer_name, revenue</span>
                                    </div>
                                    <div class="query-line">
                                        <span class="query-keyword">FROM</span>
                                        <span class="query-field">sales_data</span>
                                    </div>
                                    <div class="query-line">
                                        <span class="query-keyword">WHERE</span>
                                        <span class="query-field">revenue > $10,000</span>
                                    </div>
                                    <div class="ai-suggestion">
                                        <i class="fas fa-lightbulb"></i>
                                        <span>AI suggests: Add ORDER BY revenue DESC</span>
                                    </div>
                                </div>
                                <div class="results-preview">
                                    <div class="chart-placeholder">
                                        <i class="fas fa-chart-bar"></i>
                                        <span>Live Results</span>
                                    </div>
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
                    <h2>Powerful Features for Modern Data Analysis</h2>
                    <p>Everything you need to turn your data into actionable insights</p>
                </div>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-brain"></i>
                        </div>
                        <h3>AI-Powered Intelligence</h3>
                        <p>Our advanced AI understands your data and suggests optimal queries automatically.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <h3>No-Code Query Builder</h3>
                        <p>Build complex queries with drag-and-drop interface. No SQL knowledge required.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3>Real-time Analytics</h3>
                        <p>See results instantly with beautiful charts and interactive visualizations.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3>Team Collaboration</h3>
                        <p>Share queries, collaborate on projects, and work together seamlessly.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3>Enterprise Security</h3>
                        <p>Bank-level security with encryption, audit logs, and compliance standards.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-plug"></i>
                        </div>
                        <h3>Easy Integration</h3>
                        <p>Connect to any database, API, or data source with our extensive integrations.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section class="how-it-works">
            <div class="container">
                <div class="section-header">
                    <h2>How Xsight Works</h2>
                    <p>Get from data to insights in three simple steps</p>
                </div>
                <div class="steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h3>Connect Your Data</h3>
                            <p>Easily connect to your databases, APIs, or upload files. We support all major data sources.</p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h3>Build Smart Queries</h3>
                            <p>Use our visual query builder or let AI suggest queries based on your data patterns.</p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h3>Get Insights</h3>
                            <p>View results in beautiful charts, tables, and dashboards. Share with your team instantly.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta">
            <div class="container">
                <div class="cta-content">
                    <h2>Ready to Transform Your Data?</h2>
                    <p>Join thousands of companies already using Xsight to unlock their data potential.</p>
                    <div class="cta-actions">
                        <button class="btn btn-primary btn-large" data-page="signup">
                            Start Free Trial
                        </button>
                        <button class="btn btn-outline-white btn-large" data-page="about">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all feature cards and steps
    document.querySelectorAll('.feature-card, .step').forEach(el => {
        observer.observe(el);
    });
}

// Register the route
window.router.addRoute('home', renderHomePage);
