import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { initialUsers } from "../data/mockData";

const User = () => {
  const [users, setUsers] = useState(initialUsers);
  
  // State สำหรับ Modal ดูรถ (View Vehicles)
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // State สำหรับ Modal จัดการ User (Add/Edit)
  const [showUserModal, setShowUserModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userId: null, userName: "", userEmail: "", userPhoneNO: "", vehicles: []
  });

  // --- Functions: View Vehicles ---
  const handleViewVehicles = (user) => {
    setSelectedUser(user);
    setShowVehicleModal(true);
  };

  // --- Functions: User CRUD ---

  // 1. เปิดหน้าเพิ่ม User ใหม่
  const handleShowAdd = () => {
    setIsEditing(false);
    setCurrentUser({ userId: null, userName: "", userEmail: "", userPhoneNO: "", vehicles: [] });
    setShowUserModal(true);
  };

  // 2. เปิดหน้าแก้ไข User
  const handleShowEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user); // โหลดข้อมูลเดิมมาใส่ฟอร์ม
    setShowUserModal(true);
  };

  // 3. บันทึกข้อมูล (Save)
  const handleSaveUser = () => {
    if (isEditing) {
      // Logic แก้ไข: หา ID แล้วทับข้อมูลใหม่
      setUsers(users.map(u => u.userId === currentUser.userId ? currentUser : u));
    } else {
      // Logic เพิ่มใหม่: Gen ID ใหม่ต่อท้าย
      const newId = users.length > 0 ? Math.max(...users.map(u => u.userId)) + 1 : 1;
      setUsers([...users, { ...currentUser, userId: newId }]);
    }
    setShowUserModal(false);
  };

  // 4. ลบ User (Delete)
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.userId !== id));
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">จัดการผู้ใช้</h2>
        <button className="btn btn-primary" onClick={handleShowAdd}>
          <i className="bi bi-person-plus-fill me-2"></i>เพิ่มผู้ใช้ใหม่
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">ผู้ใช้ทั้งหมด</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>ชื่อผู้ใช้</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>อีเมล</th>
                <th>เบอร์โทรศัพท์</th>
                <th>ยานพาหนะ</th>
                <th className="text-end pe-4"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId}>
                  <td className="ps-4 text-muted">#{u.userId}</td>
                  <td className="fw-bold">{u.userName}</td>
                  <td>{u.firstname}</td>
                  <td>{u.lastname}</td>
                  <td>{u.userEmail}</td>
                  <td>{u.userPhoneNO}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {u.vehicles ? u.vehicles.length : 0} Car(s)
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <button 
                        className="btn btn-sm btn-outline-info me-2" 
                        onClick={() => handleViewVehicles(u)}
                        title="View Vehicles"
                    >
                      <i className="bi bi-car-front-fill"></i>
                    </button>
                    <button 
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleShowEdit(u)}
                        title="Edit User"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteUser(u.userId)}
                        title="Delete User"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modal 1: User Form (Add/Edit) --- */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ex. JohnDoe"
                value={currentUser.userName}
                onChange={(e) => setCurrentUser({...currentUser, userName: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>อีเมล</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="name@example.com"
                value={currentUser.userEmail}
                onChange={(e) => setCurrentUser({...currentUser, userEmail: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>เบอร์โทรศัพท์</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="08X-XXX-XXXX"
                value={currentUser.userPhoneNO}
                onChange={(e) => setCurrentUser({...currentUser, userPhoneNO: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>ยกเลิก</Button>
          <Button variant="primary" onClick={handleSaveUser}>
            {isEditing ? "แก้ไขผู้ใช้" : "บันทึกผู้ใช้"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showVehicleModal} onHide={() => setShowVehicleModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Vehicle List : <span className="text-primary">{selectedUser?.userName}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && selectedUser.vehicles && selectedUser.vehicles.length > 0 ? (
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>รุ่น</th>
                            <th>ป้านทะเบียนรถ</th>
                            <th>ประเภทหัวชาร์จ</th>
                            <th>ขนาดแบตเตอรี่</th>
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
            <p className="text-center text-muted my-3">ไม่พบยานพาหนะ</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVehicleModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default User;