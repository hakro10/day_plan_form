# Warehouse Inventory Management System

A comprehensive, beginner-friendly warehouse inventory management system built with HTML, CSS, JavaScript, and Bootstrap. This system provides complete inventory tracking, sales management, user administration, and task management capabilities.

## Features

### 🔐 User Management & Authentication
- **Admin Dashboard**: Complete user management with role-based access
- **Secure Login**: Username/password authentication
- **Password Management**: Users can change their passwords
- **Role-Based Access**: Admin and regular user roles with different permissions

### 📊 Dashboard & Analytics
- **Real-time Statistics**: Total items, sales revenue, profit tracking
- **Low Stock Alerts**: Automatic alerts for items below threshold
- **Recent Activities**: Track all system activities with timestamps
- **Visual Cards**: Modern dashboard with color-coded metrics

### 📦 Inventory Management
- **Auto-Generated IDs**: Unique item identification system
- **Complete Item Tracking**: Name, quantity, purchase price, supplier
- **Location Management**: Hierarchical location system (Town → Warehouse → Building → Floor → Room → Shelf → Bin)
- **Category System**: Multiple categories per item with color coding
- **Search & Filter**: Advanced filtering by category, location, and text search
- **Stock Management**: Real-time quantity tracking and low stock alerts

### 💰 Sales Management
- **Sales Recording**: Complete sales tracking with buyer information
- **Profit Calculation**: Automatic profit calculation per sale
- **Stock Deduction**: Automatic inventory updates on sales
- **Sales History**: Complete transaction history with filtering
- **Buyer Management**: Track customer information and contact details

### 🏷️ Categories Management
- **Color-Coded Categories**: Visual category organization
- **Multiple Categories**: Items can belong to multiple categories
- **Category Analytics**: Track items per category
- **Easy Management**: Add/remove categories with impact tracking

### 📍 Hierarchical Locations
- **10-Level Deep Hierarchy**: Flexible location structure
- **Visual Tree Structure**: Expandable/collapsible location tree
- **Location Types**: Town, Warehouse, Building, Floor, Room, Shelf, Bin
- **Parent-Child Relationships**: Organized location management

### ✅ Task Management (Kanban Board)
- **Drag & Drop**: Interactive kanban board with Sortable.js
- **Three Columns**: To Do, In Progress, Done
- **Priority Levels**: Low, Medium, High, Urgent with visual indicators
- **Task Assignment**: Assign tasks to users
- **Due Dates**: Track task deadlines
- **Item Linking**: Link tasks to specific inventory items

### 📱 Mobile-Friendly Design
- **Responsive Layout**: Works on all device sizes
- **Bootstrap 5**: Modern, mobile-first design
- **Touch-Friendly**: Optimized for mobile interaction
- **Adaptive Navigation**: Collapsible navigation for mobile

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser
- JavaScript enabled

### Installation
1. **Download/Clone** the project files
2. **Open** `index.html` in your web browser
3. **Login** with default admin credentials:
   - Username: `admin`
   - Password: `admin123`

### Default Data
The system comes pre-loaded with:
- **Admin User**: Username `admin`, Password `admin123`
- **Sample Categories**: Electronics, Furniture, Clothing
- **Sample Locations**: Hierarchical warehouse structure
- **Sample Data**: Ready to explore all features

## How to Use

### 1. First Login
- Open the system in your browser
- Use admin credentials (admin/admin123)
- Change the default password immediately
- Explore the dashboard

### 2. Adding Users (Admin Only)
- Navigate to **Admin Panel**
- Click **Add User**
- Fill in user details and assign role
- Share credentials with new users

### 3. Setting Up Locations
- Go to **Locations** section
- Create hierarchical structure:
  ```
  New York (Town)
  └── Main Warehouse (Warehouse)
      └── Building A (Building)
          └── Floor 1 (Floor)
              └── Section A1 (Room)
                  └── Shelf 1 (Shelf)
                      └── Bin A1-1 (Bin)
  ```

### 4. Creating Categories
- Visit **Categories** section
- Add categories like "Electronics", "Furniture"
- Choose colors for visual identification
- Add descriptions for clarity

### 5. Managing Inventory
- Go to **Inventory** section
- Click **Add Item**
- Fill in all details:
  - Name and description
  - Quantity and purchase price
  - Supplier information
  - Location and categories
- Use search and filters to find items
- View item details, edit, or delete as needed

### 6. Recording Sales
- Navigate to **Sales** section
- Click **Add Sale**
- Select item and quantity
- Enter sale price and buyer details
- System automatically:
  - Calculates profit
  - Updates inventory quantity
  - Records transaction

### 7. Task Management
- Open **Tasks** section
- Create tasks with priorities and assignments
- Drag tasks between columns:
  - **To Do**: New tasks
  - **In Progress**: Active tasks
  - **Done**: Completed tasks
- Link tasks to specific inventory items

### 8. Monitoring Dashboard
- Check daily statistics
- Monitor low stock alerts
- Review recent activities
- Track overall performance

## Data Storage

- **Local Storage**: All data stored in browser's local storage
- **Persistent**: Data survives browser restarts
- **Backup**: Export/import functionality can be added
- **Security**: Data stays on your device

## Customization

### Adding New Features
The modular design makes it easy to add features:

```javascript
// Add new section to app.js
case 'new-section':
    this.loadNewSection();
    break;
```

### Styling
Modify `styles.css` for custom appearance:
- Change color scheme in `:root` variables
- Adjust layout breakpoints
- Add custom animations

### Data Structure
Extend the data model in `app.js`:
```javascript
this.data = {
    users: [],
    items: [],
    sales: [],
    categories: [],
    locations: [],
    tasks: [],
    activities: [],
    // Add new data types here
};
```

## Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Optimized for mobile

## Security Notes

⚠️ **Important for Production Use**:
- This is a demo system - passwords are stored in plain text
- For production, implement proper password hashing
- Add server-side authentication
- Use HTTPS for sensitive data
- Implement proper user session management

## Troubleshooting

### Data Not Saving
- Check if JavaScript is enabled
- Ensure browser supports local storage
- Clear browser cache and try again

### Login Issues
- Use default credentials: admin/admin123
- Check browser console for errors
- Refresh page and try again

### Mobile Issues
- Ensure JavaScript is enabled
- Try in mobile browser's desktop mode
- Clear mobile browser cache

## Future Enhancements

### Planned Features
- **Export/Import**: Data backup and restore
- **Reports**: Detailed analytics and reports
- **Barcode Support**: Scan items with camera
- **Multi-warehouse**: Support multiple warehouses
- **API Integration**: Connect to external systems
- **Advanced Security**: Proper authentication system

### Contributing
This is a learning project - feel free to:
- Fork the repository
- Add new features
- Improve the UI/UX
- Fix bugs
- Share your improvements

## Support

For questions or issues:
- Check the browser console for error messages
- Ensure all files are in the same directory
- Try in a different browser
- Clear browser data and retry

## License

This project is created for educational purposes. Feel free to use, modify, and distribute as needed.

---

**Happy Inventory Management!** 🚀

*Created as a beginner-friendly warehouse management solution with modern web technologies.* 