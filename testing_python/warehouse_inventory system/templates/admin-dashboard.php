<?php
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><i class="dashicons dashicons-store"></i> Warehouse Inventory Dashboard</h1>
    
    <div id="dashboard-widgets-wrap">
        <div id="dashboard-widgets" class="metabox-holder">
            
            <!-- Statistics Cards -->
            <div class="postbox-container" style="width: 100%;">
                <div class="postbox">
                    <h2><span>Overview Statistics</span></h2>
                    <div class="inside">
                        <div class="row" style="display: flex; gap: 20px; margin-bottom: 20px;">
                            <div class="stat-card" style="flex: 1; background: #007bff; color: white; padding: 20px; border-radius: 8px;">
                                <h3 style="margin: 0; color: white;">Total Items</h3>
                                <p style="font-size: 24px; margin: 10px 0 0 0;" id="totalItems">Loading...</p>
                            </div>
                            <div class="stat-card" style="flex: 1; background: #28a745; color: white; padding: 20px; border-radius: 8px;">
                                <h3 style="margin: 0; color: white;">Total Sales</h3>
                                <p style="font-size: 24px; margin: 10px 0 0 0;" id="totalSales">Loading...</p>
                            </div>
                            <div class="stat-card" style="flex: 1; background: #ffc107; color: black; padding: 20px; border-radius: 8px;">
                                <h3 style="margin: 0;">Low Stock Items</h3>
                                <p style="font-size: 24px; margin: 10px 0 0 0;" id="lowStockItems">Loading...</p>
                            </div>
                            <div class="stat-card" style="flex: 1; background: #17a2b8; color: white; padding: 20px; border-radius: 8px;">
                                <h3 style="margin: 0; color: white;">Total Revenue</h3>
                                <p style="font-size: 24px; margin: 10px 0 0 0;" id="totalRevenue">Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Recent Activities and Alerts -->
            <div class="postbox-container" style="width: 48%; float: left;">
                <div class="postbox">
                    <h2><span>Recent Activities</span></h2>
                    <div class="inside">
                        <ul id="recentActivities" style="list-style: none; padding: 0;">
                            <li>Loading activities...</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="postbox-container" style="width: 48%; float: right;">
                <div class="postbox">
                    <h2><span>Low Stock Alerts</span></h2>
                    <div class="inside">
                        <ul id="lowStockAlerts" style="list-style: none; padding: 0;">
                            <li>Loading alerts...</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div style="clear: both;"></div>
            
            <!-- Quick Actions -->
            <div class="postbox-container" style="width: 100%;">
                <div class="postbox">
                    <h2><span>Quick Actions</span></h2>
                    <div class="inside">
                        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                            <a href="<?php echo admin_url('admin.php?page=warehouse-inventory-items'); ?>" class="button button-primary">
                                <span class="dashicons dashicons-products"></span> Manage Inventory
                            </a>
                            <a href="<?php echo admin_url('admin.php?page=warehouse-inventory-sales'); ?>" class="button button-secondary">
                                <span class="dashicons dashicons-chart-line"></span> Record Sale
                            </a>
                            <button class="button button-secondary" onclick="openAddItemModal()">
                                <span class="dashicons dashicons-plus"></span> Add Item
                            </button>
                            <a href="<?php echo admin_url('admin.php?page=warehouse-inventory-reports'); ?>" class="button button-secondary">
                                <span class="dashicons dashicons-chart-bar"></span> View Reports
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>

<!-- Add Item Modal -->
<div id="addItemModal" class="wim-modal" style="display: none;">
    <div class="wim-modal-content">
        <div class="wim-modal-header">
            <h3>Add New Item</h3>
            <span class="wim-close" onclick="closeAddItemModal()">&times;</span>
        </div>
        <div class="wim-modal-body">
            <form id="addItemForm">
                <table class="form-table">
                    <tr>
                        <th><label for="itemName">Item Name</label></th>
                        <td><input type="text" id="itemName" name="name" class="regular-text" required></td>
                    </tr>
                    <tr>
                        <th><label for="itemQuantity">Quantity</label></th>
                        <td><input type="number" id="itemQuantity" name="quantity" class="regular-text" required></td>
                    </tr>
                    <tr>
                        <th><label for="itemPrice">Purchase Price</label></th>
                        <td><input type="number" step="0.01" id="itemPrice" name="purchase_price" class="regular-text" required></td>
                    </tr>
                    <tr>
                        <th><label for="itemSupplier">Supplier</label></th>
                        <td><input type="text" id="itemSupplier" name="supplier" class="regular-text" required></td>
                    </tr>
                    <tr>
                        <th><label for="itemLocation">Location</label></th>
                        <td>
                            <select id="itemLocation" name="location_id" class="regular-text">
                                <option value="">Select Location</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="itemDescription">Description</label></th>
                        <td><textarea id="itemDescription" name="description" class="large-text" rows="3"></textarea></td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="wim-modal-footer">
            <button type="button" class="button" onclick="closeAddItemModal()">Cancel</button>
            <button type="submit" form="addItemForm" class="button button-primary">Add Item</button>
        </div>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    loadDashboardData();
    
    $('#addItemForm').on('submit', function(e) {
        e.preventDefault();
        addItem();
    });
});

function loadDashboardData() {
    // Load statistics
    jQuery.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'wim_get_dashboard_stats',
            nonce: wim_ajax.nonce
        },
        success: function(response) {
            if (response.success) {
                const stats = response.data;
                jQuery('#totalItems').text(stats.total_items || '0');
                jQuery('#totalSales').text(stats.total_sales || '0');
                jQuery('#lowStockItems').text(stats.low_stock_items || '0');
                jQuery('#totalRevenue').text('$' + (stats.total_revenue || '0'));
            }
        }
    });
    
    // Load recent activities
    jQuery.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'wim_get_recent_activities',
            nonce: wim_ajax.nonce
        },
        success: function(response) {
            if (response.success) {
                const activities = response.data;
                let html = '';
                activities.forEach(function(activity) {
                    html += '<li style="padding: 8px 0; border-bottom: 1px solid #eee;">' + activity.description + '</li>';
                });
                jQuery('#recentActivities').html(html || '<li>No recent activities</li>');
            }
        }
    });
    
    // Load low stock alerts
    jQuery.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'wim_get_low_stock_alerts',
            nonce: wim_ajax.nonce
        },
        success: function(response) {
            if (response.success) {
                const alerts = response.data;
                let html = '';
                alerts.forEach(function(alert) {
                    html += '<li style="padding: 8px 0; border-bottom: 1px solid #eee; color: #d63384;">' + 
                           alert.name + ' (Stock: ' + alert.quantity + ')</li>';
                });
                jQuery('#lowStockAlerts').html(html || '<li>No low stock alerts</li>');
            }
        }
    });
}

function openAddItemModal() {
    jQuery('#addItemModal').show();
}

function closeAddItemModal() {
    jQuery('#addItemModal').hide();
    jQuery('#addItemForm')[0].reset();
}

function addItem() {
    const formData = new FormData(jQuery('#addItemForm')[0]);
    formData.append('action', 'wim_add_item');
    formData.append('nonce', wim_ajax.nonce);
    
    jQuery.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            if (response.success) {
                alert('Item added successfully!');
                closeAddItemModal();
                loadDashboardData();
            } else {
                alert('Error: ' + response.data);
            }
        }
    });
}
</script>

<style>
.wim-modal {
    display: none;
    position: fixed;
    z-index: 100000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.wim-modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    border-radius: 4px;
}

.wim-modal-header {
    padding: 15px 20px;
    background-color: #f1f1f1;
    border-bottom: 1px solid #ddd;
    position: relative;
}

.wim-modal-header h3 {
    margin: 0;
}

.wim-close {
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.wim-modal-body {
    padding: 20px;
}

.wim-modal-footer {
    padding: 15px 20px;
    background-color: #f1f1f1;
    border-top: 1px solid #ddd;
    text-align: right;
}

.stat-card {
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 