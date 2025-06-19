// Projects Management Module
import { db, collection, query, onSnapshot, addDoc, doc, deleteDoc } from '../config/firebase-config.js';
import { getPrivateBasePath, showMessage, findById } from '../utils/helpers.js';

export class ProjectsManager {
    constructor(authManager, uiManager) {
        this.authManager = authManager;
        this.uiManager = uiManager;
        this.projects = [];
        this.selectedProjectId = null;
        this.unsubscribe = null;
        
        // DOM elements
        this.projectsList = document.getElementById('projectsList');
        this.createProjectForm = document.getElementById('createProjectForm');
        this.newProjectNameInput = document.getElementById('newProjectName');
        this.projectDetailName = document.getElementById('projectDetailName');
        this.projectDetailId = document.getElementById('projectDetailId');
        
        this.init();
    }
    
    init() {
        // Set up form submission
        if (this.createProjectForm) {
            this.createProjectForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createProject();
            });
        }
        
        // Listen for auth changes
        this.authManager.onAuthChange((user) => {
            if (user) {
                this.setupProjectsListener();
            } else {
                this.cleanup();
            }
        });
        
        // Make delete function globally available
        window.deleteProject = () => this.deleteProject();
    }
    
    setupProjectsListener() {
        const userId = this.authManager.getCurrentUserId();
        if (!userId) return;
        
        // Clean up previous listener
        if (this.unsubscribe) this.unsubscribe();
        
        const projectsColRef = collection(db, `${getPrivateBasePath(userId)}/projects`);
        const q = query(projectsColRef);
        
        this.unsubscribe = onSnapshot(q, (snapshot) => {
            this.projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.renderProjects();
            console.log("Projects updated:", this.projects);
            
            // Check if selected project still exists
            if (this.selectedProjectId && !findById(this.projects, this.selectedProjectId)) {
                this.selectedProjectId = null;
                this.uiManager.showDashboard();
            }
        }, (error) => {
            console.error("Error fetching projects:", error);
            showMessage(
                document.getElementById('errorMessage'), 
                "Failed to load projects. Please try refreshing the page.", 
                false
            );
        });
    }
    
    renderProjects() {
        if (!this.projectsList) return;
        
        this.projectsList.innerHTML = '';
        
        if (this.projects.length === 0) {
            this.projectsList.innerHTML = '<li class="sidebar-list-item" style="font-size:0.9rem; color: #64748b;">No projects yet. Create one!</li>';
            return;
        }
        
        this.projects.forEach(project => {
            const li = document.createElement('li');
            li.className = 'sidebar-list-item';
            
            if (this.selectedProjectId === project.id) {
                li.classList.add('active');
            }
            
            const button = document.createElement('button');
            button.innerHTML = `📁 ${project.name}`;
            button.onclick = () => this.selectProject(project.id);
            
            li.appendChild(button);
            this.projectsList.appendChild(li);
        });
    }
    
    async createProject() {
        const userId = this.authManager.getCurrentUserId();
        if (!userId) {
            showMessage(document.getElementById('errorMessage'), "Please log in to create projects.", false);
            return;
        }
        
        const projectName = this.newProjectNameInput.value.trim();
        if (!projectName) {
            showMessage(document.getElementById('errorMessage'), "Project name cannot be empty.", false);
            return;
        }
        
        try {
            const projectsColRef = collection(db, `${getPrivateBasePath(userId)}/projects`);
            await addDoc(projectsColRef, {
                name: projectName,
                createdAt: new Date(),
                userId: userId
            });
            
            this.newProjectNameInput.value = '';
            showMessage(document.getElementById('errorMessage'), "Project created successfully!", true);
        } catch (error) {
            console.error("Error creating project:", error);
            showMessage(document.getElementById('errorMessage'), `Error creating project: ${error.message}`, false);
        }
    }
    
    selectProject(projectId) {
        this.selectedProjectId = projectId;
        const project = findById(this.projects, projectId);
        
        if (project) {
            // Update project detail view
            if (this.projectDetailName) {
                this.projectDetailName.textContent = project.name;
            }
            if (this.projectDetailId) {
                this.projectDetailId.textContent = `ID: ${project.id}`;
            }
            
            // Update sidebar project name for agents section
            const currentProjectNameSpan = document.getElementById('currentProjectName');
            if (currentProjectNameSpan) {
                currentProjectNameSpan.textContent = project.name;
            }
            
            // Show agents section
            const agentsSection = document.getElementById('agentsSection');
            if (agentsSection) {
                agentsSection.style.display = 'block';
            }
            
            // Re-render projects to show active state
            this.renderProjects();
            
            // Notify UI manager to show project detail view
            this.uiManager.showProjectDetail(project);
            
            // Notify other managers about project selection
            if (this.onProjectSelectCallback) {
                this.onProjectSelectCallback(projectId);
            }
        } else {
            console.error("Project not found:", projectId);
            this.selectedProjectId = null;
            showMessage(document.getElementById('errorMessage'), "Project not found.", false);
            this.uiManager.showDashboard();
        }
    }
    
    async deleteProject() {
        if (!this.selectedProjectId) return;
        
        const userId = this.authManager.getCurrentUserId();
        if (!userId) return;
        
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project and all its agents? This action cannot be undone."
        );
        if (!confirmDelete) return;
        
        try {
            this.uiManager.showLoading();
            
            // Note: Agent deletion should be handled by AgentsManager
            // This is just the project deletion part
            const projectDocRef = doc(db, `${getPrivateBasePath(userId)}/projects`, this.selectedProjectId);
            await deleteDoc(projectDocRef);
            
            showMessage(document.getElementById('errorMessage'), "Project deleted successfully!", true);
            this.selectedProjectId = null;
            this.uiManager.showDashboard();
            
            // Hide agents section
            const agentsSection = document.getElementById('agentsSection');
            if (agentsSection) {
                agentsSection.style.display = 'none';
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            showMessage(document.getElementById('errorMessage'), `Error deleting project: ${error.message}`, false);
        } finally {
            this.uiManager.hideLoading();
        }
    }
    
    // Getters for other modules
    getProjects() {
        return this.projects;
    }
    
    getSelectedProjectId() {
        return this.selectedProjectId;
    }
    
    getSelectedProject() {
        return findById(this.projects, this.selectedProjectId);
    }
    
    // Callback for when project is selected
    onProjectSelect(callback) {
        this.onProjectSelectCallback = callback;
    }
    
    cleanup() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
        this.projects = [];
        this.selectedProjectId = null;
        
        // Hide agents section
        const agentsSection = document.getElementById('agentsSection');
        if (agentsSection) {
            agentsSection.style.display = 'none';
        }
    }
}
