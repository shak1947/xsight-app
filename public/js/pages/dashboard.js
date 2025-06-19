// Dashboard Page Component
export function renderDashboardPage() {
    // Check if user is authenticated
    if (!window.currentUser) {
        window.router.navigateTo('login');
        return;
    }

    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
        <div class="dashboard">
            <!-- Dashboard Header -->
            <header class="dashboard-header">
                <div class="dashboard-nav">
                    <h1>Welcome back, ${window.currentUser.displayName || 'User'}!</h1>
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

            <!-- Dashboard Stats -->
            <section class="dashboard-stats">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-number">12</span>
                            <span class="stat-label">Active Projects</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-number">847</span>
                            <span class="stat-label">Queries Built</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-number">6</span>
                            <span class="stat-label">Team Members</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <span class="stat-number">24h</span>
                            <span class="stat-label">Time Saved</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Dashboard Content -->
            <div class="dashboard-content">
                <!-- Sidebar -->
                <aside class="dashboard-sidebar">
                    <nav class="sidebar-nav">
                        <a href="#" class="nav-item active" data-section="overview">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Overview</span>
                        </a>
                        <a href="#" class="nav-item" data-section="projects">
                            <i class="fas fa-folder-open"></i>
                            <span>Projects</span>
                        </a>
                        <a href="#" class="nav-item" data-section="agents">
                            <i class="fas fa-robot"></i>
                            <span>AI Agents</span>
                        </a>
                        <a href="#" class="nav-item" data-section="queries">
                            <i class="fas fa-code"></i>
                            <span>Query Builder</span>
                        </a>
                        <a href="#" class="nav-item" data-section="data-sources">
                            <i class="fas fa-database"></i>
                            <span>Data Sources</span>
                        </a>
                        <a href="#" class="nav-item" data-section="analytics">
                            <i class="fas fa-chart-line"></i>
                            <span>Analytics</span>
                        </a>
                        <a href="#" class="nav-item" data-section="team">
                            <i class="fas fa-users"></i>
                            <span>Team</span>
                        </a>
                        <a href="#" class="nav-item" data-section="settings">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </a>
                    </nav>
                </aside>

                <!-- Main Content Area -->
                <main class="dashboard-main" id="dashboard-main">
                    <!-- Content will be dynamically loaded here -->
                </main>
            </div>
        </div>
    `;

    // Initialize dashboard functionality
    initializeDashboard();
}

function initializeDashboard() {
    // Load default section (overview)
    loadDashboardSection('overview');

    // Set up navigation
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Load the section
            const section = this.getAttribute('data-section');
            loadDashboardSection(section);
        });
    });

    // Set up action buttons
    document.getElementById('newProjectBtn').addEventListener('click', openNewProjectModal);
    document.getElementById('quickTourBtn').addEventListener('click', startQuickTour);
}

function loadDashboardSection(section) {
    const mainContent = document.getElementById('dashboard-main');
    
    switch(section) {
        case 'overview':
            renderOverviewSection(mainContent);
            break;
        case 'projects':
            renderProjectsSection(mainContent);
            break;
        case 'agents':
            renderAgentsSection(mainContent);
            break;
        case 'queries':
            renderQueryBuilderSection(mainContent);
            break;
        case 'data-sources':
            renderDataSourcesSection(mainContent);
            break;
        case 'analytics':
            renderAnalyticsSection(mainContent);
            break;
        case 'team':
            renderTeamSection(mainContent);
            break;
        case 'settings':
            renderSettingsSection(mainContent);
            break;
        default:
            renderOverviewSection(mainContent);
    }
}

function renderOverviewSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>Dashboard Overview</h2>
            <p>Your data analysis activity at a glance</p>
        </div>

        <!-- Recent Activity -->
        <div class="overview-grid">
            <div class="overview-card">
                <h3>Recent Projects</h3>
                <div class="project-list">
                    <div class="project-item">
                        <div class="project-info">
                            <span class="project-name">Sales Analytics Q4</span>
                            <span class="project-date">Updated 2 hours ago</span>
                        </div>
                        <span class="project-status active">Active</span>
                    </div>
                    <div class="project-item">
                        <div class="project-info">
                            <span class="project-name">Customer Segmentation</span>
                            <span class="project-date">Updated yesterday</span>
                        </div>
                        <span class="project-status active">Active</span>
                    </div>
                    <div class="project-item">
                        <div class="project-info">
                            <span class="project-name">Marketing ROI Analysis</span>
                            <span class="project-date">Updated 3 days ago</span>
                        </div>
                        <span class="project-status completed">Completed</span>
                    </div>
                </div>
                <button class="btn btn-link">View All Projects</button>
            </div>

            <div class="overview-card">
                <h3>Quick Actions</h3>
                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="openNewProjectModal()">
                        <i class="fas fa-plus"></i>
                        <span>New Project</span>
                    </button>
                    <button class="quick-action-btn" onclick="openQueryBuilder()">
                        <i class="fas fa-code"></i>
                        <span>Build Query</span>
                    </button>
                    <button class="quick-action-btn" onclick="uploadData()">
                        <i class="fas fa-upload"></i>
                        <span>Upload Data</span>
                    </button>
                    <button class="quick-action-btn" onclick="createAgent()">
                        <i class="fas fa-robot"></i>
                        <span>Create Agent</span>
                    </button>
                </div>
            </div>

            <div class="overview-card">
                <h3>AI Insights</h3>
                <div class="insights-list">
                    <div class="insight-item">
                        <i class="fas fa-lightbulb"></i>
                        <span>Your sales data shows a 15% increase in Q4. Consider analyzing seasonal trends.</span>
                    </div>
                    <div class="insight-item">
                        <i class="fas fa-chart-trending-up"></i>
                        <span>Customer retention has improved by 8% since implementing the new strategy.</span>
                    </div>
                    <div class="insight-item">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Unusual pattern detected in user behavior data. Recommend investigation.</span>
                    </div>
                </div>
            </div>

            <div class="overview-card">
                <h3>Usage Analytics</h3>
                <div class="usage-chart">
                    <div class="chart-placeholder">
                        <canvas id="usageChart" width="400" height="200"></canvas>
                        <div class="chart-fallback">
                            <i class="fas fa-chart-bar"></i>
                            <span>Usage trends over the last 30 days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProjectsSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>Projects</h2>
            <div class="section-actions">
                <button class="btn btn-outline" id="filterProjectsBtn">
                    <i class="fas fa-filter"></i>
                    Filter
                </button>
                <button class="btn btn-primary" onclick="openNewProjectModal()">
                    <i class="fas fa-plus"></i>
                    New Project
                </button>
            </div>
        </div>

        <div class="projects-grid">
            <div class="project-card">
                <div class="project-header">
                    <h3>Sales Analytics Q4</h3>
                    <div class="project-menu">
                        <button class="btn btn-icon">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                <p>Comprehensive analysis of Q4 sales performance and trends</p>
                <div class="project-meta">
                    <span class="project-status active">Active</span>
                    <span class="project-date">Updated 2 hours ago</span>
                </div>
                <div class="project-stats">
                    <div class="stat">
                        <span class="stat-value">95%</span>
                        <span class="stat-label">Accuracy</span>
                    </div>
                </div>
                <div class="agent-actions">
                    <button class="btn btn-outline btn-sm">Configure</button>
                    <button class="btn btn-primary btn-sm">Use Agent</button>
                </div>
            </div>

            <div class="agent-card">
                <div class="agent-avatar">
                    <i class="fas fa-bullhorn"></i>
                </div>
                <div class="agent-info">
                    <h3>Marketing Optimizer</h3>
                    <p>Analyzes marketing campaigns and optimizes ROI</p>
                    <div class="agent-tags">
                        <span class="tag">Marketing</span>
                        <span class="tag">ROI</span>
                        <span class="tag">Campaigns</span>
                    </div>
                </div>
                <div class="agent-stats">
                    <div class="stat">
                        <span class="stat-value">67</span>
                        <span class="stat-label">Queries</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">92%</span>
                        <span class="stat-label">Accuracy</span>
                    </div>
                </div>
                <div class="agent-actions">
                    <button class="btn btn-outline btn-sm">Configure</button>
                    <button class="btn btn-primary btn-sm">Use Agent</button>
                </div>
            </div>

            <div class="agent-card new-agent">
                <div class="new-agent-content">
                    <i class="fas fa-robot"></i>
                    <h3>Create Custom Agent</h3>
                    <p>Build an AI agent tailored to your specific needs</p>
                    <button class="btn btn-primary" onclick="createAgent()">
                        Create Agent
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderQueryBuilderSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>Query Builder</h2>
            <div class="section-actions">
                <button class="btn btn-outline">
                    <i class="fas fa-history"></i>
                    Query History
                </button>
                <button class="btn btn-primary" onclick="openQueryBuilder()">
                    <i class="fas fa-plus"></i>
                    New Query
                </button>
            </div>
        </div>

        <div class="query-builder-interface">
            <div class="query-workspace">
                <div class="query-editor">
                    <div class="editor-header">
                        <div class="editor-tabs">
                            <button class="tab active">Visual Builder</button>
                            <button class="tab">SQL Editor</button>
                            <button class="tab">Natural Language</button>
                        </div>
                        <div class="editor-actions">
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-save"></i>
                                Save
                            </button>
                            <button class="btn btn-sm btn-primary">
                                <i class="fas fa-play"></i>
                                Run Query
                            </button>
                        </div>
                    </div>
                    <div class="editor-content">
                        <div class="visual-builder">
                            <div class="builder-step">
                                <span class="step-number">1</span>
                                <div class="step-content">
                                    <label>Select Data Source</label>
                                    <select class="form-control">
                                        <option>Choose a data source...</option>
                                        <option>Sales Database</option>
                                        <option>Customer Data</option>
                                        <option>Marketing Analytics</option>
                                    </select>
                                </div>
                            </div>
                            <div class="builder-step">
                                <span class="step-number">2</span>
                                <div class="step-content">
                                    <label>Choose Fields</label>
                                    <div class="field-selector">
                                        <div class="available-fields">
                                            <h4>Available Fields</h4>
                                            <div class="field-list">
                                                <div class="field-item" draggable="true">
                                                    <i class="fas fa-grip-vertical"></i>
                                                    <span>customer_name</span>
                                                </div>
                                                <div class="field-item" draggable="true">
                                                    <i class="fas fa-grip-vertical"></i>
                                                    <span>order_date</span>
                                                </div>
                                                <div class="field-item" draggable="true">
                                                    <i class="fas fa-grip-vertical"></i>
                                                    <span>revenue</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="selected-fields">
                                            <h4>Selected Fields</h4>
                                            <div class="field-list drop-zone">
                                                <div class="placeholder">Drag fields here</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="builder-step">
                                <span class="step-number">3</span>
                                <div class="step-content">
                                    <label>Add Filters</label>
                                    <button class="btn btn-outline btn-sm">
                                        <i class="fas fa-plus"></i>
                                        Add Filter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="query-results">
                    <div class="results-header">
                        <h3>Query Results</h3>
                        <div class="results-actions">
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-download"></i>
                                Export
                            </button>
                            <button class="btn btn-sm btn-outline">
                                <i class="fas fa-chart-bar"></i>
                                Visualize
                            </button>
                        </div>
                    </div>
                    <div class="results-content">
                        <div class="results-placeholder">
                            <i class="fas fa-search"></i>
                            <p>Build and run a query to see results here</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="query-sidebar">
                <div class="ai-assistant">
                    <h3>AI Assistant</h3>
                    <div class="assistant-content">
                        <div class="suggestion">
                            <i class="fas fa-lightbulb"></i>
                            <p>Try asking: "Show me top customers by revenue this quarter"</p>
                        </div>
                        <div class="chat-input">
                            <input type="text" placeholder="Ask AI to help build your query..." class="form-control">
                            <button class="btn btn-primary btn-sm">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Placeholder functions for other sections
function renderDataSourcesSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>Data Sources</h2>
            <button class="btn btn-primary">
                <i class="fas fa-plus"></i>
                Connect Data Source
            </button>
        </div>
        <div class="placeholder-content">
            <i class="fas fa-database"></i>
            <h3>Data Sources</h3>
            <p>Connect your databases, APIs, and files to start analyzing data.</p>
        </div>
    `;
}

function renderAnalyticsSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>Analytics</h2>
        </div>
        <div class="placeholder-content">
            <i class="fas fa-chart-line"></i>
            <h3>Analytics Dashboard</h3>
            <p>Track your query performance and usage analytics.</p>
        </div>
    `;
}

function renderTeamSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>Team Management</h2>
            <button class="btn btn-primary">
                <i class="fas fa-user-plus"></i>
                Invite Member
            </button>
        </div>
        <div class="placeholder-content">
            <i class="fas fa-users"></i>
            <h3>Team Collaboration</h3>
            <p>Manage team members and collaboration settings.</p>
        </div>
    `;
}

function renderSettingsSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>Settings</h2>
        </div>
        <div class="placeholder-content">
            <i class="fas fa-cog"></i>
            <h3>Account Settings</h3>
            <p>Manage your account preferences and configurations.</p>
        </div>
    `;
}

// Modal and action functions
function openNewProjectModal() {
    alert('New Project modal will open here! This would allow you to create a new data analysis project.');
}

function openQueryBuilder() {
    // Switch to query builder section
    loadDashboardSection('queries');
    const queryNav = document.querySelector('[data-section="queries"]');
    if (queryNav) {
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(nav => nav.classList.remove('active'));
        queryNav.classList.add('active');
    }
}

function uploadData() {
    alert('Data upload functionality will be available here! You would be able to upload CSV, Excel, and other data files.');
}

function createAgent() {
    alert('Create Agent wizard will open here! This would guide you through creating a custom AI agent for your specific use case.');
}

function startQuickTour() {
    alert('Quick tour will start here! This would provide an interactive walkthrough of Xsight features.');
}

// Register the route
window.router.addRoute('dashboard', renderDashboardPage);="stat-value">24</span>
                        <span class="stat-label">Queries</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">3</span>
                        <span class="stat-label">Agents</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">5</span>
                        <span class="stat-label">Collaborators</span>
                    </div>
                </div>
                <div class="project-actions">
                    <button class="btn btn-outline btn-sm">View Details</button>
                    <button class="btn btn-primary btn-sm">Open Project</button>
                </div>
            </div>

            <div class="project-card">
                <div class="project-header">
                    <h3>Customer Segmentation</h3>
                    <div class="project-menu">
                        <button class="btn btn-icon">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                <p>Advanced customer segmentation using behavioral data</p>
                <div class="project-meta">
                    <span class="project-status active">Active</span>
                    <span class="project-date">Updated yesterday</span>
                </div>
                <div class="project-stats">
                    <div class="stat">
                        <span class="stat-value">18</span>
                        <span class="stat-label">Queries</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">2</span>
                        <span class="stat-label">Agents</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">3</span>
                        <span class="stat-label">Collaborators</span>
                    </div>
                </div>
                <div class="project-actions">
                    <button class="btn btn-outline btn-sm">View Details</button>
                    <button class="btn btn-primary btn-sm">Open Project</button>
                </div>
            </div>

            <div class="project-card">
                <div class="project-header">
                    <h3>Marketing ROI Analysis</h3>
                    <div class="project-menu">
                        <button class="btn btn-icon">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                <p>Measuring return on investment across marketing channels</p>
                <div class="project-meta">
                    <span class="project-status completed">Completed</span>
                    <span class="project-date">Updated 3 days ago</span>
                </div>
                <div class="project-stats">
                    <div class="stat">
                        <span class="stat-value">32</span>
                        <span class="stat-label">Queries</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">4</span>
                        <span class="stat-label">Agents</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">7</span>
                        <span class="stat-label">Collaborators</span>
                    </div>
                </div>
                <div class="project-actions">
                    <button class="btn btn-outline btn-sm">View Details</button>
                    <button class="btn btn-primary btn-sm">Open Project</button>
                </div>
            </div>

            <div class="project-card new-project">
                <div class="new-project-content">
                    <i class="fas fa-plus"></i>
                    <h3>Create New Project</h3>
                    <p>Start building intelligent queries for your data</p>
                    <button class="btn btn-primary" onclick="openNewProjectModal()">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderAgentsSection(container) {
    container.innerHTML = `
        <div class="section-header">
            <h2>AI Agents</h2>
            <div class="section-actions">
                <button class="btn btn-outline">
                    <i class="fas fa-download"></i>
                    Import Agent
                </button>
                <button class="btn btn-primary" onclick="createAgent()">
                    <i class="fas fa-plus"></i>
                    Create Agent
                </button>
            </div>
        </div>

        <div class="agents-grid">
            <div class="agent-card">
                <div class="agent-avatar">
                    <i class="fas fa-chart-bar"></i>
                </div>
                <div class="agent-info">
                    <h3>Sales Analyst</h3>
                    <p>Specialized in sales data analysis and revenue forecasting</p>
                    <div class="agent-tags">
                        <span class="tag">Sales</span>
                        <span class="tag">Revenue</span>
                        <span class="tag">Forecasting</span>
                    </div>
                </div>
                <div class="agent-stats">
                    <div class="stat">
                        <span class="stat-value">156</span>
                        <span class="stat-label">Queries</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">98%</span>
                        <span class="stat-label">Accuracy</span>
                    </div>
                </div>
                <div class="agent-actions">
                    <button class="btn btn-outline btn-sm">Configure</button>
                    <button class="btn btn-primary btn-sm">Use Agent</button>
                </div>
            </div>

            <div class="agent-card">
                <div class="agent-avatar">
                    <i class="fas fa-users"></i>
                </div>
                <div class="agent-info">
                    <h3>Customer Insights</h3>
                    <p>Expert in customer behavior analysis and segmentation</p>
                    <div class="agent-tags">
                        <span class="tag">Customers</span>
                        <span class="tag">Behavior</span>
                        <span class="tag">Segmentation</span>
                    </div>
                </div>
                <div class="agent-stats">
                    <div class="stat">
                        <span class="stat-value">89</span>
                        <span class="stat-label">Queries</span>
                    </div>
                    <div class="stat">
                        <span class
