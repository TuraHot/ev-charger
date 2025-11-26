export const dashboardStats = [
  { title: "รายได้ทั้งหมด", value: "฿ 4,500", icon: "bi-currency-bitcoin", color: "primary" },
  { title: "จุดชาร์จที่ใช้งานอยู่", value: "8", icon: "bi-ev-station-fill", color: "success" },
  { title: "Total Energy", value: "350 kWh", icon: "bi-lightning-charge-fill", color: "warning" },
  { title: "New Users", value: "12", icon: "bi-people-fill", color: "info" },
];

export const recentTransactions = [
  { id: 1, station: "สถานี A1", user: "John Doe", time: "10:30 AM", paymentMethod: "บัตรเครดิต", amount: "฿120", status: "เสร็จสิ้น" },
  { id: 2, station: "สถานี B2", user: "Jane Smith", time: "11:15 AM", paymentMethod: "QR Code", amount: "฿200", status: "กำลังชาร์จ" },
  { id: 3, station: "สถานี A2", user: "Robert B.", time: "11:45 AM", paymentMethod: "บัตรเครดิต", amount: "฿85", status: "เสร็จสิ้น" },
  { id: 4, station: "สถานี C1", user: "Alice W.", time: "12:00 PM", paymentMethod: "-", amount: "-", status: "กำลังรอ" },
];

export const initialUsers = [
  { 
    userId: 1, 
    userName: "JohnDoe",
    firstname: "John", 
    lastname: "Doe", 
    userEmail: "john@example.com", 
    userPhoneNO: "081-111-1111", 
    vehicles: [
      { vehicleId: 101, licensePlate: "1กข-9999", model: "Tesla Model 3", chargerType: "CCS2", batteryCapacity: "75kWh" }
    ]
  },
  { 
    userId: 2, 
    userName: "JaneSmith", 
    firstname: "Jane", 
    lastname: "Smith", 
    userEmail: "jane@example.com", 
    userPhoneNO: "089-999-9999", 
    vehicles: [
      { vehicleId: 102, licensePlate: "2กค-8888", model: "BYD Atto 3", chargerType: "CCS2", batteryCapacity: "60kWh" },
      { vehicleId: 103, licensePlate: "3งง-7777", model: "ORA Good Cat", chargerType: "CCS2", batteryCapacity: "48kWh" }
    ]
  },
];

export const initialStations = [
  { 
    stationId: 1, 
    stationName: "สถานี A1", 
    stationAddress: "99/1 ถนนพระราม 9, กรุงเทพฯ", 
    latitude: "13.7563", 
    longitude: "100.5018", 
    openTime: "08:00", 
    closeTime: "22:00",
    points: [
      { pointId: 101, connectorType: "DC CCS2", powerRating: "50kW", status: "พร้อมใช้งาน", price: 7.5 },
      { pointId: 102, connectorType: "AC Type 2", powerRating: "22kW", status: "กำลังใช้งาน", price: 5.5 }
    ]
  },
  { 
    stationId: 2, 
    stationName: "สถานี B2", 
    stationAddress: "ที่จอดรถ Central World ชั้น 3, กรุงเทพฯ", 
    latitude: "13.7469", 
    longitude: "100.5393", 
    openTime: "24 ชั่วโมง", 
    closeTime: "",
    points: [
      { pointId: 201, connectorType: "DC CCS2", powerRating: "120kW", status: "ปิดการใช้งาน", price: 9.0 }
    ]
  },
];