// WordPress Warehouse Inventory Management - Admin JavaScript

jQuery(document).ready(function($) {
    // Initialize DataTables if available
    if ($.fn.DataTable) {
        $('.wim-table').DataTable({
            responsive: true,
            pageLength: 25,
            order: [[0, 'desc']]
        });
    }
    
    // Handle form submissions
    $(document).on('submit', '.wim-form', function(e) {
        e.preventDefault();
        handleFormSubmission($(this));
    });
    
    // Handle delete actions
    $(document).on('click', '.wim-delete', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this item?')) {
            handleDelete($(this));
        }
    });
    
    // Handle status updates
    $(document).on('change', '.wim-status-select', function() {
        handleStatusUpdate($(this));
    });
});

function handleFormSubmission($form) {
    const formData = new FormData($form[0]);
    formData.append('nonce', wim_ajax.nonce);
    
    $.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function() {
            $form.find('input[type="submit"]').prop('disabled', true).val('Processing...');
        },
        success: function(response) {
            if (response.success) {
                showNotice('success', response.data.message || 'Operation completed successfully!');
                if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                } else {
                    location.reload();
                }
            } else {
                showNotice('error', response.data || 'An error occurred.');
            }
        },
        error: function() {
            showNotice('error', 'Network error occurred.');
        },
        complete: function() {
            $form.find('input[type="submit"]').prop('disabled', false).val('Submit');
        }
    });
}

function handleDelete($element) {
    const action = $element.data('action');
    const id = $element.data('id');
    
    $.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: {
            action: action,
            id: id,
            nonce: wim_ajax.nonce
        },
        beforeSend: function() {
            $element.prop('disabled', true).text('Deleting...');
        },
        success: function(response) {
            if (response.success) {
                showNotice('success', 'Item deleted successfully!');
                $element.closest('tr').fadeOut(300, function() {
                    $(this).remove();
                });
            } else {
                showNotice('error', response.data || 'Failed to delete item.');
            }
        },
        error: function() {
            showNotice('error', 'Network error occurred.');
        },
        complete: function() {
            $element.prop('disabled', false).text('Delete');
        }
    });
}

function handleStatusUpdate($select) {
    const action = $select.data('action');
    const id = $select.data('id');
    const status = $select.val();
    
    $.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: {
            action: action,
            id: id,
            status: status,
            nonce: wim_ajax.nonce
        },
        success: function(response) {
            if (response.success) {
                showNotice('success', 'Status updated successfully!');
            } else {
                showNotice('error', response.data || 'Failed to update status.');
            }
        },
        error: function() {
            showNotice('error', 'Network error occurred.');
        }
    });
}

function showNotice(type, message) {
    const noticeClass = type === 'success' ? 'notice-success' : 'notice-error';
    const notice = $('<div class="notice ' + noticeClass + ' is-dismissible"><p>' + message + '</p></div>');
    
    $('.wrap h1').after(notice);
    
    // Auto dismiss after 5 seconds
    setTimeout(function() {
        notice.fadeOut();
    }, 5000);
}

// Dashboard specific functions
function loadDashboardStats() {
    $.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'wim_get_dashboard_stats',
            nonce: wim_ajax.nonce
        },
        success: function(response) {
            if (response.success) {
                const stats = response.data;
                $('#totalItems').text(stats.total_items || '0');
                $('#totalSales').text(stats.total_sales || '0');
                $('#lowStockItems').text(stats.low_stock_items || '0');
                $('#totalRevenue').text('$' + (parseFloat(stats.total_revenue || 0).toFixed(2)));
            }
        }
    });
}

function loadRecentActivities() {
    $.ajax({
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
                    const date = new Date(activity.created_date).toLocaleDateString();
                    html += '<li style="padding: 8px 0; border-bottom: 1px solid #eee;">' + 
                           '<span style="color: #666; font-size: 12px;">' + date + '</span><br>' +
                           activity.description + '</li>';
                });
                $('#recentActivities').html(html || '<li>No recent activities</li>');
            }
        }
    });
}

function loadLowStockAlerts() {
    $.ajax({
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
                           '<strong>' + alert.name + '</strong><br>' +
                           'Stock: ' + alert.quantity + ' | Supplier: ' + alert.supplier + '</li>';
                });
                $('#lowStockAlerts').html(html || '<li>No low stock alerts</li>');
            }
        }
    });
}

// Inventory specific functions
function loadInventoryData() {
    $.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'wim_get_items',
            nonce: wim_ajax.nonce
        },
        success: function(response) {
            if (response.success) {
                renderInventoryTable(response.data);
            }
        }
    });
}

function renderInventoryTable(items) {
    let html = '';
    items.forEach(function(item) {
        const categories = item.categories ? JSON.parse(item.categories) : [];
        const categoryBadges = categories.map(cat => '<span class="badge badge-secondary">' + cat + '</span>').join(' ');
        
        html += '<tr>' +
               '<td>' + item.item_id + '</td>' +
               '<td><strong>' + item.name + '</strong></td>' +
               '<td>' + item.quantity + '</td>' +
               '<td>$' + parseFloat(item.purchase_price).toFixed(2) + '</td>' +
               '<td>' + item.supplier + '</td>' +
               '<td>' + categoryBadges + '</td>' +
               '<td>' + new Date(item.created_date).toLocaleDateString() + '</td>' +
               '<td>' +
               '<button class="button button-small" onclick="editItem(\'' + item.item_id + '\')">Edit</button> ' +
               '<button class="button button-small wim-delete" data-action="wim_delete_item" data-id="' + item.item_id + '">Delete</button>' +
               '</td>' +
               '</tr>';
    });
    $('#inventoryTableBody').html(html);
}

// Sales specific functions
function loadSalesData() {
    $.ajax({
        url: wim_ajax.ajax_url,
        type: 'POST',
        data: {
            action: 'wim_get_sales',
            nonce: wim_ajax.nonce
        },
        success: function(response) {
            if (response.success) {
                renderSalesTable(response.data);
            }
        }
    });
}

function renderSalesTable(sales) {
    let html = '';
    sales.forEach(function(sale) {
        html += '<tr>' +
               '<td>' + sale.sale_id + '</td>' +
               '<td>' + sale.item_name + '</td>' +
               '<td>' + sale.quantity + '</td>' +
               '<td>$' + parseFloat(sale.sale_price).toFixed(2) + '</td>' +
               '<td>$' + parseFloat(sale.total_amount).toFixed(2) + '</td>' +
               '<td style="color: ' + (sale.profit >= 0 ? 'green' : 'red') + '">$' + parseFloat(sale.profit).toFixed(2) + '</td>' +
               '<td>' + sale.buyer + '</td>' +
               '<td>' + sale.sale_date + '</td>' +
               '<td>' +
               '<button class="button button-small wim-delete" data-action="wim_delete_sale" data-id="' + sale.sale_id + '">Delete</button>' +
               '</td>' +
               '</tr>';
    });
    $('#salesTableBody').html(html);
}

// Modal functions
function openModal(modalId) {
    $('#' + modalId).show();
}

function closeModal(modalId) {
    $('#' + modalId).hide();
}

// Form validation
function validateForm($form) {
    let isValid = true;
    $form.find('[required]').each(function() {
        if (!$(this).val()) {
            $(this).addClass('error');
            isValid = false;
        } else {
            $(this).removeClass('error');
        }
    });
    return isValid;
}

// Export functions
function exportToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    let csv = [];
    
    for (let i = 0; i < table.rows.length; i++) {
        let row = [], cols = table.rows[i].querySelectorAll('td, th');
        
        for (let j = 0; j < cols.length - 1; j++) { // Exclude actions column
            row.push(cols[j].innerText);
        }
        csv.push(row.join(','));
    }
    
    const csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
} 