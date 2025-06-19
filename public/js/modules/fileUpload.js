// File Upload Manager Module
import { 
    storage, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL, 
    deleteObject 
} from '../config/firebase-config.js';

export class FileUploadManager {
    constructor(authManager, agentsManager) {
        this.authManager = authManager;
        this.agentsManager = agentsManager;
        this.currentUploadTask = null;
        this.uploadQueue = [];
        
        console.log('📁 FileUploadManager initialized');
    }
    
    initialize() {
        this.setupUploadHandlers();
        console.log('✅ File upload handlers initialized');
    }
    
    setupUploadHandlers() {
        // Main file upload button
        const uploadBtn = document.getElementById('uploadFilesBtn');
        const fileInput = document.getElementById('trainingMaterialInput');
        
        if (uploadBtn && fileInput) {
            uploadBtn.addEventListener('click', () => {
                this.handleFileUpload(fileInput.files);
            });
            
            // Also handle drag and drop if implemented
            this.setupDragAndDrop();
        }
        
        // Query file upload (if different from training materials)
        const queryFileInput = document.getElementById('queryFileInput');
        if (queryFileInput) {
            queryFileInput.addEventListener('change', (e) => {
                this.handleQueryFileUpload(e.target.files);
            });
        }
    }
    
    setupDragAndDrop() {
        const dropZones = document.querySelectorAll('.file-upload-section');
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileUpload(files);
                }
            });
        });
    }
    
    async handleFileUpload(files) {
        if (!files || files.length === 0) {
            this.showError('Please select files to upload');
            return;
        }
        
        const currentUser = this.authManager.getCurrentUser();
        if (!currentUser) {
            this.showError('Please log in to upload files');
            return;
        }
        
        const selectedAgent = this.agentsManager.getSelectedAgent();
        if (!selectedAgent) {
            this.showError('Please select an agent to upload training materials');
            return;
        }
        
        // Disable upload button during upload
        this.setUploadUIState(true);
        
        // Process each file
        for (const file of files) {
            await this.uploadFile(file, currentUser.uid, selectedAgent.id);
        }
        
        // Re-enable upload button
        this.setUploadUIState(false);
        
        // Clear file input
        const fileInput = document.getElementById('trainingMaterialInput');
        if (fileInput) fileInput.value = '';
    }
    
    async uploadFile(file, userId, agentId) {
        // Validate file
        if (!this.validateFile(file)) {
            return;
        }
        
        const fileName = this.sanitizeFileName(file.name);
        const storagePath = `users/${userId}/agents/${agentId}/training-materials/${Date.now()}-${fileName}`;
        const storageRef = ref(storage, storagePath);
        
        // Create upload task
        const uploadTask = uploadBytesResumable(storageRef, file);
        this.currentUploadTask = uploadTask;
        
        // Show progress UI
        this.showUploadProgress(true);
        
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                // Progress handler
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.updateUploadProgress(progress, file.name);
                },
                // Error handler
                (error) => {
                    console.error('Upload error:', error);
                    this.showError(`Failed to upload ${file.name}: ${error.message}`);
                    this.showUploadProgress(false);
                    reject(error);
                },
                // Success handler
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        
                        // Save file metadata to agent
                        const fileMetadata = {
                            name: file.name,
                            url: downloadURL,
                            size: file.size,
                            type: file.type,
                            uploadedAt: new Date().toISOString(),
                            storagePath: storagePath
                        };
                        
                        // Update agent with new training material
                        await this.agentsManager.addTrainingMaterial(agentId, fileMetadata);
                        
                        this.showSuccess(`${file.name} uploaded successfully!`);
                        this.showUploadProgress(false);
                        resolve(downloadURL);
                    } catch (error) {
                        console.error('Error saving file metadata:', error);
                        this.showError(`Failed to save ${file.name} metadata`);
                        reject(error);
                    }
                }
            );
        });
    }
    
    async handleQueryFileUpload(files) {
        // Similar to training material upload but for query-specific files
        // These might be handled differently (e.g., temporary storage)
        console.log('Query file upload:', files);
        // Implementation depends on your requirements
    }
    
    validateFile(file) {
        // File size limit (50MB)
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            this.showError(`${file.name} is too large. Maximum size is 50MB.`);
            return false;
        }
        
        // Allowed file types
        const allowedTypes = [
            'application/pdf',
            'text/plain',
            'text/csv',
            'application/json',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        
        if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|txt|csv|json|doc|docx|xls|xlsx)$/i)) {
            this.showError(`${file.name} is not a supported file type.`);
            return false;
        }
        
        return true;
    }
    
    sanitizeFileName(fileName) {
        // Remove special characters and spaces
        return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    }
    
    async deleteFile(storagePath) {
        try {
            const fileRef = ref(storage, storagePath);
            await deleteObject(fileRef);
            this.showSuccess('File deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting file:', error);
            this.showError('Failed to delete file');
            return false;
        }
    }
    
    cancelUpload() {
        if (this.currentUploadTask) {
            this.currentUploadTask.cancel();
            this.currentUploadTask = null;
            this.showUploadProgress(false);
            this.showError('Upload cancelled');
        }
    }
    
    // UI Helper Methods
    showUploadProgress(show) {
        const progressContainer = document.getElementById('uploadProgressContainer');
        if (progressContainer) {
            progressContainer.style.display = show ? 'block' : 'none';
        }
        
        if (!show) {
            const progressBar = document.getElementById('uploadProgressBar');
            if (progressBar) progressBar.style.width = '0%';
            
            const statusEl = document.getElementById('uploadStatus');
            if (statusEl) statusEl.textContent = '';
        }
    }
    
    updateUploadProgress(progress, fileName) {
        const progressBar = document.getElementById('uploadProgressBar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        const statusEl = document.getElementById('uploadStatus');
        if (statusEl) {
            statusEl.textContent = `Uploading ${fileName}: ${Math.round(progress)}%`;
        }
    }
    
    setUploadUIState(isUploading) {
        const uploadBtn = document.getElementById('uploadFilesBtn');
        const fileInput = document.getElementById('trainingMaterialInput');
        
        if (uploadBtn) {
            uploadBtn.disabled = isUploading;
            uploadBtn.textContent = isUploading ? 'Uploading...' : 'Upload File(s)';
        }
        
        if (fileInput) {
            fileInput.disabled = isUploading;
        }
    }
    
    showError(message) {
        console.error(message);
        // You can integrate with your UIManager here
        const statusEl = document.getElementById('uploadStatus');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.style.color = '#ef4444';
        }
    }
    
    showSuccess(message) {
        console.log(message);
        // You can integrate with your UIManager here
        const statusEl = document.getElementById('uploadStatus');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.style.color = '#10b981';
        }
    }
    
    // Public methods for external access
    getUploadQueue() {
        return this.uploadQueue;
    }
    
    clearUploadQueue() {
        this.uploadQueue = [];
    }
    
    isUploading() {
        return this.currentUploadTask !== null;
    }
}
