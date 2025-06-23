# Vehicle Admin Commands for n8n Bot

## Step 1: Run SQL in Supabase

First, execute the `create_vehicle_tables.sql` file in your Supabase SQL Editor to create the trucks and trailers tables with sample data.

## Step 2: Add New Commands to Admin Bot

Add these commands to your existing n8n admin bot Code node:

### New Vehicle Commands:

**Trucks:**
- `/add_truck [Number] [Make] [Model] [Year] [License] [Capacity]` - Add new truck
- `/list_trucks` - Show all trucks
- `/truck_status [TruckNumber]` - Check truck details
- `/remove_truck [TruckNumber]` - Deactivate truck

**Trailers:**
- `/add_trailer [Number] [Type] [Make] [Model] [Year] [License] [Capacity]` - Add new trailer
- `/list_trailers` - Show all trailers
- `/trailer_status [TrailerNumber]` - Check trailer details
- `/remove_trailer [TrailerNumber]` - Deactivate trailer

### Updated Help Command:
```javascript
if (text === '/help') {
  return {
    action: 'simple_response',
    chat_id: chatId,
    responseText: `🚛 *ADMIN TRANSPORT BOT* 🚛

*Driver Commands:*
/add_driver [Name] [Phone] [Email] - Register new driver
/list_drivers - Show all registered drivers  
/driver_status [Phone] - Check driver status
/remove_driver [Phone] - Remove driver

*Truck Commands:*
/add_truck [Number] [Make] [Model] [Year] [License] [Capacity] - Add new truck
/list_trucks - Show all trucks
/truck_status [TruckNumber] - Check truck details
/remove_truck [TruckNumber] - Deactivate truck

*Trailer Commands:*
/add_trailer [Number] [Type] [Make] [Model] [Year] [License] [Capacity] - Add new trailer
/list_trailers - Show all trailers
/trailer_status [TrailerNumber] - Check trailer details
/remove_trailer [TrailerNumber] - Deactivate trailer

*General:*
/help - Show this menu

*Examples:*
/add_driver John Smith +1234567890 john@email.com
/add_truck TRK005 Volvo FH16 2022 ABC789 26000
/add_trailer TRL006 box Krone ProfiLiner 2021 TRL999 33000`
  };
}
```

### Code Logic for Vehicle Commands:

Add these conditions to your main command parsing:

```javascript
// Truck Commands
else if (text.startsWith('/add_truck ')) {
  const parts = text.replace('/add_truck ', '').trim().split(' ');
  if (parts.length >= 6) {
    const [number, make, model, year, license, capacity] = parts;
    return {
      action: 'add_truck',
      chat_id: chatId,
      truckData: { number, make, model, year, license, capacity },
      responseText: `Processing truck registration for ${number}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Invalid format. Use: /add_truck [Number] [Make] [Model] [Year] [License] [Capacity]'
    };
  }
}
else if (text === '/list_trucks' || text === '/listtrucks') {
  return {
    action: 'list_trucks',
    chat_id: chatId,
    responseText: 'Fetching trucks list...'
  };
}
else if (text.startsWith('/truck_status ') || text.startsWith('/truckstatus ')) {
  const truckNumber = text.split(' ')[1];
  if (truckNumber) {
    return {
      action: 'check_truck',
      chat_id: chatId,
      truckNumber: truckNumber,
      responseText: `Checking status for truck ${truckNumber}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Please provide truck number. Use: /truck_status [TruckNumber]'
    };
  }
}
else if (text.startsWith('/remove_truck ') || text.startsWith('/removetruck ')) {
  const truckNumber = text.split(' ')[1];
  if (truckNumber) {
    return {
      action: 'remove_truck',
      chat_id: chatId,
      truckNumber: truckNumber,
      responseText: `Deactivating truck ${truckNumber}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Please provide truck number. Use: /remove_truck [TruckNumber]'
    };
  }
}

// Trailer Commands
else if (text.startsWith('/add_trailer ')) {
  const parts = text.replace('/add_trailer ', '').trim().split(' ');
  if (parts.length >= 7) {
    const [number, type, make, model, year, license, capacity] = parts;
    return {
      action: 'add_trailer',
      chat_id: chatId,
      trailerData: { number, type, make, model, year, license, capacity },
      responseText: `Processing trailer registration for ${number}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Invalid format. Use: /add_trailer [Number] [Type] [Make] [Model] [Year] [License] [Capacity]'
    };
  }
}
else if (text === '/list_trailers' || text === '/listtrailers') {
  return {
    action: 'list_trailers',
    chat_id: chatId,
    responseText: 'Fetching trailers list...'
  };
}
else if (text.startsWith('/trailer_status ') || text.startsWith('/trailerstatus ')) {
  const trailerNumber = text.split(' ')[1];
  if (trailerNumber) {
    return {
      action: 'check_trailer',
      chat_id: chatId,
      trailerNumber: trailerNumber,
      responseText: `Checking status for trailer ${trailerNumber}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Please provide trailer number. Use: /trailer_status [TrailerNumber]'
    };
  }
}
else if (text.startsWith('/remove_trailer ') || text.startsWith('/removetrailer ')) {
  const trailerNumber = text.split(' ')[1];
  if (trailerNumber) {
    return {
      action: 'remove_trailer',
      chat_id: chatId,
      trailerNumber: trailerNumber,
      responseText: `Deactivating trailer ${trailerNumber}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Please provide trailer number. Use: /remove_trailer [TrailerNumber]'
    };
  }
}
```

## Step 3: Add HTTP Request Nodes

You'll need to add new HTTP Request nodes in your n8n workflow for:

1. **Add Truck** - POST to `/rest/v1/trucks`
2. **List Trucks** - GET from `/rest/v1/trucks?select=*&is_active=eq.true`
3. **Check Truck** - GET from `/rest/v1/trucks?select=*&truck_number=eq.{truckNumber}`
4. **Remove Truck** - PATCH to `/rest/v1/trucks?truck_number=eq.{truckNumber}` (set is_active=false)

5. **Add Trailer** - POST to `/rest/v1/trailers`
6. **List Trailers** - GET from `/rest/v1/trailers?select=*&is_active=eq.true`
7. **Check Trailer** - GET from `/rest/v1/trailers?select=*&trailer_number=eq.{trailerNumber}`
8. **Remove Trailer** - PATCH to `/rest/v1/trailers?trailer_number=eq.{trailerNumber}` (set is_active=false)

## Step 4: Add Response Code Nodes

Create response formatting code nodes for each vehicle operation, similar to your existing driver response nodes.

## Step 5: Update IF/Switch Nodes

Update your routing logic to handle the new vehicle actions in your IF and Switch nodes.

Your complete transport management system will then support:
- ✅ Driver management (existing)
- ✅ Truck management (new)
- ✅ Trailer management (new)
- ✅ Transport form with all dropdowns
- ✅ GitHub Pages hosting 