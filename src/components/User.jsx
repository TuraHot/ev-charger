import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const User = () => {
  // Mock Data: User + รถของเขา (จำลอง Join Table User + EV_Vehicle)
  const [users, setUsers] = useState([
    { 
      userId: 1, 
      userName: "John Doe", 
      userEmail: "john@example.com", 
      userPhoneNO: "081-111-1111", 
      vehicles: [
        { vehicleId: 101, licensePlate: "1กข-9999", model: "Tesla Model 3", chargerType: "CCS2", batteryCapacity: "75kWh" }
      ]
    },
    { 
      userId: 2, 
      userName: "Jane Smith", 
      userEmail: "jane@example.com", 
      userPhoneNO: "089-999-9999", 
      vehicles: [
        { vehicleId: 102, licensePlate: "2กค-8888", model: "BYD Atto 3", chargerType: "CCS2", batteryCapacity: "60kWh" },
        { vehicleId: 103, licensePlate: "3งง-7777", model: "ORA Good Cat", chargerType: "CCS2", batteryCapacity: "48kWh" }
      ]
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // ฟังก์ชันกดดูรายละเอียดรถ
  const handleViewVehicles = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">User Management</h2>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">All Registered Users</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicles</th> {/* คอลัมน์นับจำนวนรถ */}
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId}>
                  <td className="ps-4 text-muted">#{u.userId}</td>
                  <td className="fw-bold">{u.userName}</td>
                  <td>{u.userEmail}</td>
                  <td>{u.userPhoneNO}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {u.vehicles.length} Car(s)
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    {/* ปุ่มดูรถ (View Vehicles) */}
                    <button 
                        className="btn btn-sm btn-outline-primary me-2" 
                        onClick={() => handleViewVehicles(u)}
                        title="View Vehicles"
                    >
                      <i className="bi bi-car-front-fill me-1"></i> View Cars
                    </button>
                    {/* ปุ่มลบ User */}
                    <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-person-x-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modal แสดงรายการรถของ User คนนั้น (Drill down) --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Vehicle List : <span className="text-primary">{selectedUser?.userName}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && selectedUser.vehicles.length > 0 ? (
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Model</th>
                            <th>License Plate</th>
                            <th>Charger Type</th>
                            <th>Battery</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedUser.vehicles.map((car) => (
                            <tr key={car.vehicleId}>
                                <td>{car.model}</td>
                                <td className="fw-bold">{car.licensePlate}</td>
                                <td><span className="badge bg-secondary">{car.chargerType}</span></td>
                                <td>{car.batteryCapacity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          ) : (
            <p className="text-center text-muted my-3">No vehicles registered.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default User;