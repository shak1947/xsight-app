// About Page Component
export function renderAboutPage() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
        <!-- About Hero Section -->
        <section class="about-hero">
            <div class="container">
                <div class="about-hero-content">
                    <h1>About Xsight</h1>
                    <p class="hero-subtitle">
                        We're building the future of data analysis with AI-powered intelligence 
                        that makes complex queries accessible to everyone.
                    </p>
                </div>
            </div>
        </section>

        <!-- Mission Section -->
        <section class="mission">
            <div class="container">
                <div class="mission-content">
                    <div class="mission-text">
                        <h2>Our Mission</h2>
                        <p>
                            At Xsight, we believe that powerful data analysis shouldn't require a PhD in computer science. 
                            Our mission is to democratize data insights by making AI-powered query building accessible 
                            to everyone, from business analysts to data scientists.
                        </p>
                        <p>
                            We're transforming how organizations interact with their data, turning complex SQL queries 
                            into simple, intuitive conversations with intelligent AI agents.
                        </p>
                        <div class="mission-stats">
                            <div class="stat">
                                <span class="stat-number">10,000+</span>
                                <span class="stat-label">Queries Generated Daily</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">500+</span>
                                <span class="stat-label">Companies Trust Us</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">95%</span>
                                <span class="stat-label">Time Saved</span>
                            </div>
                        </div>
                    </div>
                    <div class="mission-visual">
                        <div class="data-flow">
                            <div class="flow-step">
                                <div class="step-icon">
                                    <i class="fas fa-database"></i>
                                </div>
                                <span>Raw Data</span>
                            </div>
                            <div class="flow-arrow">→</div>
                            <div class="flow-step">
                                <div class="step-icon">
                                    <i class="fas fa-brain"></i>
                                </div>
                                <span>AI Processing</span>
                            </div>
                            <div class="flow-arrow">→</div>
                            <div class="flow-step">
                                <div class="step-icon">
                                    <i class="fas fa-chart-bar"></i>
                                </div>
                                <span>Insights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="values">
            <div class="container">
                <div class="section-header">
                    <h2>Our Values</h2>
                    <p>The principles that guide everything we do</p>
                </div>
                <div class="values-grid">
                    <div class="value-card">
                        <div class="value-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <h3>Innovation</h3>
                        <p>We push the boundaries of what's possible with AI and data analysis, constantly exploring new ways to make insights more accessible.</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3>User-Centric</h3>
                        <p>Every feature we build starts with understanding our users' needs and challenges. Your success is our success.</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3>Security</h3>
                        <p>We take data security seriously, implementing enterprise-grade protection to keep your information safe.</p>
                    </div>
                    <div class="value-card">
                        <div class="value-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <h3>Simplicity</h3>
                        <p>Complex problems deserve elegant solutions. We make powerful technology simple and intuitive to use.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="team">
            <div class="container">
                <div class="section-header">
                    <h2>Meet Our Team</h2>
                    <p>The passionate people building the future of data analysis</p>
                </div>
                <div class="team-grid">
                    <div class="team-member">
                        <div class="member-photo">
                            <div class="avatar">
                                <i class="fas fa-user"></i>
                            </div>
                        </div>
                        <div class="member-info">
                            <h3>Sarah Chen</h3>
                            <span class="member-role">CEO & Co-Founder</span>
                            <p>Former Google AI researcher with 10+ years in machine learning and data science.</p>
                            <div class="member-social">
                                <a href="#"><i class="fab fa-linkedin"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="team-member">
                        <div class="member-photo">
                            <div class="avatar">
                                <i class="fas fa-user"></i>
                            </div>
                        </div>
                        <div class="member-info">
                            <h3>Marcus Rodriguez</h3>
                            <span class="member-role">CTO & Co-Founder</span>
                            <p>Ex-Microsoft engineer specializing in distributed systems and AI infrastructure.</p>
                            <div class="member-social">
                                <a href="#"><i class="fab fa-linkedin"></i></a>
                                <a href="#"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="team-member">
                        <div class="member-photo">
                            <div class="avatar">
                                <i class="fas fa-user"></i>
                            </div>
                        </div>
                        <div class="member-info">
                            <h3>Emily Johnson</h3>
                            <span class="member-role">Head of Product</span>
                            <p>Product strategist with deep experience in enterprise software and user experience design.</p>
                            <div class="member-social">
                                <a href="#"><i class="fab fa-linkedin"></i></a>
                                <a href="#"><i class="fab fa-dribbble"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="team-member">
                        <div class="member-photo">
                            <div class="avatar">
                                <i class="fas fa-user"></i>
                            </div>
                        </div>
                        <div class="member-info">
                            <h3>David Kim</h3>
                            <span class="member-role">Lead AI Engineer</span>
                            <p>PhD in Computer Science, specializing in natural language processing and query optimization.</p>
                            <div class="member-social">
                                <a href="#"><i class="fab fa-linkedin"></i></a>
                                <a href="#"><i class="fas fa-graduation-cap"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline Section -->
        <section class="timeline">
            <div class="container">
                <div class="section-header">
                    <h2>Our Journey</h2>
                    <p>Key milestones in building Xsight</p>
                </div>
                <div class="timeline-container">
                    <div class="timeline-item">
                        <div class="timeline-date">2023</div>
                        <div class="timeline-content">
                            <h3>Founded</h3>
                            <p>Xsight was founded with the vision to make data analysis accessible to everyone through AI.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">Q1 2024</div>
                        <div class="timeline-content">
                            <h3>Beta Launch</h3>
                            <p>Launched our beta platform with 50 early adopters and received overwhelming positive feedback.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">Q2 2024</div>
                        <div class="timeline-content">
                            <h3>Series A Funding</h3>
                            <p>Raised $10M in Series A funding to accelerate product development and team growth.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">Q3 2024</div>
                        <div class="timeline-content">
                            <h3>Public Launch</h3>
                            <p>Officially launched Xsight to the public with advanced AI query builder and team collaboration features.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">2025</div>
                        <div class="timeline-content">
                            <h3>Enterprise Platform</h3>
                            <p>Expanding into enterprise market with advanced security, compliance, and integration capabilities.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Technology Section -->
        <section class="technology">
            <div class="container">
                <div class="tech-content">
                    <div class="tech-text">
                        <h2>Cutting-Edge Technology</h2>
                        <p>
                            Xsight is built on the latest advances in artificial intelligence, natural language processing, 
                            and distributed computing. Our platform can understand complex data relationships and generate 
                            optimized queries in real-time.
                        </p>
                        <div class="tech-features">
                            <div class="tech-feature">
                                <i class="fas fa-microchip"></i>
                                <span>Advanced ML Models</span>
                            </div>
                            <div class="tech-feature">
                                <i class="fas fa-language"></i>
                                <span>Natural Language Processing</span>
                            </div>
                            <div class="tech-feature">
                                <i class="fas fa-cloud"></i>
                                <span>Cloud-Native Architecture</span>
                            </div>
                            <div class="tech-feature">
                                <i class="fas fa-bolt"></i>
                                <span>Real-Time Processing</span>
                            </div>
                        </div>
                    </div>
                    <div class="tech-visual">
                        <div class="tech-stack">
                            <div class="stack-layer">
                                <span>AI & Machine Learning</span>
                            </div>
                            <div class="stack-layer">
                                <span>Query Optimization Engine</span>
                            </div>
                            <div class="stack-layer">
                                <span>Data Processing Pipeline</span>
                            </div>
                            <div class="stack-layer">
                                <span>Security & Compliance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact">
            <div class="container">
                <div class="contact-content">
                    <div class="contact-info">
                        <h2>Get in Touch</h2>
                        <p>Have questions about Xsight? We'd love to hear from you.</p>
                        
                        <div class="contact-methods">
                            <div class="contact-method">
                                <div class="contact-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Email Us</h4>
                                    <p>hello@xsight.com</p>
                                    <span>We'll respond within 24 hours</span>
                                </div>
                            </div>
                            
                            <div class="contact-method">
                                <div class="contact-icon">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Call Us</h4>
                                    <p>+1 (555) 123-4567</p>
                                    <span>Mon-Fri, 9am-6pm PST</span>
                                </div>
                            </div>
                            
                            <div class="contact-method">
                                <div class="contact-icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div class="contact-details">
                                    <h4>Visit Us</h4>
                                    <p>123 Innovation Drive<br>San Francisco, CA 94105</p>
                                    <span>By appointment only</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="social-links">
                            <a href="#" class="social-link">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div class="contact-form-container">
                        <form id="contactForm" class="contact-form">
                            <h3>Send us a message</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="contactName">Name</label>
                                    <input type="text" id="contactName" name="name" required placeholder="Your name">
                                </div>
                                <div class="form-group">
                                    <label for="contactEmail">Email</label>
                                    <input type="email" id="contactEmail" name="email" required placeholder="your@email.com">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="contactCompany">Company</label>
                                <input type="text" id="contactCompany" name="company" placeholder="Your company (optional)">
                            </div>
                            
                            <div class="form-group">
                                <label for="contactSubject">Subject</label>
                                <select id="contactSubject" name="subject" required>
                                    <option value="">Select a topic</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="demo">Request Demo</option>
                                    <option value="support">Technical Support</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="press">Press & Media</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="contactMessage">Message</label>
                                <textarea id="contactMessage" name="message" required placeholder="Tell us how we can help..." rows="5"></textarea>
                            </div>
                            
                            <button type="submit" class="btn btn-primary" id="contactBtn">
                                <span class="btn-text">Send Message</span>
                                <span class="btn-loader" style="display: none;">
                                    <i class="fas fa-spinner fa-spin"></i>
                                </span>
                            </button>
                            
                            <div id="contactSuccess" class="success-message" style="display: none;">
                                <i class="fas fa-check-circle"></i>
                                <span>Thank you! We'll get back to you soon.</span>
                            </div>
                            
                            <div id="contactError" class="error-message" style="display: none;">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>Something went wrong. Please try again.</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="about-cta">
            <div class="container">
                <div class="cta-content">
                    <h2>Ready to Experience Xsight?</h2>
                    <p>Join thousands of teams already transforming their data analysis workflow.</p>
                    <div class="cta-actions">
                        <button class="btn btn-primary btn-large" data-page="signup">
                            Start Free Trial
                        </button>
                        <button class="btn btn-outline btn-large" onclick="scheduleDemo()">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Initialize about page functionality
    initializeAboutPage();
}

function initializeAboutPage() {
    // Initialize contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize interactive elements
    initializeInteractiveElements();
}

function handleContactForm(e) {
    e.preventDefault();
    
    const contactBtn = document.getElementById('contactBtn');
    const successDiv = document.getElementById('contactSuccess');
    const errorDiv = document.getElementById('contactError');
    
    // Show loading state
    showLoading(contactBtn);
    hideMessage(successDiv);
    hideMessage(errorDiv);
    
    // Get form data
    const formData = new FormData(contactForm);
    const contactData = Object.fromEntries(formData);
    
    // Simulate form submission
    setTimeout(() => {
        try {
            // Simulate successful submission
            console.log('Contact form submitted:', contactData);
            
            showMessage(successDiv, 'Thank you! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            showMessage(errorDiv, 'Something went wrong. Please try again.', 'error');
        } finally {
            hideLoading(contactBtn);
        }
    }, 1500);
}

function initializeScrollAnimations() {
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

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .value-card, 
        .team-member, 
        .timeline-item, 
        .tech-feature,
        .contact-method
    `);
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const number = parseInt(target.replace(/[^\d]/g, ''));
    const suffix = target.replace(/[\d,]/g, '');
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, duration / steps);
}

function initializeInteractiveElements() {
    // Timeline hover effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Team member card interactions
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.classList.add('highlighted');
        });
        
        member.addEventListener('mouseleave', function() {
            this.classList.remove('highlighted');
        });
    });
}

function scheduleDemo() {
    // Simulate demo scheduling
    alert('Demo scheduling will be available soon! Please contact us at hello@xsight.com for now.');
}

// Utility functions
function showLoading(button) {
    const text = button.querySelector('.btn-text');
    const loader = button.querySelector('.btn-loader');
    
    if (text) text.style.display = 'none';
    if (loader) loader.style.display = 'inline-block';
    button.disabled = true;
}

function hideLoading(button) {
    const text = button.querySelector('.btn-text');
    const loader = button.querySelector('.btn-loader');
    
    if (text) text.style.display = 'inline-block';
    if (loader) loader.style.display = 'none';
    button.disabled = false;
}

function showMessage(element, message, type) {
    const textSpan = element.querySelector('span:last-child');
    if (textSpan) {
        textSpan.textContent = message;
    }
    element.style.display = 'block';
    element.className = `${type}-message`;
}

function hideMessage(element) {
    element.style.display = 'none';
}

// Register the route
window.router.addRoute('about', renderAboutPage);
