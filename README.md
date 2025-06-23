# 🚛 Transport Planning System

A comprehensive fleet management and route planning system designed for transport companies to manage both local and international logistics operations.

## 📋 System Overview

This system provides two distinct planning workflows:
- **Local Transport Planning**: Same-day routes with precise time windows
- **International Transport Planning**: Multi-day cross-border journeys with customs and compliance management

## 🌟 Features

### Local Transport Planning
- ✅ Hourly time window scheduling
- ✅ Multiple collection/delivery points per route
- ✅ Priority-based stop ordering
- ✅ Same-day return to depot options
- ✅ Real-time driver notifications via Telegram
- ✅ Route optimization with duration estimates

### International Transport Planning
- 🌍 Multi-country routing with border crossings
- 📋 Customs documentation tracking
- 🛏️ EU driver rest period compliance (13h max driving, 8h rest)
- 👥 Team driver coordination for long hauls
- 🔔 Border crossing and progress notifications
- 📅 Multi-day journey scheduling

### Fleet Management
- 🚛 Truck registration and management
- 🚚 Trailer registration with specifications
- 👥 Driver management with contact details
- 📱 Telegram integration for notifications
- 📋 Proof of Delivery (POD) upload system

## 🚀 Quick Start

### For Planners
1. **Access the Dashboard**: Open `index.html` to see all available options
2. **Local Planning**: Use for same-day deliveries within your region
3. **International Planning**: Use for cross-border multi-day journeys
4. **Fleet Management**: Manage drivers, trucks, and trailers

### For Drivers
- Receive route plans via Telegram
- Upload POD documents with photos
- Real-time communication with dispatch

## 📁 File Structure

```
driver_day_planing/
├── index.html                      # Main dashboard
├── transport_form_local.html       # Local transport planning
├── international_transport.html    # International transport planning
├── fleet_management.html           # Driver management system
├── add_truck.html                  # Truck registration
├── add_trailer.html               # Trailer registration
├── pod_upload.html                # Proof of delivery upload
├── main_code_final.js             # Telegram bot commands
├── registration_code_fixed.js     # Driver registration logic
├── mock_transport_data.js         # Test data for development
└── sample.txt                     # Project requirements
```

## 🔧 Technical Requirements

### Backend Services
- **Database**: Supabase (PostgreSQL)
- **Automation**: n8n workflows
- **Notifications**: Telegram Bot API

### Database Tables
- `drivers` - Driver information and contact details
- `trucks` - Fleet vehicle specifications
- `trailers` - Trailer specifications and capacities
- `transport_plans` - Route planning data

### API Endpoints
- Local planning: `https://hakro.app.n8n.cloud/webhook/local-transport-plan`
- International planning: `https://hakro.app.n8n.cloud/webhook/international-transport-plan`
- POD upload: `http://localhost:5678/webhook/pod-upload`

## 🛠️ Setup Instructions

### 1. Database Setup (Supabase)
```sql
-- Create drivers table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255),
    telegram_username VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    registered_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create trucks table
CREATE TABLE trucks (
    id SERIAL PRIMARY KEY,
    truck_number VARCHAR(50) UNIQUE NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER,
    license_plate VARCHAR(50),
    vin VARCHAR(17),
    capacity_kg INTEGER,
    fuel_type VARCHAR(50) DEFAULT 'diesel',
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create trailers table
CREATE TABLE trailers (
    id SERIAL PRIMARY KEY,
    trailer_number VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(100) NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    license_plate VARCHAR(50),
    vin VARCHAR(17),
    capacity_kg INTEGER,
    length_m DECIMAL(5,2),
    width_m DECIMAL(5,2),
    height_m DECIMAL(5,2),
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Environment Configuration
Update the Supabase connection details in all HTML files:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Telegram Bot Setup
1. Create a bot via @BotFather
2. Configure webhook URLs in n8n
3. Update bot commands in `main_code_final.js`

### 4. n8n Workflow Configuration
Set up workflows for:
- Local transport plan processing
- International transport plan processing
- Telegram message handling
- POD document processing

## 📱 Telegram Bot Commands

### Admin Commands
- `/adddriver [Name] [Phone] [Email]` - Register new driver
- `/listdrivers` - Show all registered drivers
- `/driverstatus [Phone]` - Check driver status
- `/removedriver [Phone]` - Remove driver from system

### Driver Commands
- Receive automated route plans
- Update delivery status
- Upload POD photos

## 🌍 International Transport Compliance

### EU Regulations Supported
- **Driving Time Limits**: Maximum 13 hours per day
- **Rest Periods**: Minimum 8 hours between shifts
- **Border Documentation**: Customs clearance tracking
- **Route Planning**: Multi-country journey optimization

### Documentation Requirements
- Commercial invoices
- CMR notes (road consignment)
- Export/import licenses
- TiR Carnet for sealed loads
- Customs declarations

## 🚨 Important Notes

### Security
- All API keys should be secured in production
- Database access should be restricted
- Webhook endpoints should be protected

### Performance
- System handles multiple concurrent users
- Database queries are optimized for fleet size
- Real-time updates via Telegram

### Limitations
- International planning requires manual route optimization
- Border crossing times are estimates
- Telegram notifications require internet connectivity

## 📞 Support & Maintenance

### For Technical Issues
1. Check database connection status
2. Verify webhook endpoint accessibility
3. Test Telegram bot functionality
4. Review browser console for JavaScript errors

### For Feature Requests
This system is designed to be modular and extensible. Additional features can be added:
- GPS tracking integration
- Advanced route optimization
- Customer portal access
- Mobile app development

## 📊 Usage Analytics

Track system usage through:
- Database record counts
- Webhook call logs
- Telegram message statistics
- User feedback collection

## 🔄 Version History

- **v1.0** - Basic transport planning
- **v2.0** - Added local vs international separation
- **v2.1** - Enhanced fleet management
- **v2.2** - POD upload system
- **v2.3** - Added mock transport data for testing
- **Current** - Complete dashboard integration with special instructions per stop

---

**🚛 Ready for Production Deployment!**

The system is fully functional and ready for your planning team to use. Both local and international transport planning workflows are operational and integrated with your existing fleet management database.
