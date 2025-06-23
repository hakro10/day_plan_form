// Mock data that matches the current transport plan form exactly
const mockTransportData = {
  // Route Information
  routeDate: "2025-02-23",
  routeType: "mixed_route",
  startTime: "06:00",
  expectedEndTime: "18:00",
  
  // Vehicle & Driver Assignment
  driverName: "auris",
  driverPhone: "0838352129",
  truckDetails: "231LH1460", // ✅ Exact database format
  trailerDetails: "KT 798",   // ✅ Exact database format
  
  // Collection Points (5 stops)
  collectionAddress: [
    "NB Warehouse, Citywest",
    "K&N Distribution Center, Swords", 
    "GXO Logistics, Swords",
    "Kepak Cork Processing Plant",
    "Kingsgate Portlaoise Distribution"
  ],
  collectionTimeFrom: ["07:00", "08:30", "11:00", "13:00", "15:00"],
  collectionTimeTo: ["07:30", "10:00", "12:00", "14:00", "16:00"],
  collectionPriority: ["medium", "medium", "medium", "medium", "medium"],
  collectionContact: [
    "John Byrne - 087-1234567",
    "Mary O'Connor - 086-9876543",
    "Pat Murphy - 085-5555555",
    "Tom Kelly - 087-7777777",
    "Joe Ryan - 086-3333333"
  ],
  collectionDuration: [30, 60, 45, 30, 45],
  collectionSpecialInstructions: [
    "Take empty trailer",
    "Collect empty crates for Kepak, Cork", 
    "Live Tracking for Kepak Cork",
    "Collect mixed golds",
    "Collect mixed goods for final delivery"
  ],
  
  // Delivery Points (2 stops)
  deliveryAddress: [
    "Kepak Cork",
    "NB Return Depot, Dispatch Bay"
  ],
  deliveryTimeFrom: ["14:00", "20:00"],
  deliveryTimeTo: ["15:00", "20:30"],
  deliveryPriority: ["high", "medium"],
  deliveryContact: [
    "Mike O'Brien - 021-4444444",
    "Night Supervisor - 087-9999999"
  ],
  deliveryDuration: [30, 20],
  deliverySpecialInstructions: [
    "UNLOAD CRATES",
    "Drop trailer at dispatch bay, return unladen"
  ],
  
  // Additional Instructions
  routeInstructions: "Avoid N7 construction zone. Use M50 route. Mandatory 45min break after Portlaoise collection.",
  fuelStops: "if_needed",
  returnToDepot: "same_day"
};

// Export for testing
module.exports = mockTransportData; 