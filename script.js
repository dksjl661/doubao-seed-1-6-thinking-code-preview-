class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    bindEvents() {
        const todoForm = document.getElementById('todoForm');
        const todoInput = document.getElementById('todoInput');
        const filterTabs = document.querySelectorAll('.filter-tab');

        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = todoInput.value.trim();
            if (text) {
                this.addTodo(text);
                todoInput.value = '';
                todoInput.focus();
            }
        });

        todoInput.addEventListener('input', () => {
            todoInput.style.borderColor = '';
        });

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.dataset.filter;
                this.setFilter(filter);
            });
        });
    }

    addTodo(text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            deletedAt: null
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.render();
        this.updateStats();
        this.showNotification('任务添加成功！', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
            this.updateStats();
            const message = todo.completed ? '任务已标记为完成！' : '任务已标记为未完成！';
            this.showNotification(message, 'success');
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const todoItem = document.querySelector(`[data-todo-id="${id}"]`);
        const todoTextElement = todoItem.querySelector('.todo-text');

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = todo.text;
        editInput.className = 'todo-input-edit';
        editInput.autofocus = true;

        const saveBtn = document.createElement('button');
        saveBtn.className = 'action-btn save-btn';
        saveBtn.textContent = '保存';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'action-btn cancel-btn';
        cancelBtn.textContent = '取消';

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'todo-actions';
        actionsContainer.appendChild(saveBtn);
        actionsContainer.appendChild(cancelBtn);

        todoItem.innerHTML = '';
        todoItem.appendChild(this.createCheckbox(todo));
        todoItem.appendChild(editInput);
        todoItem.appendChild(actionsContainer);

        const handleSave = () => {
            const newText = editInput.value.trim();
            if (newText && newText !== todo.text) {
                todo.text = newText;
                this.saveTodos();
                this.render();
                this.updateStats();
                this.showNotification('任务已更新！', 'success');
            } else {
                this.render();
            }
        };

        const handleCancel = () => {
            this.render();
        };

        saveBtn.addEventListener('click', handleSave);
        cancelBtn.addEventListener('click', handleCancel);

        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSave();
            }
        });

        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                handleCancel();
            }
        });
    }

    deleteTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        if (confirm(`确定要删除任务 "${todo.text}" 吗？`)) {
            todo.deletedAt = new Date().toISOString();
            this.saveTodos();
            this.render();
            this.updateStats();
            this.showNotification('任务已删除！', 'info');
        }
    }

    restoreTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        todo.deletedAt = null;
        this.saveTodos();
        this.render();
        this.updateStats();
        this.showNotification('任务已恢复！', 'success');
    }

    setFilter(filter) {
        this.currentFilter = filter;

        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.render();
    }

    createCheckbox(todo) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
        return checkbox;
    }

    formatTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) {
            return '刚刚';
        } else if (diffMins < 60) {
            return `${diffMins}分钟前`;
        } else if (diffHours < 24) {
            return `${diffHours}小时前`;
        } else if (diffDays < 7) {
            return `${diffDays}天前`;
        } else {
            return date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    createTodoElement(todo) {
        const li = document.createElement('li');
        const isDeleted = !!todo.deletedAt;
        li.className = `todo-item ${todo.completed ? 'completed' : ''} ${isDeleted ? 'deleted' : ''}`;
        li.dataset.todoId = todo.id;

        const checkbox = this.createCheckbox(todo);
        checkbox.disabled = isDeleted;

        const todoContent = document.createElement('div');
        todoContent.className = 'todo-content';

        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo.text;

        const todoTime = document.createElement('span');
        todoTime.className = 'todo-time';

        if (isDeleted) {
            todoTime.textContent = `删除于: ${this.formatTime(todo.deletedAt)}`;
        } else {
            todoTime.textContent = `创建于: ${this.formatTime(todo.createdAt)}`;
        }

        todoContent.appendChild(todoText);
        todoContent.appendChild(todoTime);

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        if (!isDeleted) {
            const editBtn = document.createElement('button');
            editBtn.className = 'action-btn edit-btn';
            editBtn.textContent = '编辑';
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editTodo(todo.id);
            });
            actions.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn delete-btn';
            deleteBtn.textContent = '删除';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTodo(todo.id);
            });
            actions.appendChild(deleteBtn);
        } else {
            const restoreBtn = document.createElement('button');
            restoreBtn.className = 'action-btn restore-btn';
            restoreBtn.textContent = '恢复';
            restoreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.restoreTodo(todo.id);
            });
            actions.appendChild(restoreBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn delete-btn';
            deleteBtn.textContent = '删除';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`确定要永久删除任务 "${todo.text}" 吗？`)) {
                    this.todos = this.todos.filter(t => t.id !== todo.id);
                    this.saveTodos();
                    this.render();
                    this.updateStats();
                    this.showNotification('任务已永久删除！', 'info');
                }
            });
            actions.appendChild(deleteBtn);
        }

        li.appendChild(checkbox);
        li.appendChild(todoContent);
        li.appendChild(actions);

        return li;
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.deletedAt && !t.completed);
            case 'completed':
                return this.todos.filter(t => !t.deletedAt && t.completed);
            case 'deleted':
                return this.todos.filter(t => t.deletedAt);
            case 'all':
            default:
                return this.todos.filter(t => !t.deletedAt);
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');

        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = '';
            emptyState.style.display = 'block';

            let emptyText = '暂无任务';
            let emptySubtext = '添加你的第一个任务开始吧！';

            if (this.currentFilter === 'deleted') {
                emptyText = '暂无已删除任务';
                emptySubtext = '删除的任务会在这里显示';
            } else if (this.currentFilter === 'active') {
                emptyText = '暂无进行中任务';
                emptySubtext = '所有任务都已完成！';
            } else if (this.currentFilter === 'completed') {
                emptyText = '暂无已完成任务';
                emptySubtext = '完成任务后会在这里显示';
            }

            emptyState.querySelector('.empty-text').textContent = emptyText;
            emptyState.querySelector('.empty-subtext').textContent = emptySubtext;

            return;
        }

        emptyState.style.display = 'none';

        todoList.innerHTML = '';
        filteredTodos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            todoList.appendChild(todoElement);
        });
    }

    updateStats() {
        const activeTodos = this.todos.filter(t => !t.deletedAt);
        const total = activeTodos.length;
        const completed = activeTodos.filter(t => t.completed).length;
        const pending = total - completed;
        const deleted = this.todos.filter(t => t.deletedAt).length;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('deletedCount').textContent = deleted;

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
            num.style.animation = 'none';
            setTimeout(() => {
                num.style.animation = 'pulse 0.5s ease';
            }, 10);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 14px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                animation: slideInRight 0.3s ease;
                max-width: 300px;
            }

            .notification-success {
                background: var(--success-color);
            }

            .notification-info {
                background: var(--primary-color);
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Failed to save todos:', error);
            this.showNotification('保存失败，请检查浏览器存储设置', 'error');
        }
    }

    loadTodos() {
        try {
            const saved = localStorage.getItem('todos');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to load todos:', error);
            return [];
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});