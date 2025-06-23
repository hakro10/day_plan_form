// Demo Data for Warehouse Inventory Management System
// This file contains sample data to help you understand the system better

// Run this in browser console to add demo data
function addDemoData() {
    if (typeof app === 'undefined') {
        console.error('Application not loaded. Please run this after the page loads.');
        return;
    }

    console.log('Adding demo data...');

    // Demo Items
    const demoItems = [
        {
            name: 'MacBook Pro 16"',
            quantity: 25,
            purchasePrice: 1800.00,
            supplier: 'Apple Inc.',
            description: 'Latest MacBook Pro with M2 chip',
            categories: ['electronics']
        },
        {
            name: 'Office Chair Pro',
            quantity: 50,
            purchasePrice: 299.99,
            supplier: 'ErgoFurniture Co.',
            description: 'Ergonomic office chair with lumbar support',
            categories: ['furniture']
        },
        {
            name: 'Wireless Mouse',
            quantity: 8,
            purchasePrice: 25.50,
            supplier: 'TechGear Ltd.',
            description: 'Bluetooth wireless mouse with precision tracking',
            categories: ['electronics']
        },
        {
            name: 'Business Suit',
            quantity: 15,
            purchasePrice: 450.00,
            supplier: 'Fashion Forward',
            description: 'Professional business suit - Navy Blue',
            categories: ['clothing']
        },
        {
            name: 'Standing Desk',
            quantity: 12,
            purchasePrice: 599.99,
            supplier: 'WorkSpace Solutions',
            description: 'Height-adjustable standing desk',
            categories: ['furniture']
        },
        {
            name: 'Programming Books Set',
            quantity: 30,
            purchasePrice: 89.99,
            supplier: 'BookWorld',
            description: 'Complete set of modern programming books',
            categories: ['books']
        }
    ];

    // Add demo items
    demoItems.forEach(item => {
        const categoryIds = item.categories.map(catName => {
            const category = app.data.categories.find(c => c.name.toLowerCase().includes(catName));
            return category ? category.id : null;
        }).filter(Boolean);

        const locationId = app.data.locations.length > 0 ? app.data.locations[0].id : null;

        const formData = {
            name: item.name,
            quantity: item.quantity.toString(),
            purchasePrice: item.purchasePrice.toString(),
            supplier: item.supplier,
            location: locationId,
            categories: categoryIds,
            description: item.description
        };

        app.addItem(formData);
    });

    // Demo Sales (after items are added)
    setTimeout(() => {
        const demoSales = [
            {
                itemName: 'Wireless Mouse',
                quantity: 2,
                salePrice: 35.00,
                buyer: 'John Smith',
                buyerContact: 'john@email.com',
                saleDate: '2024-01-15',
                notes: 'Bulk purchase for office'
            },
            {
                itemName: 'Business Suit',
                quantity: 1,
                salePrice: 650.00,
                buyer: 'Sarah Johnson',
                buyerContact: 'sarah@company.com',
                saleDate: '2024-01-18',
                notes: 'Corporate client'
            },
            {
                itemName: 'Office Chair Pro',
                quantity: 5,
                salePrice: 399.99,
                buyer: 'Tech Startup Inc.',
                buyerContact: 'orders@techstartup.com',
                saleDate: '2024-01-20',
                notes: 'New office setup'
            }
        ];

        // Add demo sales
        demoSales.forEach(sale => {
            const item = app.data.items.find(i => i.name === sale.itemName);
            if (item) {
                const formData = {
                    itemId: item.id,
                    quantity: sale.quantity.toString(),
                    salePrice: sale.salePrice.toString(),
                    buyer: sale.buyer,
                    buyerContact: sale.buyerContact,
                    saleDate: sale.saleDate,
                    notes: sale.notes
                };

                app.addSale(formData);
            }
        });

        // Demo Tasks
        const demoTasks = [
            {
                title: 'Restock Wireless Mice',
                description: 'Order more wireless mice - running low on stock',
                priority: 'high',
                status: 'todo'
            },
            {
                title: 'Organize Electronics Section',
                description: 'Reorganize the electronics section for better accessibility',
                priority: 'medium',
                status: 'in-progress'
            },
            {
                title: 'Update Supplier Contacts',
                description: 'Review and update all supplier contact information',
                priority: 'low',
                status: 'todo'
            },
            {
                title: 'Monthly Inventory Audit',
                description: 'Completed monthly audit of all warehouse sections',
                priority: 'medium',
                status: 'done'
            },
            {
                title: 'Setup New Storage Area',
                description: 'Prepare new storage area for incoming furniture shipment',
                priority: 'urgent',
                status: 'todo'
            }
        ];

        // Add demo tasks
        demoTasks.forEach(task => {
            const formData = {
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status
            };

            // Create task directly (bypassing form since status varies)
            const newTask = {
                id: app.generateId(),
                title: formData.title,
                description: formData.description,
                priority: formData.priority,
                status: task.status,
                assignedTo: null,
                dueDate: null,
                relatedItem: null,
                createdDate: new Date().toISOString()
            };

            app.data.tasks.push(newTask);
        });

        app.saveData();
        
        console.log('✅ Demo data added successfully!');
        console.log('📊 Added:', demoItems.length, 'items');
        console.log('💰 Added:', demoSales.length, 'sales');
        console.log('✅ Added:', demoTasks.length, 'tasks');
        console.log('🔄 Refresh the page to see all demo data');
        
        // Refresh current section if possible
        if (app.currentUser) {
            app.updateDashboard();
        }

    }, 1000);
}

// Instructions for use
console.log('🎯 DEMO DATA LOADER');
console.log('📝 To add demo data to your warehouse system:');
console.log('1. Login to the system first');
console.log('2. Run: addDemoData()');
console.log('3. Wait for confirmation message');
console.log('4. Refresh the page to see all data');
console.log('');
console.log('💡 This will add sample items, sales, and tasks to help you explore the system!');

// Auto-run if in demo mode (uncomment the line below to auto-load demo data)
// setTimeout(() => { if (typeof app !== 'undefined' && app.currentUser) addDemoData(); }, 2000); 