// Main Application Entry Point
import { AuthManager } from './modules/auth.js';
import { ProjectsManager } from './modules/projects.js';
import { AgentsManager } from './modules/agents.js';
import { UIManager } from './modules/ui.js';
import { FileUploadManager } from './modules/fileUpload.js';

class XsightApp {
    constructor() {
        console.log("🚀 Initializing Xsight Application...");
        
        // Initialize managers in correct order
        this.authManager = new AuthManager();
        this.uiManager = new UIManager();
        this.projectsManager = new ProjectsManager(this.authManager, this.uiManager);
        this.agentsManager = new AgentsManager(this.authManager, this.uiManager, this.projectsManager);
        this.fileUploadManager = new FileUploadManager(this.authManager, this.agentsManager);
        
        // Make managers globally available for debugging
        window.authManager = this.authManager;
        window.projectsManager = this.projectsManager;
        window.agentsManager = this.agentsManager;
        window.uiManager = this.uiManager;
        window.fileUploadManager = this.fileUploadManager;
        
        // Set up cross-manager communications
        this.setupManagerConnections();
        
        console.log("✅ Xsight Application initialized successfully!");
    }
    
    setupManagerConnections() {
        // Connect UI manager with other managers
        this.uiManager.setManagers(this.agentsManager, this.fileUploadManager);
        
        // Set up demo functionality
        this.setupDemoFunctionality();
    }
    
    setupDemoFunctionality() {
        // Demo functionality placeholder
        window.runDemo = () => {
            const selectedAgent = this.agentsManager.getSelectedAgent();
            if (!selectedAgent) {
                alert("Please select an agent first to run a demo.");
                return;
            }
            
            console.log("Running demo for agent:", selectedAgent.name);
            
            // Simulate some demo results
            const demoResults = document.getElementById('agentDemoResults');
            if (demoResults) {
                demoResults.style.display = 'block';
                demoResults.innerHTML = `
                    <div class="results-header">
                        <h3>🤖 Demo Results for ${selectedAgent.name}</h3>
                    </div>
                    <div class="results-content">
                        <p><strong>Agent Description:</strong> ${selectedAgent.description || 'No description provided.'}</p>
                        <p><strong>Initial Instructions:</strong> ${selectedAgent.initialInstructions || 'No instructions provided.'}</p>
                        <p><strong>Available AI Models:</strong> ${(selectedAgent.selectedGpts || []).join(', ') || 'None selected'}</p>
                        <p><strong>Training Materials:</strong> ${(selectedAgent.trainingMaterials || []).length} files uploaded</p>
                        <div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 6px; border-left: 4px solid #3b82f6;">
                            <strong>💡 Demo Mode:</strong> This is a demonstration of how your agent would respond. In a real implementation, this would connect to your selected AI models and process the input using the training materials.
                        </div>
                    </div>
                `;
                
                // Smooth scroll to results
                demoResults.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        new XsightApp();
    } catch (error) {
        console.error("Failed to initialize Xsight Application:", error);
        
        // Show error to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fee2e2;
            color: #dc2626;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            text-align: center;
            z-index: 9999;
        `;
        errorDiv.innerHTML = `
            <h3>⚠️ Application Error</h3>
            <p>Failed to initialize the application. Please refresh the page.</p>
            <button onclick="window.location.reload()" style="
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background: #dc2626;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            ">Refresh Page</button>
        `;
        document.body.appendChild(errorDiv);
    }
});

// Handle service worker registration for PWA functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed');
            });
    });
}
