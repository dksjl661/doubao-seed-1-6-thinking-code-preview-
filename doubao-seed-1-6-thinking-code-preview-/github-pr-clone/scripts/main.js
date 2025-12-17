// GitHub PR Clone - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // 1. File Tree Toggle Functionality
    const folderToggles = document.querySelectorAll('.tree-item.folder .tree-toggle');

    folderToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const folderItem = this.closest('.tree-item.folder');

            if (folderItem.classList.contains('expanded')) {
                folderItem.classList.remove('expanded');
            } else {
                folderItem.classList.add('expanded');
            }
        });
    });

    // 2. File Selection in Tree
    const fileItems = document.querySelectorAll('.tree-item.file');

    fileItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();

            // Remove active class from all file items
            fileItems.forEach(fileItem => {
                fileItem.classList.remove('active');
            });

            // Add active class to clicked item
            this.classList.add('active');

            // Scroll to corresponding file diff
            const fileName = this.querySelector('.tree-label').textContent;
            const fileDiff = document.querySelector(`.file-diff .file-path:contains("${fileName}")`);

            if (fileDiff) {
                const fileDiffContainer = fileDiff.closest('.file-diff');
                fileDiffContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Highlight the file diff briefly
                fileDiffContainer.style.backgroundColor = 'var(--color-bg-tertiary)';
                setTimeout(() => {
                    fileDiffContainer.style.backgroundColor = '';
                }, 1000);
            }
        });
    });

    // 3. Filter Button Functionality
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all filter buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Handle different filter types
            const filterText = this.textContent.trim();

            if (filterText.includes('File filter')) {
                // Show file filter options (simulated)
                showFileFilterOptions();
            } else if (filterText.includes('Conversations')) {
                // Show conversations filter (simulated)
                showConversationsFilter();
            }
        });
    });

    // 4. PR Tab Functionality
    const prTabs = document.querySelectorAll('.pr-tab');

    prTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all PR tabs
            prTabs.forEach(prTab => {
                prTab.classList.remove('active');
            });

            // Add active class to clicked tab
            this.classList.add('active');

            // Simulate tab content switching
            const tabName = this.querySelector('span').textContent.trim();
            switchTabContent(tabName);
        });
    });

    // 5. Load Diff Button Functionality
    const loadDiffButtons = document.querySelectorAll('.load-diff-button');

    loadDiffButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const loadDiffContainer = this.closest('.load-diff-container');
            const fileDiff = loadDiffContainer.closest('.file-diff');

            // Show loading state
            this.textContent = 'Loading...';
            this.disabled = true;

            // Simulate loading delay
            setTimeout(() => {
                // Replace with actual diff content (simulated)
                loadDiffContainer.innerHTML = `
                    <div class="diff-content">
                        <div class="diff-header">
                            <span class="diff-info">Showing 584 changed lines</span>
                        </div>
                        <div class="diff-scroll">
                            <table class="diff-table">
                                <tbody>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">1</td>
                                        <td class="diff-line-content">+ #include <stdio.h></td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">2</td>
                                        <td class="diff-line-content">+ #include <stdlib.h></td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">3</td>
                                        <td class="diff-line-content">+ #include <string.h></td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">4</td>
                                        <td class="diff-line-content">+ </td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">5</td>
                                        <td class="diff-line-content">+ #define TABLE_SIZE 100</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">6</td>
                                        <td class="diff-line-content">+ </td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">7</td>
                                        <td class="diff-line-content">+ typedef struct {</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">8</td>
                                        <td class="diff-line-content">+     char key[50];</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">9</td>
                                        <td class="diff-line-content">+     char value[100];</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">10</td>
                                        <td class="diff-line-content">+     struct Node* next;</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">11</td>
                                        <td class="diff-line-content">+ } Node;</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">12</td>
                                        <td class="diff-line-content">+ </td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">13</td>
                                        <td class="diff-line-content">+ typedef struct {</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">14</td>
                                        <td class="diff-line-content">+     Node* table[TABLE_SIZE];</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">15</td>
                                        <td class="diff-line-content">+ } HashTable;</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">16</td>
                                        <td class="diff-line-content">+ </td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">17</td>
                                        <td class="diff-line-content">+ // Hash function</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">18</td>
                                        <td class="diff-line-content">+ unsigned int hash(const char* key) {</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">19</td>
                                        <td class="diff-line-content">+     unsigned long hash = 5381;</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">20</td>
                                        <td class="diff-line-content">+     int c;</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">21</td>
                                        <td class="diff-line-content">+ </td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">22</td>
                                        <td class="diff-line-content">+     while ((c = *key++)) {</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">23</td>
                                        <td class="diff-line-content">+         hash = ((hash << 5) + hash) + c; /* hash * 33 + c */</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">24</td>
                                        <td class="diff-line-content">+     }</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">25</td>
                                        <td class="diff-line-content">+ </td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">26</td>
                                        <td class="diff-line-content">+     return hash % TABLE_SIZE;</td>
                                    </tr>
                                    <tr class="diff-line added">
                                        <td class="diff-line-num">27</td>
                                        <td class="diff-line-content">+ }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

                // Add styles for the diff content
                addDiffStyles();

            }, 1500);
        });
    });

    // 6. Copy Path Button Functionality
    const copyPathButtons = document.querySelectorAll('.copy-path-button');

    copyPathButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const filePathElement = this.closest('.file-header').querySelector('.file-path');
            const filePath = filePathElement.textContent.trim();

            // Copy to clipboard
            navigator.clipboard.writeText(filePath).then(() => {
                // Show feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" fill="currentColor"/>
                        <path d="M2 11.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" fill="currentColor"/>
                    </svg>
                `;

                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy path:', err);
            });
        });
    });

    // 7. File Search Functionality
    const fileSearchInput = document.querySelector('.file-search-input');

    if (fileSearchInput) {
        fileSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const fileItems = document.querySelectorAll('.tree-item.file');

            fileItems.forEach(item => {
                const fileName = item.querySelector('.tree-label').textContent.toLowerCase();

                if (searchTerm === '' || fileName.includes(searchTerm)) {
                    item.style.display = 'flex';

                    // Expand parent folders
                    let parent = item.parentElement;
                    while (parent && parent.classList.contains('tree-children')) {
                        const folderItem = parent.previousElementSibling.closest('.tree-item.folder');
                        if (folderItem) {
                            folderItem.classList.add('expanded');
                        }
                        parent = parent.parentElement.closest('.tree-children');
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 8. Navigation Tab Functionality
    const navTabs = document.querySelectorAll('.nav-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all nav tabs
            navTabs.forEach(navTab => {
                navTab.classList.remove('active');
            });

            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // 9. Try New Experience Button
    const tryNewExperienceButton = document.querySelector('.try-new-experience');

    if (tryNewExperienceButton) {
        tryNewExperienceButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Show a notification (simulated)
            showNotification('This is a preview of the new experience.');
        });
    }

    // 10. Ask Copilot Button
    const askCopilotButton = document.querySelector('.ask-copilot');

    if (askCopilotButton) {
        askCopilotButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Show a modal or notification (simulated)
            showNotification('Copilot is analyzing the changes...');
        });
    }

    // Helper Functions

    function showFileFilterOptions() {
        // Create a simple modal for file filter options
        const modal = document.createElement('div');
        modal.className = 'filter-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Filter by file type</h3>
                <div class="filter-options">
                    <label><input type="checkbox" checked> All files</label>
                    <label><input type="checkbox"> Source code</label>
                    <label><input type="checkbox"> Documentation</label>
                    <label><input type="checkbox"> Configuration</label>
                    <label><input type="checkbox"> Binary</label>
                </div>
                <div class="modal-actions">
                    <button class="apply-filters">Apply filters</button>
                    <button class="cancel-filters">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles
        addModalStyles();

        // Event listeners
        modal.querySelector('.apply-filters').addEventListener('click', function() {
            document.body.removeChild(modal);
            showNotification('Filters applied.');
        });

        modal.querySelector('.cancel-filters').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }

    function showConversationsFilter() {
        // Create a simple modal for conversations filter
        const modal = document.createElement('div');
        modal.className = 'filter-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Filter conversations</h3>
                <div class="filter-options">
                    <label><input type="checkbox" checked> All conversations</label>
                    <label><input type="checkbox"> Resolved</label>
                    <label><input type="checkbox"> Unresolved</label>
                    <label><input type="checkbox"> Involving me</label>
                </div>
                <div class="modal-actions">
                    <button class="apply-filters">Apply filters</button>
                    <button class="cancel-filters">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles
        addModalStyles();

        // Event listeners
        modal.querySelector('.apply-filters').addEventListener('click', function() {
            document.body.removeChild(modal);
            showNotification('Filters applied.');
        });

        modal.querySelector('.cancel-filters').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }

    function switchTabContent(tabName) {
        // This would normally switch between different content sections
        // For this demo, we'll just show a notification
        const notifications = {
            'Conversation': 'Showing conversation view.',
            'Commits': 'Showing commit history.',
            'Checks': 'Showing CI/CD checks.',
            'Files changed': 'Showing file changes.'
        };

        const message = notifications[tabName] || `Switched to ${tabName} tab.`;
        showNotification(message);
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        // Add to body
        document.body.appendChild(notification);

        // Add styles
        addNotificationStyles();

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function addDiffStyles() {
        // Check if styles already exist
        if (document.getElementById('diff-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'diff-styles';
        styles.textContent = `
            .diff-content {
                font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
                font-size: var(--font-size-sm);
            }

            .diff-header {
                margin-bottom: var(--spacing-md);
                padding-bottom: var(--spacing-sm);
                border-bottom: 1px solid var(--color-border);
            }

            .diff-info {
                font-size: var(--font-size-xs);
                color: var(--color-text-secondary);
            }

            .diff-scroll {
                max-height: 400px;
                overflow-y: auto;
                border: 1px solid var(--color-border);
                border-radius: var(--border-radius-sm);
            }

            .diff-table {
                width: 100%;
                border-collapse: collapse;
            }

            .diff-line {
                border-bottom: 1px solid var(--color-border);
                transition: background-color var(--transition-fast);
            }

            .diff-line:hover {
                background-color: var(--color-bg-hover);
            }

            .diff-line:last-child {
                border-bottom: none;
            }

            .diff-line-num {
                width: 50px;
                padding: var(--spacing-xs) var(--spacing-sm);
                text-align: right;
                color: var(--color-text-secondary);
                background-color: var(--color-bg-tertiary);
                border-right: 1px solid var(--color-border);
                user-select: none;
            }

            .diff-line-content {
                padding: var(--spacing-xs) var(--spacing-sm);
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            .diff-line.added .diff-line-content {
                background-color: var(--color-additions-bg);
                color: var(--color-additions-text);
            }

            .diff-line.deleted .diff-line-content {
                background-color: var(--color-deletions-bg);
                color: var(--color-deletions-text);
            }
        `;

        document.head.appendChild(styles);
    }

    function addModalStyles() {
        // Check if styles already exist
        if (document.getElementById('modal-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .filter-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: var(--spacing-lg);
            }

            .modal-content {
                background-color: var(--color-bg-secondary);
                border: 1px solid var(--color-border);
                border-radius: var(--border-radius-lg);
                padding: var(--spacing-xl);
                max-width: 500px;
                width: 100%;
                box-shadow: var(--shadow-lg);
            }

            .modal-content h3 {
                font-size: var(--font-size-lg);
                font-weight: 600;
                color: var(--color-text-primary);
                margin-bottom: var(--spacing-lg);
            }

            .filter-options {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-xl);
            }

            .filter-options label {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
                font-size: var(--font-size-sm);
                color: var(--color-text-primary);
                cursor: pointer;
            }

            .filter-options input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
                accent-color: var(--color-text-link);
            }

            .modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: var(--spacing-sm);
            }

            .modal-actions button {
                padding: var(--spacing-sm) var(--spacing-lg);
                font-size: var(--font-size-sm);
                font-weight: 500;
                border-radius: var(--border-radius-sm);
                cursor: pointer;
                transition: all var(--transition-fast);
            }

            .apply-filters {
                color: var(--color-bg-primary);
                background-color: var(--color-text-link);
                border: 1px solid var(--color-text-link);
            }

            .apply-filters:hover {
                background-color: var(--color-text-link-hover);
                border-color: var(--color-text-link-hover);
            }

            .cancel-filters {
                color: var(--color-text-primary);
                background-color: var(--color-bg-tertiary);
                border: 1px solid var(--color-border);
            }

            .cancel-filters:hover {
                background-color: var(--color-bg-hover);
                border-color: var(--color-border-hover);
            }

            @media (max-width: 768px) {
                .modal-content {
                    padding: var(--spacing-lg);
                    margin: var(--spacing-sm);
                }

                .modal-actions {
                    flex-direction: column-reverse;
                }

                .modal-actions button {
                    width: 100%;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    function addNotificationStyles() {
        // Check if styles already exist
        if (document.getElementById('notification-styles')) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 24px;
                background-color: var(--color-bg-secondary);
                color: var(--color-text-primary);
                padding: var(--spacing-md) var(--spacing-lg);
                border: 1px solid var(--color-border);
                border-radius: var(--border-radius-md);
                box-shadow: var(--shadow-md);
                font-size: var(--font-size-sm);
                z-index: 2000;
                animation: slideIn 0.3s ease-out;
                max-width: 320px;
            }

            .notification.fade-out {
                animation: slideOut 0.3s ease-out forwards;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @media (max-width: 768px) {
                .notification {
                    top: 70px;
                    right: var(--spacing-sm);
                    left: var(--spacing-sm);
                    max-width: none;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Add :contains() selector polyfill for case-insensitive matching
    if (!CSS.supports('selector(:contains())')) {
        (function($) {
            $.expr[':'].contains = function(a, i, m) {
                return $(a).text().toUpperCase()
                    .indexOf(m[3].toUpperCase()) >= 0;
            };
        })(jQuery);
    }

    // Show welcome notification
    showNotification('GitHub PR Clone loaded successfully!');
});