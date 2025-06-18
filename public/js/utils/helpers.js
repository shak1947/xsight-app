
// Utility Helper Functions

// Get the base path for user-specific data
export const getPrivateBasePath = (currentUserId) => {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    if (!currentUserId) {
        console.warn("Attempted to get private base path without a userId.");
        return `artifacts/${appId}/users/anonymous-pre-auth`; 
    }
    return `artifacts/${appId}/users/${currentUserId}`;
};

// Get the base path for public data (like GPT models)
export const getPublicBasePath = () => {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    return `artifacts/${appId}/public/data`;
};

// DOM element helpers
export const showElement = (element) => {
    if (element) element.style.display = 'block';
};

export const hideElement = (element) => {
    if (element) element.style.display = 'none';
};

export const showLoading = (loadingElement, contentElements = []) => {
    showElement(loadingElement);
    contentElements.forEach(el => hideElement(el));
};

export const hideLoading = (loadingElement) => {
    hideElement(loadingElement);
};

// Message display helpers
export const showMessage = (messageElement, message, isSuccess = false) => {
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    messageElement.className = isSuccess ? 'success' : 'error';
    
    // Auto-hide after 5 seconds for success messages
    if (isSuccess) {
        setTimeout(() => hideElement(messageElement), 5000);
    }
};

export const hideMessage = (messageElement) => {
    hideElement(messageElement);
};

// View management
export const hideAllViews = (views) => {
    Object.values(views).forEach(view => hideElement(view));
};

export const showView = (views, viewId, contentArea) => {
    hideAllViews(views);
    showElement(views[viewId]);
    
    // Scroll to top when view changes
    if (contentArea) {
        contentArea.scrollTo(0, 0);
    }
};

// Form helpers
export const clearForm = (form) => {
    if (!form) return;
    
    // Clear all input and textarea elements
    form.querySelectorAll('input, textarea').forEach(field => {
        if (field.type !== 'checkbox' && field.type !== 'radio') {
            field.value = '';
        }
    });
    
    // Uncheck all checkboxes
    form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
};

// Array helpers
export const findById = (array, id) => {
    return array.find(item => item.id === id);
};

export const removeById = (array, id) => {
    return array.filter(item => item.id !== id);
};

// File size formatter
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Debounce function for search/input
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Local storage helpers (with error handling)
export const getFromStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Failed to get ${key} from localStorage:`, error);
        return defaultValue;
    }
};

export const setToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn(`Failed to set ${key} to localStorage:`, error);
    }
};

// Animation helpers
export const fadeIn = (element, duration = 300) => {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = progress;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
};

export const fadeOut = (element, duration = 300) => {
    if (!element) return;
    
    const start = performance.now();
    const startOpacity = parseFloat(element.style.opacity) || 1;
    
    const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = startOpacity * (1 - progress);
        
        if (progress >= 1) {
            element.style.display = 'none';
        } else {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
};
