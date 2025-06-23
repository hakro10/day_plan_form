// Get webhook data
const update = input.body || input;
const message = update.message;

if (!message) {
  return [{ 
    json: { 
      text: "No message received",
      chat_id: update.callback_query?.from?.id || "unknown"
    } 
  }];
}

const chatId = message.chat.id;
const text = message.text;
const username = message.from.username || message.from.first_name || "Unknown";

// Initialize storage with multiple fallback methods
let drivers = [];
let storage = {};

try {
  // Try different n8n Cloud storage methods
  if (typeof this.getWorkflowStaticData === 'function') {
    storage = this.getWorkflowStaticData('global') || {};
  } else if (typeof $getWorkflowStaticData === 'function') {
    storage = $getWorkflowStaticData('global') || {};
  } else if (this.helpers && this.helpers.getWorkflowStaticData) {
    storage = this.helpers.getWorkflowStaticData('global') || {};
  } else {
    // Use global object as fallback
    if (!globalThis.n8nDriverStorage) {
      globalThis.n8nDriverStorage = {};
    }
    storage = globalThis.n8nDriverStorage;
  }
  
  drivers = storage.drivers || [];
} catch (error) {
  console.log("Storage access error:", error.message);
  // Initialize empty if all methods fail
  drivers = [];
}

// Helper function to save data
function saveDrivers(driversData) {
  try {
    if (typeof this.getWorkflowStaticData === 'function') {
      const staticData = this.getWorkflowStaticData('global');
      staticData.drivers = driversData;
    } else if (typeof $getWorkflowStaticData === 'function') {
      const staticData = $getWorkflowStaticData('global');
      staticData.drivers = driversData;
    } else if (this.helpers && this.helpers.getWorkflowStaticData) {
      const staticData = this.helpers.getWorkflowStaticData('global');
      staticData.drivers = driversData;
    } else {
      // Fallback to global
      if (!globalThis.n8nDriverStorage) {
        globalThis.n8nDriverStorage = {};
      }
      globalThis.n8nDriverStorage.drivers = driversData;
    }
    return true;
  } catch (error) {
    console.log("Save error:", error.message);
    return false;
  }
}

// Process commands
if (text.startsWith('/register')) {
  const parts = text.split(' ');
  if (parts.length < 4) {
    return [{ 
      json: { 
        text: "❌ Invalid format. Use: /register [Name] [Phone] [Email]",
        chat_id: chatId 
      } 
    }];
  }
  
  const [, name, phone, email] = parts;
  
  // Check if already registered
  const existingDriver = drivers.find(d => d.chatId === chatId);
  if (existingDriver) {
    return [{ 
      json: { 
        text: `⚠️ You are already registered as ${existingDriver.name}`,
        chat_id: chatId 
      } 
    }];
  }
  
  // Add new driver
  const newDriver = {
    chatId: chatId,
    name: name,
    phone: phone,
    email: email,
    username: username,
    registeredAt: new Date().toISOString()
  };
  
  drivers.push(newDriver);
  const saved = saveDrivers.call(this, drivers);
  
  return [{ 
    json: { 
      text: `✅ Registration successful!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nYou will now receive transport plans assigned to you.\n\nSave status: ${saved ? 'Success' : 'Failed'}`,
      chat_id: chatId 
    } 
  }];
}

if (text === '/status') {
  const driver = drivers.find(d => d.chatId === chatId);
  
  if (!driver) {
    return [{ 
      json: { 
        text: "❌ You are not registered.\n\nUse /register [Name] [Phone] [Email] to sign up as a driver.",
        chat_id: chatId 
      } 
    }];
  }
  
  return [{ 
    json: { 
      text: `✅ Registration Status:\n\nName: ${driver.name}\nPhone: ${driver.phone}\nEmail: ${driver.email}\nRegistered: ${new Date(driver.registeredAt).toLocaleString()}\n\nYou are registered and will receive transport plans.`,
      chat_id: chatId 
    } 
  }];
}

if (text === '/help') {
  return [{ 
    json: { 
      text: `🚚 Transport Driver Registration\n\nAvailable commands:\n\n/register [Name] [Phone] [Email] - Register as a driver\n/status - Check your registration status\n/help - Show this help message\n/debug - Show system information\n\nExample:\n/register John 0123456789 john@email.com`,
      chat_id: chatId 
    } 
  }];
}

if (text === '/debug') {
  let storageMethod = "Unknown";
  let storageError = "None";
  
  try {
    if (typeof this.getWorkflowStaticData === 'function') {
      storageMethod = "this.getWorkflowStaticData";
    } else if (typeof $getWorkflowStaticData === 'function') {
      storageMethod = "$getWorkflowStaticData";
    } else if (this.helpers && this.helpers.getWorkflowStaticData) {
      storageMethod = "this.helpers.getWorkflowStaticData";
    } else {
      storageMethod = "globalThis fallback";
    }
  } catch (error) {
    storageError = error.message;
  }
  
  return [{ 
    json: { 
      text: `🔧 Debug Info:\n\n📊 Total drivers: ${drivers.length}\n🗂️ Driver list: ${drivers.map(d => d.name).join(', ') || 'None'}\n💾 Storage method: ${storageMethod}\n❌ Storage error: ${storageError}\n👤 Your Chat ID: ${chatId}\n📝 Stored Chat IDs: ${drivers.map(d => d.chatId).join(', ') || 'None'}`,
      chat_id: chatId 
    } 
  }];
}

// Unknown command
return [{ 
  json: { 
    text: `❓ Unknown command: ${text}\n\nUse /help to see available commands.`,
    chat_id: chatId 
  } 
}]; 