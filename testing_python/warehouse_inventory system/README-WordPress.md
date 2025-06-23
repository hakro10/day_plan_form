# Warehouse Inventory Management - WordPress Plugin

A complete warehouse inventory management system for WordPress with user roles, inventory tracking, sales management, and task organization.

## 🚀 Features

- **Complete Inventory Management**: Track items, quantities, suppliers, locations
- **Sales Tracking**: Record sales, calculate profits, manage buyers
- **User Role Management**: Admin, Warehouse Manager, and Warehouse User roles
- **WordPress Integration**: Uses WordPress users, database, and admin interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Dashboard**: Live statistics and low stock alerts
- **Categories & Locations**: Organize items with multiple categories and hierarchical locations
- **Task Management**: Kanban-style task board (optional frontend)
- **Reports & Analytics**: Sales reports and inventory analytics
- **Security**: WordPress nonces, user capabilities, and sanitized inputs

## 📋 Requirements

- **WordPress**: 5.0 or higher
- **PHP**: 7.4 or higher
- **MySQL**: 5.7 or higher
- **Web Server**: Apache or Nginx
- **Hostinger Compatibility**: ✅ Fully compatible

## 🛠️ Installation on Hostinger

### Step 1: Prepare the Plugin Files

1. **Download/Create the plugin folder structure**:
   ```
   warehouse-inventory/
   ├── warehouse-inventory.php
   ├── templates/
   │   └── admin-dashboard.php
   ├── assets/
   │   ├── admin.js
   │   ├── admin.css
   │   ├── frontend.js
   │   └── frontend.css
   └── README-WordPress.md
   ```

2. **Zip the entire folder** as `warehouse-inventory.zip`

### Step 2: Upload to Hostinger

**Method 1: WordPress Admin (Recommended)**
1. Login to your WordPress admin panel
2. Go to **Plugins** → **Add New**
3. Click **Upload Plugin**
4. Choose your `warehouse-inventory.zip` file
5. Click **Install Now**
6. Click **Activate Plugin**

**Method 2: File Manager**
1. Login to **Hostinger Control Panel**
2. Go to **File Manager**
3. Navigate to `public_html/wp-content/plugins/`
4. Upload and extract the zip file
5. Activate via WordPress admin

**Method 3: FTP/SFTP**
1. Connect via FTP client
2. Upload to `/wp-content/plugins/`
3. Activate via WordPress admin

### Step 3: Plugin Activation

1. After upload, go to **Plugins** in WordPress admin
2. Find **Warehouse Inventory Management**
3. Click **Activate**
4. The plugin will automatically:
   - Create database tables
   - Add user roles
   - Insert default categories and locations

### Step 4: User Setup

**Administrator Access**:
- All WordPress administrators automatically get full warehouse access

**Create Warehouse Users**:
1. Go to **Users** → **Add New**
2. Set role to either:
   - **Warehouse Manager**: Full access to inventory, sales, reports
   - **Warehouse User**: Limited access to view and edit items

### Step 5: Access the System

**Admin Interface**:
- Go to WordPress admin
- Look for **Warehouse** in the admin menu
- Click to access dashboard

**Frontend Display** (Optional):
- Add `[warehouse_inventory]` shortcode to any page
- Users must be logged in to access

## 🎯 Configuration

### User Roles & Permissions

| Role | Capabilities |
|------|-------------|
| **Administrator** | Full access to everything |
| **Warehouse Manager** | Manage inventory, sales, view reports, manage users |
| **Warehouse User** | View and edit inventory items only |

### Default Data

The plugin creates:
- **4 Categories**: Electronics, Furniture, Clothing, Books
- **5 Location Levels**: New York → Main Warehouse → Building A → Floor 1 → Section A1
- **Database tables** with proper indexes and relationships

### Customization

**Low Stock Threshold**:
- Edit in `warehouse-inventory.php`
- Default: 10 items or less

**Currency Format**:
- Uses WordPress locale settings
- Can be customized in templates

## 📊 Usage Guide

### Adding Inventory Items

1. **Warehouse** → **Inventory**
2. Click **Add New Item**
3. Fill in:
   - Item name, quantity, purchase price
   - Supplier information
   - Location selection
   - Categories (multiple allowed)
   - Description

### Recording Sales

1. **Warehouse** → **Sales**
2. Click **Add New Sale**
3. Select item, quantity, sale price
4. Enter buyer information
5. System auto-calculates profit

### Managing Locations

- Hierarchical structure up to 10 levels
- Examples: Country → State → City → Warehouse → Building → Floor → Room → Shelf → Bin → Slot

### Categories

- Create unlimited categories
- Assign multiple categories per item
- Color-coded for easy identification

### Dashboard Overview

- **Total Items**: Current inventory count
- **Total Sales**: Number of transactions
- **Low Stock**: Items below threshold
- **Revenue**: Total sales revenue
- **Recent Activities**: User action log
- **Alerts**: Low stock warnings

## 🔧 Troubleshooting

### Plugin Not Activating
```bash
# Check PHP error logs in Hostinger
tail -f ~/logs/error.log
```

### Database Issues
- Ensure MySQL user has CREATE permissions
- Check `wp_wim_*` tables were created
- Verify WordPress database prefix

### Permission Errors
- Check file permissions: 644 for files, 755 for folders
- Ensure WordPress can write to uploads directory

### Missing Admin Menu
- Check user has proper capabilities
- Try deactivating and reactivating plugin
- Clear cache if using caching plugins

### Frontend Not Loading
- Ensure user is logged in for shortcode
- Check theme compatibility
- Verify JavaScript loading (no conflicts)

## 🚀 Hostinger-Specific Tips

### Performance Optimization
```php
// Add to wp-config.php for better performance
define('WP_CACHE', true);
define('COMPRESS_SCRIPTS', true);
define('COMPRESS_CSS', true);
```

### Database Optimization
- Use Hostinger's database optimization tools
- Set up automated backups
- Monitor database size growth

### Security
- Use Hostinger's security features
- Keep WordPress and plugins updated
- Enable two-factor authentication

### Caching
- Compatible with LiteSpeed Cache (Hostinger's default)
- Clear cache after plugin updates
- Exclude admin pages from caching

## 📚 API Reference

### Shortcode
```php
[warehouse_inventory]
// Displays frontend interface for logged-in users
```

### Hooks & Filters
```php
// Custom hook examples
do_action('wim_item_added', $item_id);
do_action('wim_sale_recorded', $sale_id);

// Filter examples
apply_filters('wim_low_stock_threshold', 10);
apply_filters('wim_dashboard_stats', $stats);
```

### Database Schema
```sql
-- Main tables created:
wp_wim_items         -- Inventory items
wp_wim_sales         -- Sales transactions  
wp_wim_categories    -- Item categories
wp_wim_locations     -- Storage locations
wp_wim_tasks         -- Task management
wp_wim_activities    -- Activity log
```

## 🆘 Support

### Documentation
- In-plugin help tooltips
- This README file
- WordPress Codex for general WP questions

### Common Issues
1. **White screen**: Check PHP error logs
2. **Database errors**: Verify permissions
3. **Missing features**: Check user role capabilities
4. **Styling issues**: Check theme compatibility

### Backup Before Changes
```bash
# Backup database
mysqldump -u username -p database_name > warehouse_backup.sql

# Backup files  
tar -czf warehouse_files.tar.gz wp-content/plugins/warehouse-inventory/
```

## 🔄 Updates

### Manual Updates
1. Backup current installation
2. Download new version
3. Replace plugin files
4. Test functionality

### Automatic Updates
- Enable auto-updates in WordPress (WP 5.5+)
- Monitor update notifications
- Test on staging first

## 📄 License

GPL v2 or later - Compatible with WordPress licensing

## 🏗️ Development

### Local Development
```bash
# Clone/download to local WordPress
cd wp-content/plugins/
git clone [repository] warehouse-inventory
```

### Contributing
- Follow WordPress coding standards
- Test on multiple PHP/WP versions
- Submit pull requests with clear descriptions

---

**Need Help?** Contact support with:
- WordPress version
- PHP version  
- Error messages
- Steps to reproduce issue 