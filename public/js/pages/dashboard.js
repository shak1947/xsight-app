// Dashboard Page Module
export function renderDashboardPage() {
    const app = document.getElementById('app');
    
    // Check if user is authenticated
    const currentUser = window.currentUser || window.authManager?.getCurrentUser();
    if (!currentUser) {
        window.router.navigateTo('login');
        return;
    }
    
    app.innerHTML = `
        <div class="dashboard">
            <!-- Dashboard Header -->
            <header class="dashboard-header">
                <div class="dashboard-nav">
                    <h1>Welcome back, ${currentUser.displayName || currentUser.email || 'User'}!</h1>
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

            <!-- Main Dashboard Content -->
            <div class="dashboard-content">
                <div class="dashboard-layout">
                    <!-- Projects Section -->
                    <div class="projects-section">
                        <div class="section-header">
                            <h2><i class="fas fa-folder"></i> Projects</h2>
                            <button class="btn btn-sm btn-outline" id="createProjectBtn">
                                <i class="fas fa-plus"></i> New Project
                            </button>
                        </div>
                        <div id="projectsList" class="projects-list">
                            <div class="loading-spinner">
                                <i class="fas fa-spinner fa-spin"></i>
                                <p>Loading projects...</p>
                            </div>
                        </div>
                    </div>

                    <!-- Agents Section -->
                    <div class="agents-section">
                        <div class="section-header">
                            <h2><i class="fas fa-robot"></i> AI Agents</h2>
                            <button class="btn btn-sm btn-outline" id="createAgentBtn" disabled>
                                <i class="fas fa-plus"></i> New Agent
                            </button>
                        </div>
                        <div id="agentsList" class="agents-list">
                            <div class="empty-state">
                                <i class="fas fa-robot fa-3x"></i>
                                <p>Select a project to view agents</p>
                            </div>
                        </div>
                    </div>

                    <!-- Agent Details Section -->
                    <div class="agent-details-section">
                        <div class="section-header">
                            <h2><i class="fas fa-cog"></i> Agent Configuration</h2>
                        </div>
                        <div id="agentDetails" class="agent-details">
                            <div class="empty-state">
                                <i class="fas fa-cogs fa-3x"></i>
                                <p>Select an agent to configure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Project Creation Modal -->
        <div id="projectModal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Project</h3>
                    <button class="close-btn" onclick="closeProjectModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="projectForm">
                        <div class="form-group">
                            <label for="projectName">Project Name</label>
                            <input type="text" id="projectName" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="projectDescription">Description</label>
                            <textarea id="projectDescription" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline" onclick="closeProjectModal()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Create Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Agent Creation Modal -->
        <div id="agentModal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Agent</h3>
                    <button class="close-btn" onclick="closeAgentModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="agentForm">
                        <div class="form-group">
                            <label for="agentName">Agent Name</label>
                            <input type="text" id="agentName" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="agentDescription">Description</label>
                            <textarea id="agentDescription" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="agentInstructions">Initial Instructions</label>
                            <textarea id="agentInstructions" class="form-control" rows="4" 
                                placeholder="Tell the AI agent how it should behave and what it should focus on..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Select AI Models</label>
                            <div class="model-selection">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="models" value="gpt-3.5"> GPT-3.5
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="models" value="gpt-4"> GPT-4
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="models" value="claude-2"> Claude 2
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="models" value="palm-2"> PaLM 2
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="models" value="llama-2"> Llama 2
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="models" value="gemini"> Gemini
                                </label>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline" onclick="closeAgentModal()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Create Agent</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Initialize dashboard functionality
    initializeDashboard();
}

function initializeDashboard() {
    // Set up event listeners
    setupProjectButtons();
    setupAgentButtons();
    setupForms();
    
    // Load initial data
    loadProjects();
    
    // Initialize managers if available
    if (window.projectsManager) {
        window.projectsManager.initialize();
    }
    if (window.agentsManager) {
        window.agentsManager.initialize();
    }
}

function setupProjectButtons() {
    const newProjectBtn = document.getElementById('newProjectBtn');
    const createProjectBtn = document.getElementById('createProjectBtn');
    
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', openProjectModal);
    }
    if (createProjectBtn) {
        createProjectBtn.addEventListener('click', openProjectModal);
    }
}

function setupAgentButtons() {
    const createAgentBtn = document.getElementById('createAgentBtn');
    if (createAgentBtn) {
        createAgentBtn.addEventListener('click', openAgentModal);
    }
}

function setupForms() {
    const projectForm = document.getElementById('projectForm');
    const agentForm = document.getElementById('agentForm');
    
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectCreation);
    }
    if (agentForm) {
        agentForm.addEventListener('submit', handleAgentCreation);
    }
}

function openProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('projectName')?.focus();
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('projectForm')?.reset();
    }
}

window.closeProjectModal = closeProjectModal;

function openAgentModal() {
    const modal = document.getElementById('agentModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('agentName')?.focus();
    }
}

function closeAgentModal() {
    const modal = document.getElementById('agentModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('agentForm')?.reset();
    }
}

window.closeAgentModal = closeAgentModal;

async function handleProjectCreation(e) {
    e.preventDefault();
    
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    
    try {
        if (window.projectsManager && window.projectsManager.createProject) {
            await window.projectsManager.createProject({ name, description });
        } else {
            // Fallback: Direct Firebase call
            console.log('Creating project:', { name, description });
            // Add your Firebase logic here
        }
        
        closeProjectModal();
        loadProjects();
    } catch (error) {
        console.error('Error creating project:', error);
        alert('Failed to create project. Please try again.');
    }
}

async function handleAgentCreation(e) {
    e.preventDefault();
    
    const name = document.getElementById('agentName').value;
    const description = document.getElementById('agentDescription').value;
    const instructions = document.getElementById('agentInstructions').value;
    const selectedModels = Array.from(document.querySelectorAll('input[name="models"]:checked'))
        .map(cb => cb.value);
    
    try {
        if (window.agentsManager && window.agentsManager.createAgent) {
            await window.agentsManager.createAgent({
                name,
                description,
                initialInstructions: instructions,
                selectedGpts: selectedModels
            });
        } else {
            // Fallback logic
            console.log('Creating agent:', { name, description, instructions, selectedModels });
        }
        
        closeAgentModal();
        // Reload agents for current project
    } catch (error) {
        console.error('Error creating agent:', error);
        alert('Failed to create agent. Please try again.');
    }
}

async function loadProjects() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;
    
    try {
        // Use existing project manager if available
        if (window.projectsManager && window.projectsManager.loadProjects) {
            await window.projectsManager.loadProjects();
        } else {
            // Show some demo projects for now
            projectsList.innerHTML = `
                <div class="project-card">
                    <h4>Sample Project</h4>
                    <p>This is a demo project. Create your first project to get started!</p>
                    <button class="btn btn-sm btn-outline">Select</button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsList.innerHTML = '<p class="error">Failed to load projects</p>';
    }
}

// Register the route
if (window.router) {
    window.router.addRoute('dashboard', renderDashboardPage);
}
