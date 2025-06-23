// Get webhook data
const input_data = $input.first().json.body || $input.first().json;
const message = input_data.message;

if (!message) {
  return { 
    action: 'simple_response',
    chat_id: input_data.callback_query?.from?.id || "unknown",
    responseText: "No message received"
  };
}

const chatId = message.chat.id;
const text = message.text;
const username = message.from.username || message.from.first_name || "Unknown";

// Parse different commands - handle both formats for all commands
if (text.startsWith('/add_driver ') || text.startsWith('/adddriver ')) {
  const commandText = text.replace(/^\/(?:add_driver|adddriver)\s+/, '').trim();
  const parts = commandText.split(' ');
  
  if (parts.length >= 3) {
    const name = parts[0];
    const phone = parts.slice(1, -1).join(' '); // Handle names with spaces
    const email = parts[parts.length - 1];
    
    return {
      action: 'add_driver',
      chat_id: chatId,
      driverData: { name, phone, email },
      responseText: `Processing registration for ${name}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Invalid format. Use: /adddriver [Name] [Phone] [Email]'
    };
  }
} else if (text === '/listdrivers' || text === '/list_drivers') {
  return {
    action: 'list_drivers',
    chat_id: chatId,
    responseText: 'Fetching drivers list...'
  };
} else if (text.startsWith('/driver_status') || text.startsWith('/driverstatus') || text.startsWith('/check_driver')) {
  // Handle all variations: /driverstatus +123, /driver_status +123, etc.
  let phone = '';
  
  if (text.includes(' ')) {
    // Format: /driverstatus +1234567890
    phone = text.split(' ')[1];
  } else {
    // Format: /driverstatus+1234567890
    const phoneMatch = text.match(/(?:driver_status|driverstatus|check_driver)(.+)/);
    if (phoneMatch) {
      phone = phoneMatch[1].trim();
    }
  }
  
  if (phone) {
    return {
      action: 'check_driver',
      chat_id: chatId,
      phone: phone,
      responseText: `Checking status for ${phone}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Please provide phone number. Use: /driverstatus [Phone]'
    };
  }
} else if (text.startsWith('/remove_driver ') || text.startsWith('/removedriver ')) {
  const phone = text.replace(/^\/(?:remove_driver|removedriver)\s+/, '').trim();
  
  if (phone) {
    return {
      action: 'remove_driver',
      chat_id: chatId,
      phone: phone,
      responseText: `Removing driver ${phone}...`
    };
  } else {
    return {
      action: 'simple_response',
      chat_id: chatId,
      responseText: '❌ Please provide phone number. Use: /removedriver [Phone]'
    };
  }
} else if (text === '/help') {
  return {
    action: 'simple_response',
    chat_id: chatId,
    responseText: `🚛 *ADMIN TRANSPORT BOT* 🚛

*Available Commands:*
/adddriver [Name] [Phone] [Email] - Register new driver
/listdrivers - Show all registered drivers  
/driverstatus [Phone] - Check driver status
/removedriver [Phone] - Remove driver
/help - Show this menu

*Example:*
/adddriver John Smith +1234567890 john@email.com
/driverstatus +1234567890`
  };
} else {
  return {
    action: 'simple_response',
    chat_id: chatId,
    responseText: `❌ Unknown command: ${text}\n\nUse /help to see available commands.`
  };
} 