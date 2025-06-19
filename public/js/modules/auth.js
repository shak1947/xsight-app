// Authentication Module
import { auth, onAuthStateChanged, signOut } from '../config/firebase-config.js';
import { showElement, hideElement, showMessage } from '../utils/helpers.js';

export class AuthManager {
    constructor() {
        this.currentUser = null;
        this.currentUserId = null;
        this.authCallbacks = [];
        
        // DOM elements
        this.protectedContent = document.getElementById('protectedContent');
        this.authMessage = document.getElementById('authMessage');
        this.logoutBtn = document.getElementById('logoutBtn');
        
        this.init();
    }
    
    init() {
        // Set up logout button
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
        
        // Set up auth state listener
        onAuthStateChanged(auth, (user) => {
            this.handleAuthStateChange(user);
        });
    }
    
    handleAuthStateChange(user) {
        if (user) {
            this.currentUser = user;
            this.currentUserId = user.uid;
            console.log("User logged in:", user.email, "Email Verified:", user.emailVerified);
            
            if (user.emailVerified) {
                this.showProtectedContent();
                this.notifyAuthCallbacks(user);
            } else {
                this.showEmailVerificationMessage();
            }
        } else {
            console.log("User signed out or not logged in.");
            this.currentUser = null;
            this.currentUserId = null;
            this.showAuthMessage();
            this.notifyAuthCallbacks(null);
        }
    }
    
    showProtectedContent() {
        if (this.protectedContent) {
            this.protectedContent.style.display = 'flex';
        }
        if (this.authMessage) {
            hideElement(this.authMessage);
        }
    }
    
    showEmailVerificationMessage() {
        if (this.protectedContent) {
            hideElement(this.protectedContent);
        }
        if (this.authMessage) {
            showElement(this.authMessage);
            this.authMessage.innerHTML = `Your email (${this.currentUser.email}) is not verified. Please check your inbox for the verification link or <a href="/verify">resend it</a>.`;
        }
    }
    
    showAuthMessage() {
        if (this.protectedContent) {
            hideElement(this.protectedContent);
        }
        if (this.authMessage) {
            showElement(this.authMessage);
            this.authMessage.innerHTML = 'Please <a href="/login">log in</a> or <a href="/signup">sign up</a> and verify your email to access this page.';
        }
    }
    
    async logout() {
        try {
            await signOut(auth);
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("Error logging out:", error);
            showMessage(document.getElementById('errorMessage'), `Error logging out: ${error.message}`, false);
        }
    }
    
    // Callback system for other modules to listen to auth changes
    onAuthChange(callback) {
        this.authCallbacks.push(callback);
        
        // If user is already authenticated, call immediately
        if (this.currentUser && this.currentUser.emailVerified) {
            callback(this.currentUser);
        }
    }
    
    notifyAuthCallbacks(user) {
        this.authCallbacks.forEach(callback => {
            try {
                callback(user);
            } catch (error) {
                console.error("Error in auth callback:", error);
            }
        });
    }
    
    // Getters for other modules
    getCurrentUser() {
        return this.currentUser;
    }
    
    getCurrentUserId() {
        return this.currentUserId;
    }
    
    isAuthenticated() {
        return this.currentUser && this.currentUser.emailVerified;
    }
    
    // Method to check if user has required permissions
    hasPermission(requiredRole = 'user') {
        if (!this.isAuthenticated()) return false;
        
        // Add role-based logic here if needed
        // For now, all verified users have access
        return true;
    }
}
