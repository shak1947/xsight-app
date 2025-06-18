// Agents Management Module
import { db, collection, query, onSnapshot, addDoc, doc, deleteDoc, updateDoc, getDocs } from '../config/firebase.js';
import { getPrivateBasePath, getPublicBasePath, showMessage, findById, clearForm } from '../utils/helpers.js';

export class AgentsManager {
    constructor(authManager, uiManager, projectsManager) {
        this.authManager = authManager;
        this.uiManager = uiManager;
        this.projectsManager = projectsManager;
        this.agents = [];
        this.selectedAgentId = null;
        this.currentAgentBeingEditedId = null;
        this.availableGptModels = [];
        this.agentsUnsubscribe = null;
        this.gptModelsUnsubscribe = null;
        
        // DOM elements
        this.agentsList = document.getElementById('agentsList');
        this.agentsInProjectList = document.getElementById('agentsInProjectList');
        this.agentForm = document.getElementById('agentForm');
        this.agentFormTitle = document.getElementById('agentFormTitle');
        this.agentFormNameInput = document.getElementById('agentFormName');
        this.agentFormDescriptionInput = document.getElementById('agentFormDescription');
        this.agentFormInitialInstructionsInput = document.getElementById('agentFormInitialInstructions');
        this.gptFormSelectionOptionsDiv = document.getElementById('gptFormSelectionOptions');
        this.agentFormSubmitBtn = document.getElementById('agentFormSubmitBtn');
        this.agentFormCancelBtn = document.getElementById('agentFormCancelBtn');
        
        this.init();
    }
    
    init() {
        // Set up form submission
        if (this.agentForm) {
            this.agentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveAgent();
            });
        }
        
        // Set up cancel button
        if (this.agentFormCancelBtn) {
            this.agentFormCancelBtn.addEventListener('click', () => {
                this.cancelAgentForm();
            });
        }
        
        // Listen for auth changes
        this.authManager.onAuthChange((user) => {
            if (user) {
                this.setupAgentsListener();
                this.setupGptModelsListener();
                this.seedGptModels();
            } else {
                this.cleanup();
            }
        });
        
        // Listen for project selection changes
        this.projectsManager.onProjectSelect((projectId) => {
            this.renderAgentsSidebar();
            this.renderAgentsInProject();
        });
        
        // Make global functions available
        window.showAgentFormForCreate = () => this.showAgentFormForCreate();
        window.showAgentFormForEdit = () => this.showAgentFormForEdit();
        window.deleteAgent = () => this.deleteAgent();
    }
    
    setupAgentsListener() {
        const userId = this.authManager.getCurrentUserId();
        if (!userId) return;
        
        if (this.agentsUnsubscribe) this.agentsUnsubscribe();
        
        const agentsColRef = collection(db, `${getPrivateBasePath(userId)}/agents`);
        const q = query(agentsColRef);
        
        this.agentsUnsubscribe = onSnapshot(q, (snapshot) => {
            this.agents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.renderAgentsSidebar();
            this.renderAgentsInProject();
            console.log("Agents updated:", this.agents);
            
            // Check if selected agent still exists
            if (this.selectedAgentId && !findById(this.agents, this.selectedAgentId)) {
                this.selectedAgentId = null;
                const selectedProjectId = this.projectsManager.getSelectedProjectId();
                if (selectedProjectId) {
                    this.uiManager.showProjectDetail(this.projectsManager.getSelectedProject());
                } else {
                    this.uiManager.showDashboard();
                }
            }
        }, (error) => {
            console.error("Error fetching agents:", error);
            showMessage(document.getElementById('errorMessage'), "Failed to load agents.", false);
        });
    }
    
    setupGptModelsListener() {
        if (this.gptModelsUnsubscribe) this.gptModelsUnsubscribe();
        
        const gptModelsColRef = collection(db, `${getPublicBasePath()}/gptModels`);
        const q = query(gptModelsColRef);
        
        this.gptModelsUnsubscribe = onSnapshot(q, (snapshot) => {
            this.availableGptModels = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Available GPT models:", this.availableGptModels);
            this.renderAgentFormGptOptions();
        }, (error) => {
            console.error("Error fetching GPT models:", error);
            if (this.gptFormSelectionOptionsDiv) {
                this.gptFormSelectionOptionsDiv.innerHTML = '<p style="color:red; font-size:0.85rem;">Failed to load GPT options.</p>';
            }
        });
    }
    
    async seedGptModels() {
        const gptModelsColRef = collection(db, `${getPublicBasePath()}/gptModels`);
        const snapshot = await getDocs(gptModelsColRef);
        
        if (snapshot.empty) {
            console.log("Seeding GPT models...");
            const defaultGpts = [
                { name: "ChatGPT (GPT-3.5)" },
                { name: "ChatGPT (GPT-4)" },
                { name: "Gemini Pro" },
                { name: "Gemini Flash" },
                { name: "Claude Haiku" },
                { name: "Claude Sonnet" },
                { name: "Claude Opus" },
                { name: "DeepSeek" }
            ];
            
            for (const gpt of defaultGpts) {
                await addDoc(gptModelsColRef, gpt);
            }
            console.log("GPT models seeded successfully.");
        }
    }
    
    renderAgentsSidebar() {
        if (!this.agentsList) return;
        
        const selectedProjectId = this.projectsManager.getSelectedProjectId();
        this.agentsList.innerHTML = '';
        
        if (!selectedProjectId) {
            this.agentsList.innerHTML = '<li class="sidebar-list-item" style="font-size:0.9rem; color: #64748b;">Select a project.</li>';
            return;
        }
        
        const agentsInCurrentProject = this.agents.filter(agent => agent.projectId === selectedProjectId);
        
        if (agentsInCurrentProject.length === 0) {
            this.agentsInProjectList.innerHTML = '<p style="color: #64748b; font-style: italic;">No agents in this project yet. Click "Create New Agent" to get started!</p>';
            return;
        }
        
        agentsInCurrentProject.forEach(agent => {
            const agentDiv = document.createElement('div');
            agentDiv.className = 'agent-in-project-item';
            agentDiv.innerHTML = `
                <div class="agent-item-header">
                    <h3>🤖 ${agent.name}</h3>
                    <div class="agent-item-actions">
                        <button onclick="window.selectAgent('${agent.id}')" class="agent-action-btn select-btn">Open</button>
                    </div>
                </div>
                <p class="agent-item-description">${agent.description || 'No description provided.'}</p>
                <div class="agent-item-stats">
                    <span>📁 ${(agent.trainingMaterials || []).length} files</span>
                    <span>🧠 ${(agent.selectedGpts || []).length} AI models</span>
                </div>
            `;
            this.agentsInProjectList.appendChild(agentDiv);
        });
    }
    
    selectAgent(agentId) {
        this.selectedAgentId = agentId;
        const agent = findById(this.agents, agentId);
        
        if (agent) {
            this.renderAgentsSidebar(); // Update active state
            this.uiManager.showAgentDetail(agent);
        } else {
            console.error("Agent not found:", agentId);
            showMessage(document.getElementById('errorMessage'), "Agent not found.", false);
        }
    }
    
    showAgentFormForCreate() {
        const selectedProjectId = this.projectsManager.getSelectedProjectId();
        if (!selectedProjectId) {
            showMessage(document.getElementById('errorMessage'), "Please select a project first.", false);
            return;
        }
        
        this.currentAgentBeingEditedId = null;
        
        if (this.agentFormTitle) {
            this.agentFormTitle.textContent = "➕ Create New Agent";
        }
        if (this.agentFormSubmitBtn) {
            this.agentFormSubmitBtn.textContent = "Create Agent";
            this.agentFormSubmitBtn.style.backgroundColor = '#10b981';
        }
        
        // Clear form
        if (this.agentForm) {
            clearForm(this.agentForm);
        }
        
        this.renderAgentFormGptOptions();
        this.uiManager.showAgentForm();
    }
    
    showAgentFormForEdit() {
        const targetAgentId = this.selectedAgentId;
        const agent = findById(this.agents, targetAgentId);
        
        if (!agent) {
            showMessage(document.getElementById('errorMessage'), "Agent not found for editing.", false);
            return;
        }
        
        this.currentAgentBeingEditedId = targetAgentId;
        
        if (this.agentFormTitle) {
            this.agentFormTitle.textContent = `✏️ Edit Agent: ${agent.name}`;
        }
        if (this.agentFormSubmitBtn) {
            this.agentFormSubmitBtn.textContent = "Update Agent";
            this.agentFormSubmitBtn.style.backgroundColor = '#3b82f6';
        }
        
        // Populate form with existing data
        if (this.agentFormNameInput) {
            this.agentFormNameInput.value = agent.name || '';
        }
        if (this.agentFormDescriptionInput) {
            this.agentFormDescriptionInput.value = agent.description || '';
        }
        if (this.agentFormInitialInstructionsInput) {
            this.agentFormInitialInstructionsInput.value = agent.initialInstructions || '';
        }
        
        this.renderAgentFormGptOptions(agent.selectedGpts || []);
        this.uiManager.showAgentForm();
    }
    
    renderAgentFormGptOptions(selectedGpts = []) {
        if (!this.gptFormSelectionOptionsDiv) return;
        
        this.gptFormSelectionOptionsDiv.innerHTML = '';
        
        if (this.availableGptModels.length === 0) {
            this.gptFormSelectionOptionsDiv.innerHTML = '<p style="color:#64748b; font-size:0.85rem;">Loading GPT options...</p>';
            return;
        }
        
        this.availableGptModels.forEach(gpt => {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'gpt-option-checkbox';
            checkboxDiv.style.marginBottom = '0.5rem';
            
            const isChecked = selectedGpts.includes(gpt.name);
            
            checkboxDiv.innerHTML = `
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" name="selectedGpts" value="${gpt.name}" ${isChecked ? 'checked' : ''} 
                           style="cursor: pointer;">
                    <span>${gpt.name}</span>
                </label>
            `;
            
            this.gptFormSelectionOptionsDiv.appendChild(checkboxDiv);
        });
    }
    
    async saveAgent() {
        const userId = this.authManager.getCurrentUserId();
        const selectedProjectId = this.projectsManager.getSelectedProjectId();
        
        if (!userId || !selectedProjectId) {
            showMessage(document.getElementById('errorMessage'), "Please select a project and ensure you're logged in.", false);
            return;
        }
        
        // Get form data
        const name = this.agentFormNameInput?.value.trim();
        const description = this.agentFormDescriptionInput?.value.trim();
        const initialInstructions = this.agentFormInitialInstructionsInput?.value.trim();
        
        if (!name) {
            showMessage(document.getElementById('errorMessage'), "Agent name is required.", false);
            return;
        }
        
        // Get selected GPT models
        const selectedGpts = [];
        const checkboxes = this.gptFormSelectionOptionsDiv?.querySelectorAll('input[name="selectedGpts"]:checked');
        if (checkboxes) {
            checkboxes.forEach(checkbox => selectedGpts.push(checkbox.value));
        }
        
        const agentData = {
            name,
            description,
            initialInstructions,
            selectedGpts,
            projectId: selectedProjectId,
            userId,
            updatedAt: new Date()
        };
        
        try {
            if (this.currentAgentBeingEditedId) {
                // Update existing agent
                const agentDocRef = doc(db, `${getPrivateBasePath(userId)}/agents`, this.currentAgentBeingEditedId);
                await updateDoc(agentDocRef, agentData);
                showMessage(document.getElementById('errorMessage'), "Agent updated successfully!", true);
            } else {
                // Create new agent
                agentData.createdAt = new Date();
                agentData.trainingMaterials = [];
                
                const agentsColRef = collection(db, `${getPrivateBasePath(userId)}/agents`);
                await addDoc(agentsColRef, agentData);
                showMessage(document.getElementById('errorMessage'), "Agent created successfully!", true);
            }
            
            // Return to project view
            const project = this.projectsManager.getSelectedProject();
            if (project) {
                this.uiManager.showProjectDetail(project);
            } else {
                this.uiManager.showDashboard();
            }
        } catch (error) {
            console.error("Error saving agent:", error);
            showMessage(document.getElementById('errorMessage'), `Error saving agent: ${error.message}`, false);
        }
    }
    
    cancelAgentForm() {
        const project = this.projectsManager.getSelectedProject();
        if (project) {
            this.uiManager.showProjectDetail(project);
        } else {
            this.uiManager.showDashboard();
        }
    }
    
    async deleteAgent() {
        if (!this.selectedAgentId) return;
        
        const userId = this.authManager.getCurrentUserId();
        if (!userId) return;
        
        const agent = findById(this.agents, this.selectedAgentId);
        if (!agent) return;
        
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the agent "${agent.name}" and all its training materials? This action cannot be undone.`
        );
        if (!confirmDelete) return;
        
        try {
            this.uiManager.showLoading();
            
            // Delete agent document
            const agentDocRef = doc(db, `${getPrivateBasePath(userId)}/agents`, this.selectedAgentId);
            await deleteDoc(agentDocRef);
            
            showMessage(document.getElementById('errorMessage'), "Agent deleted successfully!", true);
            this.selectedAgentId = null;
            
            // Return to project view
            const project = this.projectsManager.getSelectedProject();
            if (project) {
                this.uiManager.showProjectDetail(project);
            } else {
                this.uiManager.showDashboard();
            }
        } catch (error) {
            console.error("Error deleting agent:", error);
            showMessage(document.getElementById('errorMessage'), `Error deleting agent: ${error.message}`, false);
        } finally {
            this.uiManager.hideLoading();
        }
    }
    
    // Getters for other modules
    getAgents() {
        return this.agents;
    }
    
    getSelectedAgentId() {
        return this.selectedAgentId;
    }
    
    getSelectedAgent() {
        return findById(this.agents, this.selectedAgentId);
    }
    
    getAgentsInProject(projectId) {
        return this.agents.filter(agent => agent.projectId === projectId);
    }
    
    cleanup() {
        if (this.agentsUnsubscribe) {
            this.agentsUnsubscribe();
            this.agentsUnsubscribe = null;
        }
        if (this.gptModelsUnsubscribe) {
            this.gptModelsUnsubscribe();
            this.gptModelsUnsubscribe = null;
        }
        
        this.agents = [];
        this.selectedAgentId = null;
        this.currentAgentBeingEditedId = null;
        this.availableGptModels = [];
    }
}

// Make selectAgent globally available
window.selectAgent = function(agentId) {
    if (window.agentsManager) {
        window.agentsManager.selectAgent(agentId);
    }
};entsInCurrentProject.length === 0) {
            this.agentsList.innerHTML = '<li class="sidebar-list-item" style="font-size:0.9rem; color: #64748b;">No agents in this project.</li>';
            return;
        }
        
        agentsInCurrentProject.forEach(agent => {
            const li = document.createElement('li');
            li.className = 'sidebar-list-item sidebar-sub-list-item';
            
            if (this.selectedAgentId === agent.id) {
                li.classList.add('active');
            }
            
            const link = document.createElement('a');
            link.href = "#";
            link.innerHTML = `🤖 ${agent.name}`;
            link.onclick = (e) => {
                e.preventDefault();
                this.selectAgent(agent.id);
            };
            
            li.appendChild(link);
            this.agentsList.appendChild(li);
        });
    }
    
    renderAgentsInProject() {
        if (!this.agentsInProjectList) return;
        
        const selectedProjectId = this.projectsManager.getSelectedProjectId();
        this.agentsInProjectList.innerHTML = '';
        
        if (!selectedProjectId) return;
        
        const agentsInCurrentProject = this.agents.filter(agent => agent.projectId === selectedProjectId);
        
        if (ag
