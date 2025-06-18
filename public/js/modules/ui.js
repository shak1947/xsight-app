// UI Manager - View Management Module
import { showElement, hideElement, hideAllViews, showView, fadeIn, fadeOut, formatFileSize } from '../utils/helpers.js';

export class UIManager {
    constructor() {
        this.currentView = null;
        this.agentsManager = null;
        this.fileUploadManager = null;
        
        // DOM elements
        this.views = {
            dashboard: document.getElementById('dashboardView'),
            projectDetail: document.getElementById('projectDetailView'),
            agentDetail: document.getElementById('agentDetailView'),
            agentForm: document.getElementById('agentFormView')
        };
        
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.errorMessage = document.getElementById('errorMessage');
        this.mainContentArea = document.querySelector('.main-content-area');
        
        this.init();
    }
    
    init() {
        // Show dashboard by default
        this.showDashboard();
        
        // Set up any global UI event listeners
        this.setupGlobalEventListeners();
    }
    
    setupGlobalEventListeners() {
        // Handle escape key to close modals/forms
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handlePopState(e);
        });
    }
    
    handleEscapeKey() {
        // If we're in agent form, go back to previous view
        if (this.currentView === 'agentForm') {
            this.cancelAgentForm();
        }
    }
    
    handlePopState(e) {
        // Handle browser navigation - could be expanded for SPA routing
        console.log('Browser navigation detected');
    }
    
    setManagers(agentsManager, fileUploadManager) {
        this.agentsManager = agentsManager;
        this.fileUploadManager = fileUploadManager;
    }
    
    showDashboard() {
        this.currentView = 'dashboard';
        this.updatePageTitle('Dashboard - Xsight');
        showView(this.views, 'dashboard', this.mainContentArea);
        this.hideLoading();
        this.hideMessage();
        console.log("📱 Showing dashboard view");
    }
    
    showProjectDetail(project) {
        if (!project) {
            console.error('No project provided to showProjectDetail');
            return;
        }
        
        this.currentView = 'projectDetail';
        this.updatePageTitle(`${project.name} - Xsight`);
        
        // Update project detail content
        const projectDetailName = document.getElementById('projectDetailName');
        const projectDetailId = document.getElementById('projectDetailId');
        
        if (projectDetailName) {
            projectDetailName.textContent = project.name;
        }
        if (projectDetailId) {
            projectDetailId.textContent = `ID: ${project.id}`;
        }
        
        showView(this.views, 'projectDetail', this.mainContentArea);
        this.hideLoading();
        console.log("📱 Showing project detail view for:", project.name);
    }
    
    showAgentDetail(agent) {
        if (!agent) {
            console.error('No agent provided to showAgentDetail');
            return;
        }
        
        this.currentView = 'agentDetail';
        this.updatePageTitle(`${agent.name} - Xsight`);
        this.renderAgentDetailView(agent);
        showView(this.views, 'agentDetail', this.mainContentArea);
        this.hideLoading();
        console.log("📱 Showing agent detail view for:", agent.name);
    }
    
    showAgentForm() {
        this.currentView = 'agentForm';
        this.updatePageTitle('Agent Form - Xsight');
        this.renderAgentFormView();
        showView(this.views, 'agentForm', this.mainContentArea);
        this.hideLoading();
        console.log("📱 Showing agent form view");
    }
    
    renderAgentDetailView(agent) {
        if (!this.views.agentDetail) {
            console.error('Agent detail view element not found');
            return;
        }
        
        // Build training materials HTML
        const trainingMaterialsHTML = this.renderTrainingMaterialsList(agent.trainingMaterials || []);
        
        // Build GPT models HTML
        const gptModelsHTML = (agent.selectedGpts || []).length > 0 ? 
            agent.selectedGpts.map(gpt => `<span class="gpt-model-tag">${gpt}</span>`).join(' ') :
            '<p style="color: #64748b; font-style: italic;">No AI models selected.</p>';
        
        // Build instructions HTML
        const instructionsHTML = agent.initialInstructions ? 
            `<pre style="white-space: pre-wrap; font-family: inherit; margin: 0; line-height: 1.5;">${this.escapeHtml(agent.initialInstructions)}</pre>` : 
            '<p style="color: #64748b; font-style: italic;">No initial instructions provided.</p>';
        
        this.views.agentDetail.innerHTML = `
            <div class="agent-detail-header">
                <div class="agent-detail-title">
                    <h2>🤖 ${this.escapeHtml(agent.name)}</h2>
                    <p class="agent-detail-description">${this.escapeHtml(agent.description || 'No description provided.')}</p>
                </div>
                <div class="agent-detail-actions">
                    <button class="logout-btn" style="background-color: #3b82f6; margin-right: 0.5rem;" onclick="showAgentFormForEdit()" title="Edit this agent">
                        ✏️ Edit Agent
                    </button>
                    <button class="logout-btn delete-btn" onclick="deleteAgent()" title="Delete this agent">
                        🗑️ Delete Agent
                    </button>
                </div>
            </div>
            
            <div class="agent-detail-content">
                <!-- Initial Instructions Section -->
                <div class="form-section">
                    <div class="section-title">📝 Initial Instructions</div>
                    <div class="agent-instructions-display">
                        ${instructionsHTML}
                    </div>
                </div>
                
                <!-- AI Models Section -->
                <div class="form-section">
                    <div class="section-title">🧠 Available AI Models</div>
                    <div class="agent-gpt-models">
                        ${gptModelsHTML}
                    </div>
                    ${(agent.selectedGpts || []).length === 0 ? 
                        '<p style="color: #f59e0b; font-size: 0.9rem; margin-top: 0.5rem;">⚠️ No AI models selected. Edit this agent to add models.</p>' : ''
                    }
                </div>
                
                <!-- Training Materials Section -->
                <div class="form-section">
                    <div class="section-title">📁 Training Materials (${(agent.trainingMaterials || []).length})</div>
                    <div id="trainingMaterialsList" class="training-materials-list">
                        ${trainingMaterialsHTML}
                    </div>
                    <div id="fileUploadSection" class="file-upload-section">
                        <!-- File upload UI will be inserted here by FileUploadManager -->
                    </div>
                </div>
                
                <!-- Demo Section -->
                <div class="form-section">
                    <div class="section-title">🚀 Test Your Agent</div>
                    <div class="demo-input-section">
                        <textarea id="demoInput" class="textarea" placeholder="Enter your query or question for the agent...

Examples:
• Analyze this data and provide insights
• Summarize the key points from the uploaded documents
• Generate a report based on the training materials
• Answer questions about the uploaded content" rows="6"></textarea>
                        <div class="char-hint">
                            Enter a question or prompt to test how your agent would respond based on its training materials and selected AI models.
                        </div>
                        <button onclick="runDemo()" class="analyze-btn" style="margin-top: 1rem;" 
                                ${(agent.selectedGpts || []).length === 0 ? 'disabled title="Please add AI models to this agent first"' : ''}>
                            🤖 Run Demo Query
                        </button>
                        ${(agent.selectedGpts || []).length === 0 ? 
                            '<p style="color: #f59e0b; font-size: 0.85rem; margin-top: 0.5rem;">⚠️ Add AI models to this agent to enable demo functionality.</p>' : ''
                        }
                    </div>
                </div>
                
                <!-- Demo Results -->
                <div id="agentDemoResults" class="results" style="display: none;">
                    <!-- Demo results will be inserted here -->
                </div>
            </div>
        `;
        
        // Initialize file upload for this agent
        if (this.fileUploadManager) {
            setTimeout(() => {
                this.fileUploadManager.initializeForAgent(agent.id);
            }, 100);
        }
        
        // Add any additional event listeners for this view
        this.setupAgentDetailEventListeners();
    }
    
    setupAgentDetailEventListeners() {
        // Add enter key support for demo input
        const demoInput = document.getElementById('demoInput');
        if (demoInput) {
            demoInput.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    e.preventDefault();
                    if (window.runDemo) {
                        window.runDemo();
                    }
                }
            });
        }
        
        // Auto-resize textarea
        if (demoInput) {
            demoInput.addEventListener('input', () => {
                demoInput.style.height = 'auto';
                demoInput.style.height = demoInput.scrollHeight + 'px';
            });
        }
    }
    
    renderAgentFormView() {
        if (!this.views.agentForm) {
            console.error('Agent form view element not found');
            return;
        }
        
        this.views.agentForm.innerHTML = `
            <div class="form-section">
                <div id="agentFormTitle" class="section-title">➕ Create New Agent</div>
                
                <form id="agentForm" novalidate>
                    <div class="form-field" style="margin-bottom: 1.5rem;">
                        <label for="agentFormName" class="form-label">Agent Name *</label>
                        <input type="text" id="agentFormName" class="form-input" 
                               placeholder="e.g., Customer Support Bot, Data Analyst, Content Creator" 
                               required maxlength="100">
                        <div class="field-hint">Choose a descriptive name for your agent (max 100 characters)</div>
                    </div>
                    
                    <div class="form-field" style="margin-bottom: 1.5rem;">
                        <label for="agentFormDescription" class="form-label">Description</label>
                        <textarea id="agentFormDescription" class="form-textarea" 
                                  placeholder="Describe what this agent does, its purpose, and how it should behave...

Examples:
• A customer support agent that helps users with product questions
• A data analyst that provides insights from uploaded datasets
• A content creator that generates marketing copy" 
                                  rows="4" maxlength="500"></textarea>
                        <div class="field-hint">Provide a clear description of the agent's purpose and capabilities (max 500 characters)</div>
                    </div>
                    
                    <div class="form-field" style="margin-bottom: 1.5rem;">
                        <label for="agentFormInitialInstructions" class="form-label">Initial Instructions</label>
                        <textarea id="agentFormInitialInstructions" class="form-textarea" 
                                  placeholder="Enter detailed instructions for the agent...

Example:
You are a helpful customer support representative. Always:
- Be polite and professional
- Ask clarifying questions when needed
- Use the uploaded knowledge base to answer questions
- If you don't know something, admit it and offer to escalate
- Keep responses concise but thorough" 
                                  rows="8" maxlength="2000"></textarea>
                        <div class="field-hint">These instructions will be sent to the AI model before each conversation (max 2000 characters)</div>
                    </div>
                    
                    <div class="form-field" style="margin-bottom: 2rem;">
                        <label class="form-label">AI Models to Use *</label>
                        <div id="gptFormSelectionOptions" class="gpt-selection-container">
                            <p style="color: #64748b; font-size: 0.85rem;">Loading AI model options...</p>
                        </div>
                        <div class="field-hint">Select which AI models this agent can use. Different models have different strengths.</div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" id="agentFormSubmitBtn" class="btn-primary">
                            Create Agent
                        </button>
                        <button type="button" id="agentFormCancelBtn" class="btn-secondary">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        // Add form event listeners
        this.setupAgentFormEventListeners();
    }
    
    setupAgentFormEventListeners() {
        // Character counters for text inputs
        const nameInput = document.getElementById('agentFormName');
        const descInput = document.getElementById('agentFormDescription');
        const instructionsInput = document.getElementById('agentFormInitialInstructions');
        
        [nameInput, descInput, instructionsInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => this.updateCharacterCount(input));
            }
        });
        
        // Auto-resize textareas
        [descInput, instructionsInput].forEach(textarea => {
            if (textarea) {
                textarea.addEventListener('input', () => {
                    textarea.style.height = 'auto';
                    textarea.style.height = textarea.scrollHeight + 'px';
                });
            }
        });
        
        // Form validation on submit
        const form = document.getElementById('agentForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                if (!this.validateAgentForm()) {
                    e.preventDefault();
                }
            });
        }
    }
    
    updateCharacterCount(input) {
        const maxLength = input.getAttribute('maxlength');
        const currentLength = input.value.length;
        
        if (maxLength) {
            let hintElement = input.parentNode.querySelector('.field-hint');
            if (hintElement) {
                const originalText = hintElement.textContent;
                const countText = `${currentLength}/${maxLength} characters`;
                
                if (!originalText.includes('characters)')) {
                    hintElement.textContent = originalText + ` (${countText})`;
                } else {
                    hintElement.textContent = originalText.replace(/\(\d+\/\d+ characters\)/, `(${countText})`);
                }
                
                // Color code based on usage
                if (currentLength > maxLength * 0.9) {
                    hintElement.style.color = '#ef4444';
                } else if (currentLength > maxLength * 0.7) {
                    hintElement.style.color = '#f59e0b';
                } else {
                    hintElement.style.color = '#64748b';
                }
            }
        }
    }
    
    validateAgentForm() {
        const nameInput = document.getElementById('agentFormName');
        const gptOptions = document.getElementById('gptFormSelectionOptions');
        
        let isValid = true;
        let errors = [];
        
        // Validate name
        if (!nameInput?.value.trim()) {
            errors.push('Agent name is required');
            isValid = false;
            if (nameInput) {
                nameInput.style.borderColor = '#ef4444';
                nameInput.focus();
            }
        } else if (nameInput) {
            nameInput.style.borderColor = '#cbd5e1';
        }
        
        // Validate at least one GPT model is selected
        const selectedGpts = gptOptions?.querySelectorAll('input[name="selectedGpts"]:checked');
        if (!selectedGpts || selectedGpts.length === 0) {
            errors.push('Please select at least one AI model');
            isValid = false;
            if (gptOptions) {
                gptOptions.style.borderColor = '#ef4444';
            }
        } else if (gptOptions) {
            gptOptions.style.borderColor = '#e2e8f0';
        }
        
        // Show errors
        if (errors.length > 0) {
            this.showError(errors.join('. '));
        } else {
            this.hideMessage();
        }
        
        return isValid;
    }
    
    renderTrainingMaterialsList(materials) {
        if (!materials || materials.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-state-icon">📄</div>
                    <p class="empty-state-text">No training materials uploaded yet</p>
                    <p class="empty-state-hint">Upload documents, PDFs, or text files to train your agent</p>
                </div>
            `;
        }
        
        return `
            <div class="training-materials-grid">
                ${materials.map(material => `
                    <div class="training-material-item">
                        <div class="training-material-header">
                            <div class="training-material-icon">
                                ${this.getFileIcon(material.name)}
                            </div>
                            <div class="training-material-info">
                                <div class="training-material-name" title="${this.escapeHtml(material.name)}">
                                    ${this.escapeHtml(this.truncateFileName(material.name, 30))}
                                </div>
                                <div class="training-material-meta">
                                    <span>${formatFileSize(material.size)}</span>
                                    <span>•</span>
                                    <span>${this.formatDate(material.uploadedAt)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="training-material-actions">
                            <button class="training-material-action-btn view-btn" onclick="window.open('${material.url}', '_blank')" title="View file">
                                👁️
                            </button>
                            <button class="training-material-action-btn delete-btn" onclick="deleteTrainingMaterial('${this.escapeHtml(material.name)}')" title="Delete file">
                                🗑️
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    getFileIcon(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        const iconMap = {
            'pdf': '📄',
            'doc': '📝',
            'docx': '📝',
            'txt': '📃',
            'md': '📃',
            'csv': '📊',
            'json': '🔧',
            'xlsx': '📊',
            'xls': '📊'
        };
        return iconMap[extension] || '📄';
    }
    
    truncateFileName(fileName, maxLength) {
        if (fileName.length <= maxLength) return fileName;
        
        const extension = fileName.split('.').pop();
        const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf('.'));
        const truncatedName = nameWithoutExt.slice(0, maxLength - extension.length - 4) + '...';
        
        return truncatedName + '.' + extension;
    }
    
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now - date;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) {
                return 'Today';
            } else if (diffDays === 1) {
                return 'Yesterday';
            } else if (diffDays < 7) {
                return `${diffDays} days ago`;
            } else {
                return date.toLocaleDateString();
            }
        } catch (error) {
            return 'Unknown date';
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    updatePageTitle(title) {
        document.title = title;
    }
    
    showLoading() {
        showElement(this.loadingIndicator);
        if (this.mainContentArea) {
            this.mainContentArea.style.opacity = '0.6';
            this.mainContentArea.style.pointerEvents = 'none';
        }
    }
    
    hideLoading() {
        hideElement(this.loadingIndicator);
        if (this.mainContentArea) {
            this.mainContentArea.style.opacity = '1';
            this.mainContentArea.style.pointerEvents = 'auto';
        }
    }
    
    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.className = 'error-message error';
            showElement(this.errorMessage);
            
            // Scroll to message
            this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    showSuccess(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.className = 'error-message success';
            showElement(this.errorMessage);
            
            // Auto-hide success messages after 5 seconds
            setTimeout(() => {
                this.hideMessage();
            }, 5000);
            
            // Scroll to message
            this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    hideMessage() {
        hideElement(this.errorMessage);
    }
    
    cancelAgentForm() {
        // Reset any form validation states
        const form = document.getElementById('agentForm');
        if (form) {
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.style.borderColor = '';
            });
        }
        
        // Navigate back to appropriate view
        if (this.agentsManager && this.agentsManager.getSelectedAgent()) {
            const agent = this.agentsManager.getSelectedAgent();
            this.showAgentDetail(agent);
        } else {
            // Go back to project view or dashboard
            const selectedProject = window.projectsManager?.getSelectedProject();
            if (selectedProject) {
                this.showProjectDetail(selectedProject);
            } else {
                this.showDashboard();
            }
        }
    }
    
    getCurrentView() {
        return this.currentView;
    }
    
    // Utility method to refresh current view
    refreshCurrentView() {
        switch (this.currentView) {
            case 'agentDetail':
                if (this.agentsManager) {
                    const agent = this.agentsManager.getSelectedAgent();
                    if (agent) {
                        this.showAgentDetail(agent);
                    }
                }
                break;
            case 'projectDetail':
                if (window.projectsManager) {
                    const project = window.projectsManager.getSelectedProject();
                    if (project) {
                        this.showProjectDetail(project);
                    }
                }
                break;
            default:
                // No refresh needed for dashboard or form views
                break;
        }
    }
    
    // Method to show confirmation dialogs
    showConfirmDialog(message, onConfirm, onCancel = null) {
        const result = window.confirm(message);
        if (result && onConfirm) {
            onConfirm();
        } else if (!result && onCancel) {
            onCancel();
        }
        return result;
    }
}
