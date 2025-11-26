import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Station = () => {
  // 1. Mock Data: ปรับให้ตรงกับ ER Diagram (Charging_Station)
  const [stations, setStations] = useState([
    { 
      stationId: 1, 
      stationName: "Station A1", 
      stationAddress: "99/1 Rama 9 Road, Bangkok", 
      latitude: "13.7563", 
      longitude: "100.5018", 
      openTime: "08:00", 
      closeTime: "22:00",
      status: "Available" // อันนี้ Mock ไว้ก่อน (ปกติสถานะจะมาจาก Charging_Point)
    },
    { 
      stationId: 2, 
      stationName: "Station B2", 
      stationAddress: "Central World Parking, 3rd Floor", 
      latitude: "13.7469", 
      longitude: "100.5393", 
      openTime: "00:00", 
      closeTime: "23:59", // 24 Hours
      status: "Occupied"
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State สำหรับฟอร์ม (ตรงตาม ER Diagram: Charging_Station)
  const [currentStation, setCurrentStation] = useState({
    stationId: null,
    stationName: "",
    stationAddress: "",
    latitude: "",
    longitude: "",
    openTime: "",
    closeTime: "",
    status: "Available"
  });

  // --- Functions ---

  const handleShowAdd = () => {
    setIsEditing(false);
    // Reset Form
    setCurrentStation({ 
      stationId: null, stationName: "", stationAddress: "", 
      latitude: "", longitude: "", openTime: "", closeTime: "", status: "Available" 
    });
    setShowModal(true);
  };

  const handleShowEdit = (station) => {
    setIsEditing(true);
    setCurrentStation(station);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    if (isEditing) {
      setStations(stations.map(s => s.stationId === currentStation.stationId ? currentStation : s));
    } else {
      const newId = stations.length > 0 ? Math.max(...stations.map(s => s.stationId)) + 1 : 1;
      setStations([...stations, { ...currentStation, stationId: newId }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this station?")) {
      setStations(stations.filter(s => s.stationId !== id));
    }
  };

  // Helper: คำนวณสถานะร้านเปิด/ปิด (Optional feature)
  const isOpenNow = (open, close) => {
    // Logic ง่ายๆ เพื่อโชว์ในตาราง (ของจริงต้องเทียบเวลาปัจจุบัน)
    return `${open} - ${close}`;
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Station Management</h2>
          <p className="text-muted">Manage charging stations data.</p>
        </div>
        <button className="btn btn-primary" onClick={handleShowAdd}>
          <i className="bi bi-plus-lg me-2"></i> Add Station
        </button>
      </div>

      {/* Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
            <h5 className="mb-0 fw-bold">Station List</h5>
        </div>
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th className="ps-4">ID</th>
                        <th>Station Name</th>
                        <th>Address</th>
                        <th>Coordinates (Lat, Long)</th>
                        <th>Operating Hours</th>
                        <th className="text-end pe-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map((st) => (
                        <tr key={st.stationId}>
                            <td className="ps-4 text-muted">#{st.stationId}</td>
                            <td>
                                <span className="fw-bold">{st.stationName}</span>
                            </td>
                            <td className="small text-muted" style={{maxWidth: '200px'}}>{st.stationAddress}</td>
                            <td>
                                <span className="badge bg-light text-dark border">
                                    <i className="bi bi-geo-alt me-1"></i>
                                    {st.latitude}, {st.longitude}
                                </span>
                            </td>
                            <td>
                                <i className="bi bi-clock me-1 text-primary"></i>
                                {st.openTime} - {st.closeTime}
                            </td>
                            <td className="text-end pe-4">
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleShowEdit(st)}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(st.stationId)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* --- Modal Form: ปรับให้ตรงกับ ER Diagram --- */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Station Data" : "Add New Station"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            {/* 1. Station Name */}
            <Form.Group className="mb-3">
              <Form.Label>Station Name <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ex. PTT Station Rama 9"
                value={currentStation.stationName}
                onChange={(e) => setCurrentStation({...currentStation, stationName: e.target.value})}
              />
            </Form.Group>

            {/* 2. Station Address */}
            <Form.Group className="mb-3">
              <Form.Label>Station Address</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2}
                placeholder="Enter full address..."
                value={currentStation.stationAddress}
                onChange={(e) => setCurrentStation({...currentStation, stationAddress: e.target.value})}
              />
            </Form.Group>

            {/* 3. Coordinates (Latitude & Longitude) */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control 
                        type="number" 
                        step="0.000001"
                        placeholder="Ex. 13.7563"
                        value={currentStation.latitude}
                        onChange={(e) => setCurrentStation({...currentStation, latitude: e.target.value})}
                    />
                </div>
                <div className="col-md-6">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control 
                        type="number" 
                        step="0.000001"
                        placeholder="Ex. 100.5018"
                        value={currentStation.longitude}
                        onChange={(e) => setCurrentStation({...currentStation, longitude: e.target.value})}
                    />
                </div>
            </div>

            {/* 4. Operating Hours (Open Time & Close Time) */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <Form.Label>Open Time</Form.Label>
                    <Form.Control 
                        type="time" 
                        value={currentStation.openTime}
                        onChange={(e) => setCurrentStation({...currentStation, openTime: e.target.value})}
                    />
                </div>
                <div className="col-md-6">
                    <Form.Label>Close Time</Form.Label>
                    <Form.Control 
                        type="time" 
                        value={currentStation.closeTime}
                        onChange={(e) => setCurrentStation({...currentStation, closeTime: e.target.value})}
                    />
                </div>
            </div>

            {/* หมายเหตุ: Charging Point ยังไม่รวมอยู่ในฟอร์มนี้เพราะเป็นคนละ Table (Relation 1:M) */}
            <div className="alert alert-light border small text-muted">
                <i className="bi bi-info-circle me-2"></i>
                Charging Points (Connectors) can be managed after creating the station.
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? "Update Station" : "Save Station"}
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Station;