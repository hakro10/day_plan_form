// Mock data that matches the current transport plan form exactly
const mockTransportData = {
  // Route Information
  routeDate: "2025-06-23",
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
    "NB Warehouse, Industrial Estate, Dublin",
    "K&N Distribution Center, Cork Road", 
    "GXO Logistics, Portlaoise",
    "Kepak Cork Processing Plant",
    "Kingsgate Portlaoise Distribution"
  ],
  collectionTimeFrom: ["07:00", "08:30", "11:00", "13:00", "15:00"],
  collectionTimeTo: ["07:30", "10:00", "12:00", "14:00", "16:00"],
  collectionPriority: ["medium", "medium", "medium", "medium", "medium"],
  collectionSpecialInstructions: [
    "Take empty trailer",
    "Collect empty crates for Kepak, Cork", 
    "Live Tracking for Kepak Cork",
    "Collect mixed golds",
    "Collect mixed goods for final delivery"
  ],
  
  // Delivery Points (2 stops)
  deliveryAddress: [
    "Kepak Cork Retail Store",
    "NB Return Depot, Dispatch Bay"
  ],
  deliveryTimeFrom: ["14:00", "20:00"],
  deliveryTimeTo: ["15:00", "20:30"],
  deliveryPriority: ["high", "medium"],
  deliverySpecialInstructions: [
    "Unload 6 CRATES",
    "Drop trailer at dispatch bay, return unladen"
  ],
  
  // Additional Instructions
  routeInstructions: "Avoid N7 construction zone. Use M50 route. Mandatory 45min break after Portlaoise collection.",
  fuelStops: "if_needed",
  returnToDepot: "same_day"
};

// Export for testing
module.exports = mockTransportData; 