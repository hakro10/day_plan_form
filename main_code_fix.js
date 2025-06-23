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

// Parse different commands
if (text.startsWith('/add_driver ')) {
  const parts = text.replace('/add_driver ', '').trim().split(' ');
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
      responseText: '❌ Invalid format. Use: /add_driver [Name] [Phone] [Email]'
    };
  }
} else if (text === '/listdrivers' || text === '/list_drivers') {
  return {
    action: 'list_drivers',
    chat_id: chatId,
    responseText: 'Fetching drivers list...'
  };
} else if (text.startsWith('/driver_status') || text.startsWith('/driverstatus') || text.startsWith('/check_driver')) {
  // Handle all variations: /driver_status +123, /driverstatus+123, /driver_status+123
  let phone = '';
  
  if (text.includes(' ')) {
    // Format: /driver_status +1234567890
    phone = text.split(' ')[1];
  } else {
    // Format: /driverstatus+1234567890 or /driver_status+1234567890
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
      responseText: '❌ Please provide phone number. Use: /driver_status [Phone]'
    };
  }
} else if (text.startsWith('/remove_driver ')) {
  const phone = text.split(' ')[1];
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
      responseText: '❌ Please provide phone number. Use: /remove_driver [Phone]'
    };
  }
} else if (text === '/help') {
  return {
    action: 'simple_response',
    chat_id: chatId,
    responseText: `🚛 *ADMIN TRANSPORT BOT* 🚛

*Available Commands:*
/add_driver [Name] [Phone] [Email] - Register new driver
/list_drivers - Show all registered drivers  
/driver_status [Phone] - Check driver status
/remove_driver [Phone] - Remove driver
/help - Show this menu

*Example:*
/add_driver John Smith +1234567890 john@email.com
/driver_status +1234567890`
  };
} else {
  return {
    action: 'simple_response',
    chat_id: chatId,
    responseText: `❌ Unknown command: ${text}\n\nUse /help to see available commands.`
  };
} 