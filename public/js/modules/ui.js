/* ===== ENHANCED FORM STYLES ===== */
.form-field {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
}

.form-input,
.form-textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.9rem;
    font-family: inherit;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
    resize: vertical;
    min-height: 80px;
}

.field-hint {
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 0.25rem;
    line-height: 1.4;
}

.form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn-primary {
    flex: 1;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s;
}

.btn-primary:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-primary:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.btn-secondary {
    flex: 1;
    padding: 0.875rem 1.5rem;
    background: #f3f4f6;
    color: #374151;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: #e5e7eb;
    border-color: #d1d5db;
}

/* ===== GPT SELECTION STYLES ===== */
.gpt-selection-container {
    max-height: 250px;
    overflow-y: auto;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
    background: #fafafa;
}

.gpt-option-checkbox {
    margin-bottom: 0.75rem;
}

.gpt-option-checkbox label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: background-color 0.2s;
}

.gpt-option-checkbox label:hover {
    background-color: #f0f9ff;
}

.gpt-option-checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #3b82f6;
}

/* ===== TRAINING MATERIALS GRID ===== */
.training-materials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.training-material-item {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
    transition: all 0.2s;
}

.training-material-item:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.training-material-header {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.training-material-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
}

.training-material-info {
    flex-grow: 1;
    min-width: 0;
}

.training-material-name {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
    word-break: break-word;
}

.training-material-meta {
    font-size: 0.8rem;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.training-material-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
}

.training-material-action-btn {
    padding: 0.5rem;
    background: none;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
}

.training-material-action-btn.view-btn:hover {
    background-color: #eff6ff;
    border-color: #3b82f6;
    color: #1e40af;
}

.training-material-action-btn.delete-btn:hover {
    background-color: #fef2f2;
    border-color: #ef4444;
    color: #dc2626;
}

/* ===== EMPTY STATE STYLES ===== */
.empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #6b7280;
}

.empty-state-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.empty-state-text {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #374151;
}

.empty-state-hint {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0;
}

/* ===== DEMO SECTION STYLES ===== */
.demo-input-section {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #e2e8f0;
}

.demo-input-section .textarea {
    background: white;
    border: 2px solid #e5e7eb;
    margin-bottom: 0.75rem;
}

.demo-input-section .textarea:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* ===== ERROR MESSAGE STYLES ===== */
.error-message {
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-weight: 500;
    border: 1px solid;
    display: none;
}

.error-message.error {
    background-color: #fef2f2;
    color: #dc2626;
    border-color: #fecaca;
}

.error-message.success {
    background-color: #f0fdf4;
    color: #166534;
    border-color: #bbf7d0;
}

/* ===== RESPONSIVE ENHANCEMENTS ===== */
@media (max-width: 768px) {
    .training-materials-grid {
        grid-template-columns: 1fr;
    }
    
    .form-actions {
        flex-direction: column;
    }
    
    .agent-detail-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }
    
    .agent-detail-actions {
        justify-content: stretch;
        gap: 0.75rem;
    }
    
    .agent-detail-actions button {
        flex: 1;
    }
    
    .training-material-header {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .training-material-actions {
        justify-content: center;
        margin-top: 0.5rem;
    }
}

@media (max-width: 480px) {
    .demo-input-section {
        padding: 1rem;
    }
    
    .gpt-selection-container {
        padding: 0.75rem;
    }
    
    .training-material-item {
        padding: 0.75rem;
    }
    
    .empty-state {
        padding: 2rem 0.5rem;
    }
    
    .empty-state-icon {
        font-size: 2.5rem;
    }
}/* ===== SIDEBAR COMPONENTS ===== */
.left-sidebar {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    width: 280px;
    flex-shrink: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.sidebar-section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.sidebar-section-title svg {
    width: 1.2em;
    height: 1.2em;
}

.sidebar-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-list-item {
    margin-bottom: 0.5rem;
}

.sidebar-list-item a,
.sidebar-list-item button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: #475569;
    font-weight: 500;
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.sidebar-list-item a:hover,
.sidebar-list-item button:hover {
    background-color: #f0f4f8;
    color: #1e40af;
}

.sidebar-list-item.active > a,
.sidebar-list-item.active > button {
    background-color: #e0f2f7;
    color: #1e40af;
    font-weight: 600;
}

/* ===== FORM COMPONENTS ===== */
.form-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.create-item-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
    margin-top: 1rem;
}

.create-item-form input,
.create-item-form textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.9rem;
    font-family: inherit;
    box-sizing: border-box;
}

.create-item-form input:focus,
.create-item-form textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.create-item-form button {
    padding: 0.75rem;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
}

.create-item-form button:hover {
    background-color: #059669;
}

.create-new-agent-btn {
    background-color: #10b981;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    margin-left: 1rem;
    transition: background-color 0.2s;
}

.create-new-agent-btn:hover {
    background-color: #059669;
}

/* ===== INPUT COMPONENTS ===== */
.textarea {
    width: 100%;
    min-height: 100px;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    resize: vertical;
    transition: border-color 0.2s;
    font-family: inherit;
}

.textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.char-hint {
    font-size: 0.875rem;
    color: #64748b;
    margin-top: 0.5rem;
}

/* ===== BUTTON COMPONENTS ===== */
.analyze-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.analyze-btn:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}

/* ===== FILE UPLOAD COMPONENTS ===== */
.file-upload-section {
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    background: #f9fafb;
    margin-top: 1rem;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.file-upload-section:hover {
    border-color: #3b82f6;
    background: #eff6ff;
}

.file-upload-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
}

.file-upload-controls input[type="file"] {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background-color: white;
    font-size: 0.9rem;
}

.file-upload-controls button {
    padding: 0.6rem 1.2rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
}

.file-upload-controls button:hover {
    background-color: #1e40af;
}

/* ===== PROGRESS COMPONENTS ===== */
.upload-progress-container {
    width: 100%;
    background-color: #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    height: 10px;
}

.upload-progress-bar {
    height: 100%;
    width: 0%;
    background-color: #10b981;
    transition: width 0.1s ease-out;
    border-radius: 8px;
}

.upload-status-message {
    font-size: 0.85rem;
    color: #475569;
}

/* ===== AGENT COMPONENTS ===== */
.agent-in-project-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: all 0.2s;
}

.agent-in-project-item:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.agent-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.agent-item-header h3 {
    margin: 0;
    color: #1e293b;
    font-size: 1.1rem;
}

.agent-item-actions {
    display: flex;
    gap: 0.5rem;
}

.agent-action-btn {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.2s;
}

.select-btn {
    background-color: #3b82f6;
    color: white;
}

.select-btn:hover {
    background-color: #1e40af;
    transform: translateY(-1px);
}

.agent-item-description {
    color: #64748b;
    margin: 0 0 1rem 0;
    line-height: 1.5;
}

.agent-item-stats {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: #6b7280;
}

/* ===== AGENT DETAIL COMPONENTS ===== */
.agent-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
}

.agent-detail-title h2 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 2rem;
}

.agent-detail-description {
    color: #64748b;
    font-size: 1.1rem;
    margin: 0;
    line-height: 1.6;
}

.agent-detail-actions {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
}

.agent-instructions-display {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 1rem;
    min-height: 60px;
}

.agent-gpt-models {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.gpt-model-tag {
    background: #dbeafe;
    color: #1e40af;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid #bfdbfe;
}

/* ===== TRAINING MATERIALS COMPONENTS ===== */
.training-materials-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    margin-bottom: 1rem;
}

.training-material-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #f1f5f9;
    transition: background-color 0.2s;
}

.training-material-list-item:last-child {
    border-bottom: none;
}

.training-material-list-item:hover {
    background-color: #f8fafc;
}

.training-material-info {
    flex-grow: 1;
}

.training-material-name {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.25rem;
}

.training-material-meta {
    font-size: 0.8rem;
    color: #64748b;
}

.training-material-delete-btn {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.2s;
    font-size: 1rem;
}

.training-material-delete-btn:hover {
    background-color: #fee2e2;
    color: #dc2626;
}

/* ===== PROJECT COMPONENTS ===== */
.project-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
}

.project-header h2 {
    margin: 0;
    color: #1e293b;
    font-size: 2rem;
}

.project-header p {
    margin: 0;
    color: #64748b;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
}

.agent-list-in-project {
    min-height: 200px;
}
