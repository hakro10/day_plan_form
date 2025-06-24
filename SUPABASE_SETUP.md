# 🗄️ Supabase Database Setup Guide

## Database Integration Complete! ✅

Your transport planning system now has full Supabase database integration with:
- **Real-time dropdown population** from database tables
- **Flexible schema mapping** to handle different database structures
- **Fallback functionality** when database is unavailable
- **Consistent error handling** across all forms

---

## 📋 Required Database Tables

### 1. **drivers** table
```sql
CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  license_type TEXT DEFAULT 'C',
  status TEXT DEFAULT 'active', -- 'active', 'busy', 'off-duty'
  assigned_vehicle TEXT,
  hours_today INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Alternative field names supported:**
- `driver_name` or `full_name` instead of `name`
- `phone_number` or `contact` instead of `phone`
- `license_class` instead of `license_type`

### 2. **trucks** table
```sql
CREATE TABLE trucks (
  id SERIAL PRIMARY KEY,
  registration TEXT NOT NULL, -- Main identifier (231LH1460)
  make TEXT, -- Volvo, Scania, DAF, etc.
  model TEXT, -- FH16, R450, etc.
  year INTEGER,
  type TEXT, -- 'Articulated', 'Rigid', 'Van'
  capacity INTEGER, -- Weight capacity in kg
  status TEXT DEFAULT 'available', -- 'available', 'busy', 'maintenance'
  location TEXT DEFAULT 'Depot',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Alternative field names supported:**
- `truck_number` or `reg_number` instead of `registration`
- `truck_type` instead of `type`
- `capacity_kg` or `max_weight` instead of `capacity`
- `manufacture_year` instead of `year`

### 3. **trailers** table
```sql
CREATE TABLE trailers (
  id SERIAL PRIMARY KEY,
  registration TEXT NOT NULL, -- Main identifier  
  type TEXT, -- 'Semi-trailer', 'Box trailer', 'Flatbed'
  make TEXT, -- Schmitz, Krone, etc.
  model TEXT,
  capacity INTEGER, -- Weight capacity in kg
  status TEXT DEFAULT 'available', -- 'available', 'busy', 'maintenance'
  location TEXT DEFAULT 'Depot',
  attached_truck TEXT, -- Which truck it's attached to
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Alternative field names supported:**
- `trailer_number` or `reg_number` instead of `registration`
- `trailer_type` instead of `type`
- `capacity_kg` or `max_weight` instead of `capacity`

### 4. **transport_plans** table (Optional - for storing submitted plans)
```sql
CREATE TABLE transport_plans (
  id SERIAL PRIMARY KEY,
  plan_type TEXT, -- 'local' or 'international'
  driver_id INTEGER REFERENCES drivers(id),
  truck_id INTEGER REFERENCES trucks(id),
  trailer_id INTEGER REFERENCES trailers(id),
  route_data JSONB, -- All route/cargo information
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔧 Configuration Steps

### Step 1: Update Your Supabase Credentials
Replace the placeholder values in all files with your actual Supabase project details:

```javascript
// In transport_form_local.html, international_transport.html, fleet_management.html
const SUPABASE_URL = 'https://your-project-ref.supabase.co';
const SUPABASE_KEY = 'your-anon-key-here';
```

**Find your credentials at:** https://supabase.com/dashboard → Your Project → Settings → API

### Step 2: Create the Database Tables
Run the SQL commands above in your Supabase SQL editor to create the required tables.

### Step 3: Insert Sample Data
```sql
-- Sample drivers
INSERT INTO drivers (name, phone, license_type, status) VALUES
('auris', '0838352129', 'C+E', 'active'),
('John Smith', '087-1234567', 'C', 'active'),
('Mary O''Connor', '086-9876543', 'C+E', 'active');

-- Sample trucks  
INSERT INTO trucks (registration, make, model, year, type, capacity, status) VALUES
('231LH1460', 'Volvo', 'FH16', 2019, 'Articulated', 44000, 'available'),
('151D4521', 'Scania', 'R450', 2020, 'Rigid', 32000, 'available'),
('182MN3467', 'DAF', 'CF85', 2018, 'Van', 18000, 'maintenance');

-- Sample trailers
INSERT INTO trailers (registration, type, make, capacity, status) VALUES
('A3F2E', 'Semi-trailer', 'Schmitz', 38000, 'available'),
('KT798', 'Box trailer', 'Krone', 30000, 'available'),
('WX445', 'Flatbed', 'Kögel', 32000, 'maintenance');
```

---

## 🌟 New Features Added

### ✅ **Smart Dropdown Population**
- Dropdowns now load real data from your Supabase tables
- Automatic field mapping handles different database schemas  
- Driver license types, truck specs, trailer capacities all loaded dynamically

### ✅ **Robust Error Handling**
- If Supabase is unavailable, forms fall back to mock data
- Clear error messages help identify connection issues
- Console logging tracks all database operations

### ✅ **Real Fleet Management**
- Fleet management page now shows live data from database
- Status tracking (available/busy/maintenance) for all vehicles
- Driver assignment and hours tracking

### ✅ **Flexible Schema Support**
The system supports multiple field naming conventions:
- `name` or `driver_name` or `full_name` for driver names
- `registration` or `truck_number` or `reg_number` for vehicle IDs
- `phone` or `phone_number` or `contact` for contact info
- And many more combinations!

---

## 🔄 How It Works

1. **Page Load:** Forms attempt to connect to Supabase and load fleet data
2. **Data Loading:** Queries run in parallel for optimal performance  
3. **Dropdown Population:** Vehicle and driver options populated from live database
4. **Form Submission:** Data validated and sent to both n8n webhook AND database
5. **Error Handling:** If Supabase fails, fallback mock data ensures forms still work

---

## 📊 Database Status Tracking

The system tracks these status values:

**Drivers:**
- `active` - Available for assignment
- `busy` - Currently on route  
- `off-duty` - Not available

**Trucks & Trailers:**
- `available` - Ready for assignment
- `busy` - Currently in use
- `maintenance` - Under repair/service

---

## 🚀 Next Steps

1. **Set up your Supabase project** and create the tables
2. **Update the credentials** in all HTML files
3. **Add your fleet data** to the database
4. **Test the forms** - dropdowns should populate with real data
5. **Monitor the console** for database connection logs

Your transport planning system is now powered by a real database! 🎉 