<?php
/**
 * Plugin Name: Warehouse Inventory Management
 * Plugin URI: https://your-website.com
 * Description: Complete warehouse inventory management system with user roles, inventory tracking, sales, and task management.
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('WIM_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WIM_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('WIM_VERSION', '1.0.0');

class WarehouseInventoryManager {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        // Add admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Enqueue scripts and styles
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'frontend_scripts'));
        
        // AJAX handlers
        add_action('wp_ajax_wim_add_item', array($this, 'ajax_add_item'));
        add_action('wp_ajax_wim_get_items', array($this, 'ajax_get_items'));
        add_action('wp_ajax_wim_update_item', array($this, 'ajax_update_item'));
        add_action('wp_ajax_wim_delete_item', array($this, 'ajax_delete_item'));
        add_action('wp_ajax_wim_add_sale', array($this, 'ajax_add_sale'));
        add_action('wp_ajax_wim_get_sales', array($this, 'ajax_get_sales'));
        add_action('wp_ajax_wim_add_category', array($this, 'ajax_add_category'));
        add_action('wp_ajax_wim_get_categories', array($this, 'ajax_get_categories'));
        add_action('wp_ajax_wim_add_location', array($this, 'ajax_add_location'));
        add_action('wp_ajax_wim_get_locations', array($this, 'ajax_get_locations'));
        add_action('wp_ajax_wim_add_task', array($this, 'ajax_add_task'));
        add_action('wp_ajax_wim_get_tasks', array($this, 'ajax_get_tasks'));
        add_action('wp_ajax_wim_update_task_status', array($this, 'ajax_update_task_status'));
        
        // Add shortcode for frontend display
        add_shortcode('warehouse_inventory', array($this, 'shortcode_display'));
        
        // Add user role
        add_action('init', array($this, 'add_warehouse_roles'));
    }
    
    public function activate() {
        $this->create_tables();
        $this->add_warehouse_roles();
        flush_rewrite_rules();
    }
    
    public function deactivate() {
        flush_rewrite_rules();
    }
    
    public function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Items table
        $table_items = $wpdb->prefix . 'wim_items';
        $sql_items = "CREATE TABLE $table_items (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            item_id varchar(50) NOT NULL,
            name varchar(255) NOT NULL,
            description text,
            quantity int(11) NOT NULL DEFAULT 0,
            purchase_price decimal(10,2) NOT NULL,
            supplier varchar(255),
            location_id varchar(50),
            categories text,
            created_date datetime DEFAULT CURRENT_TIMESTAMP,
            updated_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY item_id (item_id)
        ) $charset_collate;";
        
        // Sales table
        $table_sales = $wpdb->prefix . 'wim_sales';
        $sql_sales = "CREATE TABLE $table_sales (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            sale_id varchar(50) NOT NULL,
            item_id varchar(50) NOT NULL,
            quantity int(11) NOT NULL,
            sale_price decimal(10,2) NOT NULL,
            total_amount decimal(10,2) NOT NULL,
            profit decimal(10,2) NOT NULL,
            buyer varchar(255) NOT NULL,
            buyer_contact varchar(255),
            sale_date date NOT NULL,
            notes text,
            created_date datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY sale_id (sale_id)
        ) $charset_collate;";
        
        // Categories table
        $table_categories = $wpdb->prefix . 'wim_categories';
        $sql_categories = "CREATE TABLE $table_categories (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            category_id varchar(50) NOT NULL,
            name varchar(255) NOT NULL,
            description text,
            color varchar(7) DEFAULT '#007bff',
            created_date datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY category_id (category_id)
        ) $charset_collate;";
        
        // Locations table
        $table_locations = $wpdb->prefix . 'wim_locations';
        $sql_locations = "CREATE TABLE $table_locations (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            location_id varchar(50) NOT NULL,
            name varchar(255) NOT NULL,
            parent_id varchar(50),
            type varchar(50) NOT NULL,
            description text,
            created_date datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY location_id (location_id)
        ) $charset_collate;";
        
        // Tasks table
        $table_tasks = $wpdb->prefix . 'wim_tasks';
        $sql_tasks = "CREATE TABLE $table_tasks (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            task_id varchar(50) NOT NULL,
            title varchar(255) NOT NULL,
            description text,
            status varchar(20) DEFAULT 'todo',
            priority varchar(20) DEFAULT 'medium',
            assigned_to int(11),
            due_date date,
            related_item varchar(50),
            created_date datetime DEFAULT CURRENT_TIMESTAMP,
            updated_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY task_id (task_id)
        ) $charset_collate;";
        
        // Activities table
        $table_activities = $wpdb->prefix . 'wim_activities';
        $sql_activities = "CREATE TABLE $table_activities (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            activity_id varchar(50) NOT NULL,
            description text NOT NULL,
            user_id int(11) NOT NULL,
            created_date datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_items);
        dbDelta($sql_sales);
        dbDelta($sql_categories);
        dbDelta($sql_locations);
        dbDelta($sql_tasks);
        dbDelta($sql_activities);
        
        // Insert default data
        $this->insert_default_data();
    }
    
    public function insert_default_data() {
        global $wpdb;
        
        // Default categories
        $categories = array(
            array('Electronics', 'Electronic devices and components', '#007bff'),
            array('Furniture', 'Office and home furniture', '#28a745'),
            array('Clothing', 'Apparel and accessories', '#ffc107'),
            array('Books', 'Books and publications', '#17a2b8')
        );
        
        foreach ($categories as $category) {
            $wpdb->insert(
                $wpdb->prefix . 'wim_categories',
                array(
                    'category_id' => $this->generate_id(),
                    'name' => $category[0],
                    'description' => $category[1],
                    'color' => $category[2]
                )
            );
        }
        
        // Default locations
        $locations = array(
            array('New York', null, 'town'),
            array('Main Warehouse', null, 'warehouse'),
            array('Building A', null, 'building'),
            array('Floor 1', null, 'floor'),
            array('Section A1', null, 'room')
        );
        
        $parent_id = null;
        foreach ($locations as $location) {
            $location_id = $this->generate_id();
            $wpdb->insert(
                $wpdb->prefix . 'wim_locations',
                array(
                    'location_id' => $location_id,
                    'name' => $location[0],
                    'parent_id' => $parent_id,
                    'type' => $location[2]
                )
            );
            $parent_id = $location_id;
        }
    }
    
    public function add_warehouse_roles() {
        // Add warehouse manager role
        add_role(
            'warehouse_manager',
            'Warehouse Manager',
            array(
                'read' => true,
                'manage_warehouse' => true,
                'edit_warehouse_items' => true,
                'delete_warehouse_items' => true,
                'view_warehouse_reports' => true,
            )
        );
        
        // Add warehouse user role
        add_role(
            'warehouse_user',
            'Warehouse User',
            array(
                'read' => true,
                'view_warehouse_items' => true,
                'edit_warehouse_items' => true,
            )
        );
        
        // Add capabilities to administrator
        $admin_role = get_role('administrator');
        if ($admin_role) {
            $admin_role->add_cap('manage_warehouse');
            $admin_role->add_cap('edit_warehouse_items');
            $admin_role->add_cap('delete_warehouse_items');
            $admin_role->add_cap('view_warehouse_reports');
        }
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Warehouse Inventory',
            'Warehouse',
            'manage_warehouse',
            'warehouse-inventory',
            array($this, 'admin_page'),
            'dashicons-store',
            30
        );
        
        add_submenu_page(
            'warehouse-inventory',
            'Dashboard',
            'Dashboard',
            'manage_warehouse',
            'warehouse-inventory',
            array($this, 'admin_page')
        );
        
        add_submenu_page(
            'warehouse-inventory',
            'Inventory',
            'Inventory',
            'edit_warehouse_items',
            'warehouse-inventory-items',
            array($this, 'inventory_page')
        );
        
        add_submenu_page(
            'warehouse-inventory',
            'Sales',
            'Sales',
            'edit_warehouse_items',
            'warehouse-inventory-sales',
            array($this, 'sales_page')
        );
        
        add_submenu_page(
            'warehouse-inventory',
            'Reports',
            'Reports',
            'view_warehouse_reports',
            'warehouse-inventory-reports',
            array($this, 'reports_page')
        );
    }
    
    public function admin_scripts($hook) {
        if (strpos($hook, 'warehouse-inventory') !== false) {
            wp_enqueue_script('jquery');
            wp_enqueue_script('wim-admin', WIM_PLUGIN_URL . 'assets/admin.js', array('jquery'), WIM_VERSION, true);
            wp_enqueue_style('wim-admin', WIM_PLUGIN_URL . 'assets/admin.css', array(), WIM_VERSION);
            wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
            wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', array(), '5.3.0', true);
            wp_enqueue_script('sortable', 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js', array(), '1.15.0', true);
            
            wp_localize_script('wim-admin', 'wim_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('wim_nonce')
            ));
        }
    }
    
    public function frontend_scripts() {
        wp_enqueue_script('jquery');
        wp_enqueue_script('wim-frontend', WIM_PLUGIN_URL . 'assets/frontend.js', array('jquery'), WIM_VERSION, true);
        wp_enqueue_style('wim-frontend', WIM_PLUGIN_URL . 'assets/frontend.css', array(), WIM_VERSION);
        wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', array(), '5.3.0', true);
        
        wp_localize_script('wim-frontend', 'wim_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('wim_nonce')
        ));
    }
    
    private function generate_id() {
        return 'wim_' . uniqid() . '_' . time();
    }
    
    // AJAX Handlers
    public function ajax_add_item() {
        check_ajax_referer('wim_nonce', 'nonce');
        
        if (!current_user_can('edit_warehouse_items')) {
            wp_die('Unauthorized');
        }
        
        global $wpdb;
        
        $data = array(
            'item_id' => $this->generate_id(),
            'name' => sanitize_text_field($_POST['name']),
            'description' => sanitize_textarea_field($_POST['description']),
            'quantity' => intval($_POST['quantity']),
            'purchase_price' => floatval($_POST['purchase_price']),
            'supplier' => sanitize_text_field($_POST['supplier']),
            'location_id' => sanitize_text_field($_POST['location_id']),
            'categories' => sanitize_text_field($_POST['categories'])
        );
        
        $result = $wpdb->insert($wpdb->prefix . 'wim_items', $data);
        
        if ($result) {
            wp_send_json_success(array('message' => 'Item added successfully', 'id' => $data['item_id']));
        } else {
            wp_send_json_error('Failed to add item');
        }
    }
    
    public function ajax_get_items() {
        check_ajax_referer('wim_nonce', 'nonce');
        
        if (!current_user_can('view_warehouse_items')) {
            wp_die('Unauthorized');
        }
        
        global $wpdb;
        $items = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}wim_items ORDER BY created_date DESC");
        wp_send_json_success($items);
    }
    
    // Admin page templates
    public function admin_page() {
        include WIM_PLUGIN_PATH . 'templates/admin-dashboard.php';
    }
    
    public function inventory_page() {
        include WIM_PLUGIN_PATH . 'templates/admin-inventory.php';
    }
    
    public function sales_page() {
        include WIM_PLUGIN_PATH . 'templates/admin-sales.php';
    }
    
    public function reports_page() {
        include WIM_PLUGIN_PATH . 'templates/admin-reports.php';
    }
    
    public function shortcode_display($atts) {
        if (!is_user_logged_in()) {
            return '<p>Please log in to access the warehouse system.</p>';
        }
        
        ob_start();
        include WIM_PLUGIN_PATH . 'templates/frontend-display.php';
        return ob_get_clean();
    }
}

// Initialize the plugin
new WarehouseInventoryManager(); 