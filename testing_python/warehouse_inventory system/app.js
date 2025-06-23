// Warehouse Inventory Management System
// Main Application JavaScript

class WarehouseManager {
    constructor() {
        this.currentUser = null;
        this.data = {
            users: [],
            items: [],
            sales: [],
            categories: [],
            locations: [],
            tasks: [],
            activities: []
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.initializeDefaultData();
        this.setupEventListeners();
        this.showLoginModal();
    }

    // Data Management
    loadData() {
        const savedData = localStorage.getItem('warehouseData');
        if (savedData) {
            this.data = { ...this.data, ...JSON.parse(savedData) };
        }
    }

    saveData() {
        localStorage.setItem('warehouseData', JSON.stringify(this.data));
    }

    initializeDefaultData() {
        // Create default admin user if no users exist
        if (this.data.users.length === 0) {
            this.data.users.push({
                id: this.generateId(),
                username: 'admin',
                password: 'admin123', // In production, this should be hashed
                role: 'admin',
                fullName: 'System Administrator',
                email: 'admin@warehouse.com',
                createdDate: new Date().toISOString().split('T')[0]
            });
        }

        // Create default categories if none exist
        if (this.data.categories.length === 0) {
            const defaultCategories = [
                { name: 'Electronics', description: 'Electronic devices and components', color: '#007bff' },
                { name: 'Furniture', description: 'Office and home furniture', color: '#28a745' },
                { name: 'Clothing', description: 'Apparel and accessories', color: '#ffc107' },
                { name: 'Books', description: 'Books and publications', color: '#17a2b8' }
            ];

            defaultCategories.forEach(category => {
                this.data.categories.push({
                    id: this.generateId(),
                    ...category,
                    createdDate: new Date().toISOString()
                });
            });
        }

        // Create default locations if none exist
        if (this.data.locations.length === 0) {
            const defaultLocations = [
                { name: 'New York', type: 'town', parentId: null },
                { name: 'Main Warehouse', type: 'warehouse', parentId: null },
                { name: 'Building A', type: 'building', parentId: null },
                { name: 'Floor 1', type: 'floor', parentId: null },
                { name: 'Section A1', type: 'room', parentId: null }
            ];

            defaultLocations.forEach((location, index) => {
                const locationId = this.generateId();
                this.data.locations.push({
                    id: locationId,
                    ...location,
                    parentId: index > 0 ? this.data.locations[index - 1].id : null,
                    createdDate: new Date().toISOString()
                });
            });
        }

        this.saveData();
    }

    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    // Authentication
    showLoginModal() {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }

    login(username, password) {
        const user = this.data.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.currentUser = user;
            this.hideLoginModal();
            this.showMainInterface();
            this.addActivity(`User ${username} logged in`);
            return true;
        }
        return false;
    }

    logout() {
        this.addActivity(`User ${this.currentUser.username} logged out`);
        this.currentUser = null;
        this.hideMainInterface();
        this.showLoginModal();
    }

    hideLoginModal() {
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (loginModal) loginModal.hide();
    }

    showMainInterface() {
        document.getElementById('mainNav').style.display = 'block';
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('currentUser').textContent = this.currentUser.fullName || this.currentUser.username;
        
        if (this.currentUser.role === 'admin') {
            document.getElementById('adminMenuItem').style.display = 'block';
        }
        
        this.showSection('dashboard');
        this.updateDashboard();
    }

    hideMainInterface() {
        document.getElementById('mainNav').style.display = 'none';
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('adminMenuItem').style.display = 'none';
    }

    // Navigation
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Load section-specific data
        this.loadSectionData(sectionName);
    }

    loadSectionData(sectionName) {
        switch (sectionName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'inventory':
                this.loadInventoryTable();
                this.loadInventoryFilters();
                break;
            case 'sales':
                this.loadSalesTable();
                break;
            case 'categories':
                this.loadCategoriesView();
                break;
            case 'locations':
                this.loadLocationsTree();
                break;
            case 'tasks':
                this.loadTasksKanban();
                break;
            case 'admin':
                if (this.currentUser.role === 'admin') {
                    this.loadUsersTable();
                }
                break;
        }
    }

    // Dashboard
    updateDashboard() {
        const totalItems = this.data.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalSales = this.data.sales.reduce((sum, sale) => sum + (sale.salePrice * sale.quantity), 0);
        const totalProfit = this.data.sales.reduce((sum, sale) => {
            const item = this.data.items.find(i => i.id === sale.itemId);
            if (item) {
                return sum + ((sale.salePrice - item.purchasePrice) * sale.quantity);
            }
            return sum;
        }, 0);
        
        const lowStockItems = this.data.items.filter(item => item.quantity < 10).length;

        document.getElementById('totalItems').textContent = totalItems;
        document.getElementById('totalSales').textContent = `$${totalSales.toFixed(2)}`;
        document.getElementById('totalProfit').textContent = `$${totalProfit.toFixed(2)}`;
        document.getElementById('lowStockItems').textContent = lowStockItems;

        this.updateRecentActivities();
        this.updateLowStockAlerts();
    }

    updateRecentActivities() {
        const recentActivities = this.data.activities
            .slice(-5)
            .reverse()
            .map(activity => `
                <div class="activity-item mb-2 p-2 border-start border-primary border-3">
                    <small class="text-muted">${new Date(activity.timestamp).toLocaleString()}</small>
                    <div>${activity.description}</div>
                </div>
            `).join('');

        document.getElementById('recentActivities').innerHTML = 
            recentActivities || '<p class="text-muted">No recent activities</p>';
    }

    updateLowStockAlerts() {
        const lowStockItems = this.data.items
            .filter(item => item.quantity < 10)
            .map(item => `
                <div class="alert alert-warning alert-sm mb-2" role="alert">
                    <strong>${item.name}</strong> - Only ${item.quantity} left in stock
                </div>
            `).join('');

        document.getElementById('lowStockAlerts').innerHTML = 
            lowStockItems || '<p class="text-muted">No low stock alerts</p>';
    }

    // Inventory Management
    loadInventoryTable() {
        const tableBody = document.getElementById('inventoryTable');
        tableBody.innerHTML = '';

        this.data.items.forEach(item => {
            const location = this.data.locations.find(l => l.id === item.location);
            const categories = item.categories
                ? item.categories.map(catId => {
                    const cat = this.data.categories.find(c => c.id === catId);
                    return cat ? `<span class="badge" style="background-color: ${cat.color}">${cat.name}</span>` : '';
                }).join(' ')
                : '';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id.slice(-8)}</td>
                <td>${item.name}</td>
                <td>
                    <span class="badge ${item.quantity < 10 ? 'bg-warning' : 'bg-success'}">
                        ${item.quantity}
                    </span>
                </td>
                <td>$${item.purchasePrice}</td>
                <td>${item.supplier}</td>
                <td>${location ? location.name : 'N/A'}</td>
                <td>${categories}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="app.viewItem('${item.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary me-1" onclick="app.editItem('${item.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="app.deleteItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    loadInventoryFilters() {
        // Load categories filter
        const categoryFilter = document.getElementById('filterCategory');
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        this.data.categories.forEach(category => {
            categoryFilter.innerHTML += `<option value="${category.id}">${category.name}</option>`;
        });

        // Load locations filter
        const locationFilter = document.getElementById('filterLocation');
        locationFilter.innerHTML = '<option value="">All Locations</option>';
        this.data.locations.forEach(location => {
            locationFilter.innerHTML += `<option value="${location.id}">${location.name}</option>`;
        });
    }

    addItem(formData) {
        const newItem = {
            id: this.generateId(),
            name: formData.name,
            quantity: parseInt(formData.quantity),
            purchasePrice: parseFloat(formData.purchasePrice),
            supplier: formData.supplier,
            location: formData.location,
            categories: formData.categories || [],
            description: formData.description,
            createdDate: new Date().toISOString()
        };

        this.data.items.push(newItem);
        this.saveData();
        this.addActivity(`Added new item: ${newItem.name}`);
        this.loadInventoryTable();
        this.updateDashboard();
    }

    editItem(itemId) {
        const item = this.data.items.find(i => i.id === itemId);
        if (!item) return;

        // Populate edit form
        const form = document.getElementById('editItemForm');
        form.querySelector('[name="id"]').value = item.id;
        form.querySelector('[name="name"]').value = item.name;
        form.querySelector('[name="quantity"]').value = item.quantity;
        form.querySelector('[name="purchasePrice"]').value = item.purchasePrice;
        form.querySelector('[name="supplier"]').value = item.supplier;
        form.querySelector('[name="location"]').value = item.location;
        form.querySelector('[name="description"]').value = item.description || '';

        // Load categories and locations for edit form
        this.loadEditFormData();

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('editItemModal'));
        modal.show();
    }

    updateItem(formData) {
        const itemIndex = this.data.items.findIndex(i => i.id === formData.id);
        if (itemIndex === -1) return;

        this.data.items[itemIndex] = {
            ...this.data.items[itemIndex],
            name: formData.name,
            quantity: parseInt(formData.quantity),
            purchasePrice: parseFloat(formData.purchasePrice),
            supplier: formData.supplier,
            location: formData.location,
            categories: formData.categories || [],
            description: formData.description,
            updatedDate: new Date().toISOString()
        };

        this.saveData();
        this.addActivity(`Updated item: ${formData.name}`);
        this.loadInventoryTable();
        this.updateDashboard();
    }

    deleteItem(itemId) {
        const item = this.data.items.find(i => i.id === itemId);
        if (!item) return;

        this.showConfirmDialog(
            `Are you sure you want to delete "${item.name}"?`,
            () => {
                this.data.items = this.data.items.filter(i => i.id !== itemId);
                this.saveData();
                this.addActivity(`Deleted item: ${item.name}`);
                this.loadInventoryTable();
                this.updateDashboard();
            }
        );
    }

    viewItem(itemId) {
        const item = this.data.items.find(i => i.id === itemId);
        if (!item) return;

        const location = this.data.locations.find(l => l.id === item.location);
        const categories = item.categories
            ? item.categories.map(catId => {
                const cat = this.data.categories.find(c => c.id === catId);
                return cat ? cat.name : '';
            }).filter(Boolean).join(', ')
            : 'None';

        document.getElementById('itemDetails').innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h5>${item.name}</h5>
                    <p><strong>ID:</strong> ${item.id}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <p><strong>Purchase Price:</strong> $${item.purchasePrice}</p>
                    <p><strong>Supplier:</strong> ${item.supplier}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Location:</strong> ${location ? location.name : 'N/A'}</p>
                    <p><strong>Categories:</strong> ${categories}</p>
                    <p><strong>Created:</strong> ${new Date(item.createdDate).toLocaleDateString()}</p>
                    ${item.description ? `<p><strong>Description:</strong> ${item.description}</p>` : ''}
                </div>
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('viewItemModal'));
        modal.show();
    }

    // Sales Management
    loadSalesTable() {
        const tableBody = document.getElementById('salesTable');
        tableBody.innerHTML = '';

        this.data.sales.forEach(sale => {
            const item = this.data.items.find(i => i.id === sale.itemId);
            const profit = item ? ((sale.salePrice - item.purchasePrice) * sale.quantity) : 0;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sale.id.slice(-8)}</td>
                <td>${item ? item.name : 'Unknown Item'}</td>
                <td>${sale.quantity}</td>
                <td>$${sale.salePrice}</td>
                <td>$${item ? item.purchasePrice : 'N/A'}</td>
                <td class="${profit >= 0 ? 'text-success' : 'text-danger'}">
                    $${profit.toFixed(2)}
                </td>
                <td>${sale.buyer}</td>
                <td>${new Date(sale.saleDate).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="app.deleteSale('${sale.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    addSale(formData) {
        const item = this.data.items.find(i => i.id === formData.itemId);
        if (!item) {
            alert('Item not found');
            return;
        }

        if (item.quantity < parseInt(formData.quantity)) {
            alert('Insufficient stock');
            return;
        }

        const newSale = {
            id: this.generateId(),
            itemId: formData.itemId,
            quantity: parseInt(formData.quantity),
            salePrice: parseFloat(formData.salePrice),
            buyer: formData.buyer,
            buyerContact: formData.buyerContact,
            saleDate: formData.saleDate,
            notes: formData.notes,
            createdDate: new Date().toISOString()
        };

        // Update item quantity
        item.quantity -= parseInt(formData.quantity);

        this.data.sales.push(newSale);
        this.saveData();
        this.addActivity(`Recorded sale: ${item.name} x${formData.quantity} to ${formData.buyer}`);
        this.loadSalesTable();
        this.loadInventoryTable();
        this.updateDashboard();
    }

    deleteSale(saleId) {
        const sale = this.data.sales.find(s => s.id === saleId);
        if (!sale) return;

        const item = this.data.items.find(i => i.id === sale.itemId);

        this.showConfirmDialog(
            'Are you sure you want to delete this sale? This will restore the item quantity.',
            () => {
                // Restore item quantity
                if (item) {
                    item.quantity += sale.quantity;
                }

                this.data.sales = this.data.sales.filter(s => s.id !== saleId);
                this.saveData();
                this.addActivity(`Deleted sale: ${sale.id.slice(-8)}`);
                this.loadSalesTable();
                this.loadInventoryTable();
                this.updateDashboard();
            }
        );
    }

    // Categories Management
    loadCategoriesView() {
        const container = document.getElementById('categoriesList');
        container.innerHTML = '';

        this.data.categories.forEach(category => {
            const itemCount = this.data.items.filter(item => 
                item.categories && item.categories.includes(category.id)
            ).length;

            const categoryCard = document.createElement('div');
            categoryCard.className = 'col-md-4 col-sm-6 mb-3';
            categoryCard.innerHTML = `
                <div class="category-card" style="border-left-color: ${category.color}">
                    <div class="category-header">
                        <h5 class="category-name">${category.name}</h5>
                        <div class="category-actions">
                            <button class="btn btn-sm btn-outline-secondary" onclick="app.editCategory('${category.id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="app.deleteCategory('${category.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="category-description">${category.description || 'No description'}</div>
                    <div class="category-items-count">${itemCount} items in this category</div>
                </div>
            `;
            container.appendChild(categoryCard);
        });
    }

    addCategory(formData) {
        const newCategory = {
            id: this.generateId(),
            name: formData.name,
            description: formData.description,
            color: formData.color,
            createdDate: new Date().toISOString()
        };

        this.data.categories.push(newCategory);
        this.saveData();
        this.addActivity(`Added new category: ${newCategory.name}`);
        this.loadCategoriesView();
        this.loadInventoryFilters();
    }

    deleteCategory(categoryId) {
        const category = this.data.categories.find(c => c.id === categoryId);
        if (!category) return;

        this.showConfirmDialog(
            `Are you sure you want to delete "${category.name}" category?`,
            () => {
                // Remove category from all items
                this.data.items.forEach(item => {
                    if (item.categories) {
                        item.categories = item.categories.filter(catId => catId !== categoryId);
                    }
                });

                this.data.categories = this.data.categories.filter(c => c.id !== categoryId);
                this.saveData();
                this.addActivity(`Deleted category: ${category.name}`);
                this.loadCategoriesView();
                this.loadInventoryTable();
            }
        );
    }

    // Locations Management
    loadLocationsTree() {
        const container = document.getElementById('locationsTree');
        container.innerHTML = '';

        const rootLocations = this.data.locations.filter(loc => !loc.parentId);
        rootLocations.forEach(location => {
            this.renderLocationNode(location, container, 0);
        });
    }

    renderLocationNode(location, container, level) {
        const locationNode = document.createElement('div');
        locationNode.className = `location-node level-${level}`;
        
        const children = this.data.locations.filter(loc => loc.parentId === location.id);
        const hasChildren = children.length > 0;

        locationNode.innerHTML = `
            <div class="location-header">
                ${hasChildren ? `<button class="location-toggle collapsed" onclick="app.toggleLocation('${location.id}')"></button>` : '<span style="width: 20px; display: inline-block;"></span>'}
                <div class="location-info">
                    <div class="location-name">${location.name}</div>
                    <small class="location-type">${location.type}</small>
                </div>
                <div class="location-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="app.addChildLocation('${location.id}')">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="app.editLocation('${location.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="app.deleteLocation('${location.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        if (hasChildren) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'location-children';
            childrenContainer.id = `children-${location.id}`;
            childrenContainer.style.display = 'none';

            children.forEach(child => {
                this.renderLocationNode(child, childrenContainer, level + 1);
            });

            locationNode.appendChild(childrenContainer);
        }

        container.appendChild(locationNode);
    }

    toggleLocation(locationId) {
        const toggle = document.querySelector(`[onclick="app.toggleLocation('${locationId}')"]`);
        const children = document.getElementById(`children-${locationId}`);
        
        if (children.style.display === 'none') {
            children.style.display = 'block';
            toggle.classList.remove('collapsed');
            toggle.classList.add('expanded');
        } else {
            children.style.display = 'none';
            toggle.classList.remove('expanded');
            toggle.classList.add('collapsed');
        }
    }

    addLocation(formData) {
        const newLocation = {
            id: this.generateId(),
            name: formData.name,
            type: formData.type,
            parentId: formData.parentId || null,
            description: formData.description,
            createdDate: new Date().toISOString()
        };

        this.data.locations.push(newLocation);
        this.saveData();
        this.addActivity(`Added new location: ${newLocation.name}`);
        this.loadLocationsTree();
        this.loadInventoryFilters();
    }

    deleteLocation(locationId) {
        const location = this.data.locations.find(l => l.id === locationId);
        if (!location) return;

        const hasChildren = this.data.locations.some(l => l.parentId === locationId);
        if (hasChildren) {
            alert('Cannot delete location with child locations. Please delete or move child locations first.');
            return;
        }

        this.showConfirmDialog(
            `Are you sure you want to delete "${location.name}" location?`,
            () => {
                this.data.locations = this.data.locations.filter(l => l.id !== locationId);
                this.saveData();
                this.addActivity(`Deleted location: ${location.name}`);
                this.loadLocationsTree();
            }
        );
    }

    // Tasks Management (Kanban)
    loadTasksKanban() {
        ['todo', 'in-progress', 'done'].forEach(status => {
            const column = document.getElementById(status === 'in-progress' ? 'inProgressColumn' : status + 'Column');
            column.innerHTML = '';

            const tasks = this.data.tasks.filter(task => task.status === status);
            tasks.forEach(task => {
                this.renderTaskCard(task, column);
            });
        });

        this.initializeKanban();
    }

    renderTaskCard(task, container) {
        const assignedUser = this.data.users.find(u => u.id === task.assignedTo);
        const relatedItem = this.data.items.find(i => i.id === task.relatedItem);

        const taskCard = document.createElement('div');
        taskCard.className = `kanban-card priority-${task.priority}`;
        taskCard.setAttribute('data-task-id', task.id);

        taskCard.innerHTML = `
            <div class="kanban-card-title">${task.title}</div>
            <div class="kanban-card-description">${task.description || ''}</div>
            <div class="kanban-card-meta">
                <span class="kanban-card-priority">${task.priority}</span>
                <small>${assignedUser ? assignedUser.username : 'Unassigned'}</small>
            </div>
            ${task.dueDate ? `<small class="text-muted">Due: ${new Date(task.dueDate).toLocaleDateString()}</small>` : ''}
            ${relatedItem ? `<small class="text-info">Related: ${relatedItem.name}</small>` : ''}
            <div class="mt-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="app.editTask('${task.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="app.deleteTask('${task.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        container.appendChild(taskCard);
    }

    initializeKanban() {
        ['todoColumn', 'inProgressColumn', 'doneColumn'].forEach(columnId => {
            const column = document.getElementById(columnId);
            new Sortable(column, {
                group: 'kanban',
                animation: 150,
                onEnd: (evt) => {
                    const taskId = evt.item.getAttribute('data-task-id');
                    const newStatus = evt.to.getAttribute('data-status');
                    this.updateTaskStatus(taskId, newStatus);
                }
            });
        });
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
            this.saveData();
            this.addActivity(`Moved task "${task.title}" to ${newStatus}`);
        }
    }

    addTask(formData) {
        const newTask = {
            id: this.generateId(),
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: 'todo',
            assignedTo: formData.assignedTo || null,
            dueDate: formData.dueDate || null,
            relatedItem: formData.relatedItem || null,
            createdDate: new Date().toISOString()
        };

        this.data.tasks.push(newTask);
        this.saveData();
        this.addActivity(`Added new task: ${newTask.title}`);
        this.loadTasksKanban();
    }

    deleteTask(taskId) {
        const task = this.data.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.showConfirmDialog(
            `Are you sure you want to delete "${task.title}" task?`,
            () => {
                this.data.tasks = this.data.tasks.filter(t => t.id !== taskId);
                this.saveData();
                this.addActivity(`Deleted task: ${task.title}`);
                this.loadTasksKanban();
            }
        );
    }

    // User Management (Admin only)
    loadUsersTable() {
        if (this.currentUser.role !== 'admin') return;

        const tableBody = document.getElementById('usersTable');
        tableBody.innerHTML = '';

        this.data.users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>
                    <span class="badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}">
                        ${user.role}
                    </span>
                </td>
                <td>${new Date(user.createdDate).toLocaleDateString()}</td>
                <td>
                    ${user.id !== this.currentUser.id ? 
                        `<button class="btn btn-sm btn-outline-danger" onclick="app.deleteUser('${user.id}')">
                            <i class="fas fa-trash"></i>
                        </button>` : 
                        '<span class="text-muted">Current User</span>'
                    }
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    addUser(formData) {
        if (this.currentUser.role !== 'admin') return;

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (this.data.users.find(u => u.username === formData.username)) {
            alert('Username already exists');
            return;
        }

        const newUser = {
            id: this.generateId(),
            username: formData.username,
            password: formData.password, // In production, hash this
            role: formData.role,
            fullName: formData.fullName,
            email: formData.email,
            createdDate: new Date().toISOString().split('T')[0]
        };

        this.data.users.push(newUser);
        this.saveData();
        this.addActivity(`Added new user: ${newUser.username}`);
        this.loadUsersTable();
    }

    deleteUser(userId) {
        if (this.currentUser.role !== 'admin') return;

        const user = this.data.users.find(u => u.id === userId);
        if (!user) return;

        if (user.id === this.currentUser.id) {
            alert('Cannot delete current user');
            return;
        }

        this.showConfirmDialog(
            `Are you sure you want to delete user "${user.username}"?`,
            () => {
                this.data.users = this.data.users.filter(u => u.id !== userId);
                this.saveData();
                this.addActivity(`Deleted user: ${user.username}`);
                this.loadUsersTable();
            }
        );
    }

    changePassword(formData) {
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert('New passwords do not match');
            return;
        }

        if (this.currentUser.password !== formData.currentPassword) {
            alert('Current password is incorrect');
            return;
        }

        this.currentUser.password = formData.newPassword;
        const userIndex = this.data.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.data.users[userIndex].password = formData.newPassword;
        }

        this.saveData();
        this.addActivity('Password changed');
        alert('Password changed successfully');
    }

    // Utility Methods
    addActivity(description) {
        this.data.activities.push({
            id: this.generateId(),
            description: description,
            user: this.currentUser.username,
            timestamp: new Date().toISOString()
        });

        // Keep only last 100 activities
        if (this.data.activities.length > 100) {
            this.data.activities = this.data.activities.slice(-100);
        }

        this.saveData();
    }

    showConfirmDialog(message, onConfirm) {
        document.getElementById('confirmMessage').textContent = message;
        
        const confirmBtn = document.getElementById('confirmBtn');
        confirmBtn.onclick = () => {
            onConfirm();
            const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
            modal.hide();
        };

        const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
        modal.show();
    }

    loadFormData() {
        // Load data for add item form
        const locationSelect = document.querySelector('#addItemModal [name="location"]');
        locationSelect.innerHTML = '<option value="">Select Location</option>';
        this.data.locations.forEach(location => {
            locationSelect.innerHTML += `<option value="${location.id}">${location.name}</option>`;
        });

        // Load categories checkboxes
        const categoryContainer = document.getElementById('categoryCheckboxes');
        categoryContainer.innerHTML = '';
        this.data.categories.forEach(category => {
            categoryContainer.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="categories" value="${category.id}" id="cat_${category.id}">
                    <label class="form-check-label" for="cat_${category.id}">
                        ${category.name}
                    </label>
                </div>
            `;
        });

        // Load data for sale form
        const itemSelect = document.querySelector('#addSaleModal [name="itemId"]');
        itemSelect.innerHTML = '<option value="">Select Item</option>';
        this.data.items.forEach(item => {
            itemSelect.innerHTML += `<option value="${item.id}">${item.name} (Stock: ${item.quantity})</option>`;
        });

        // Load parent locations for location form
        const parentSelect = document.querySelector('#addLocationModal [name="parentId"]');
        parentSelect.innerHTML = '<option value="">Root Level</option>';
        this.data.locations.forEach(location => {
            parentSelect.innerHTML += `<option value="${location.id}">${location.name}</option>`;
        });

        // Load users for task assignment
        const assignedToSelect = document.querySelector('#addTaskModal [name="assignedTo"]');
        assignedToSelect.innerHTML = '<option value="">Unassigned</option>';
        this.data.users.forEach(user => {
            assignedToSelect.innerHTML += `<option value="${user.id}">${user.fullName || user.username}</option>`;
        });

        // Load items for task relation
        const relatedItemSelect = document.querySelector('#addTaskModal [name="relatedItem"]');
        relatedItemSelect.innerHTML = '<option value="">No related item</option>';
        this.data.items.forEach(item => {
            relatedItemSelect.innerHTML += `<option value="${item.id}">${item.name}</option>`;
        });
    }

    loadEditFormData() {
        // Similar to loadFormData but for edit forms
        const locationSelect = document.querySelector('#editItemModal [name="location"]');
        locationSelect.innerHTML = '<option value="">Select Location</option>';
        this.data.locations.forEach(location => {
            locationSelect.innerHTML += `<option value="${location.id}">${location.name}</option>`;
        });

        const categoryContainer = document.getElementById('editCategoryCheckboxes');
        categoryContainer.innerHTML = '';
        this.data.categories.forEach(category => {
            categoryContainer.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="categories" value="${category.id}" id="edit_cat_${category.id}">
                    <label class="form-check-label" for="edit_cat_${category.id}">
                        ${category.name}
                    </label>
                </div>
            `;
        });
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (this.login(username, password)) {
                document.getElementById('loginForm').reset();
                document.getElementById('loginError').style.display = 'none';
            } else {
                document.getElementById('loginError').textContent = 'Invalid username or password';
                document.getElementById('loginError').style.display = 'block';
            }
        });

        // Navigation
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.closest('[data-section]').getAttribute('data-section');
                this.showSection(section);
            });
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Change password
        document.getElementById('changePasswordBtn').addEventListener('click', (e) => {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('changePasswordModal'));
            modal.show();
        });

        // Form submissions
        this.setupFormListeners();

        // Search and filters
        this.setupFilterListeners();

        // Modal events
        this.setupModalEvents();
    }

    setupFormListeners() {
        // Add item form
        document.getElementById('addItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            // Handle multiple categories
            const categories = Array.from(document.querySelectorAll('#categoryCheckboxes input:checked'))
                .map(input => input.value);
            data.categories = categories;

            this.addItem(data);
            e.target.reset();
            bootstrap.Modal.getInstance(document.getElementById('addItemModal')).hide();
        });

        // Edit item form
        document.getElementById('editItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            const categories = Array.from(document.querySelectorAll('#editCategoryCheckboxes input:checked'))
                .map(input => input.value);
            data.categories = categories;

            this.updateItem(data);
            bootstrap.Modal.getInstance(document.getElementById('editItemModal')).hide();
        });

        // Add sale form
        document.getElementById('addSaleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            this.addSale(data);
            e.target.reset();
            bootstrap.Modal.getInstance(document.getElementById('addSaleModal')).hide();
        });

        // Add category form
        document.getElementById('addCategoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            this.addCategory(data);
            e.target.reset();
            bootstrap.Modal.getInstance(document.getElementById('addCategoryModal')).hide();
        });

        // Add location form
        document.getElementById('addLocationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            this.addLocation(data);
            e.target.reset();
            bootstrap.Modal.getInstance(document.getElementById('addLocationModal')).hide();
        });

        // Add task form
        document.getElementById('addTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            this.addTask(data);
            e.target.reset();
            bootstrap.Modal.getInstance(document.getElementById('addTaskModal')).hide();
        });

        // Add user form
        document.getElementById('addUserForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            this.addUser(data);
            e.target.reset();
            bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
        });

        // Change password form
        document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            this.changePassword(data);
            e.target.reset();
            bootstrap.Modal.getInstance(document.getElementById('changePasswordModal')).hide();
        });
    }

    setupFilterListeners() {
        // Search items
        document.getElementById('searchItems').addEventListener('input', (e) => {
            // Implement search functionality
            this.filterInventory();
        });

        // Category filter
        document.getElementById('filterCategory').addEventListener('change', () => {
            this.filterInventory();
        });

        // Location filter
        document.getElementById('filterLocation').addEventListener('change', () => {
            this.filterInventory();
        });

        // Clear filters
        document.getElementById('clearFilters').addEventListener('click', () => {
            document.getElementById('searchItems').value = '';
            document.getElementById('filterCategory').value = '';
            document.getElementById('filterLocation').value = '';
            this.filterInventory();
        });
    }

    filterInventory() {
        const searchTerm = document.getElementById('searchItems').value.toLowerCase();
        const categoryFilter = document.getElementById('filterCategory').value;
        const locationFilter = document.getElementById('filterLocation').value;

        const rows = document.querySelectorAll('#inventoryTable tr');
        rows.forEach(row => {
            const cells = row.cells;
            if (!cells || cells.length === 0) return;

            const name = cells[1].textContent.toLowerCase();
            const shouldShow = name.includes(searchTerm);

            row.style.display = shouldShow ? '' : 'none';
        });
    }

    setupModalEvents() {
        // Load form data when modals are shown
        document.getElementById('addItemModal').addEventListener('show.bs.modal', () => {
            this.loadFormData();
        });

        document.getElementById('addSaleModal').addEventListener('show.bs.modal', () => {
            this.loadFormData();
        });

        document.getElementById('addLocationModal').addEventListener('show.bs.modal', () => {
            this.loadFormData();
        });

        document.getElementById('addTaskModal').addEventListener('show.bs.modal', () => {
            this.loadFormData();
        });
    }
}

// Initialize the application
const app = new WarehouseManager(); 