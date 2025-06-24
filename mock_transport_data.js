// Mock data that matches the current transport plan form exactly
// This file is loaded directly by the HTML page
const mockTransportData = {
  // Route Information
  routeDate: "2025-06-23",
  routeType: "mixed_route",
  startTime: "06:00",
  expectedEndTime: "18:00",
  
  // Vehicle & Driver Assignment
  driverName: "auris",
  driverPhone: "0838352129",
  truckDetails: "231LH1460 - Volvo - 370KGXP",
  trailerDetails: "Articulated Truck - 300000KG - A3F2E",
  
  // Collection Points (5 stops)
  collectionAddress: [
    "NB Warehouse, Drogheda",
    "K&N Distribution Center, Swords", 
    "GXO Logistics, Swords",
    "Kepak Cork Processing Plant",
    "Kingsgate Portlaoise Distribution"
  ],
  collectionTimeFrom: ["07:00", "08:30", "10:30", "16:00", "18:00"],
  collectionTimeTo: ["07:30", "10:00", "11:00", "16:30", "18:30"],
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
    "Collect crates for Kepak Cork",
    "Collect pallets for Tesco",
    "Collect pallets for Tesco"
  ],
  
  // Delivery Points (2 stops)
  deliveryAddress: [
    "Kepak Cork",
    "NB Return Depot Dispatch Bay"
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
    "Drop trailer at dispatch bay"
  ],
  
  // Additional Instructions
  routeInstructions: "Avoid N7 construction zone. Use M50 route. Mandatory 45min break after Portlaoise collection.",
  fuelStops: "if_needed",
  returnToDepot: "same_day"
};

// Make available globally for HTML pages
if (typeof window !== 'undefined') {
  window.mockTransportData = mockTransportData;
}

// Export for testing (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = mockTransportData;
} 