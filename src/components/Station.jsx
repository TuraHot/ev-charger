import { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { initialStations } from "../data/mockData";
import { getStatusBadge } from "../utils/helper";

const Station = () => {
  const [stations, setStations] = useState(initialStations);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showAddPointModal, setShowAddPointModal] = useState(false);
  const [selectedStationPoints, setSelectedStationPoints] = useState(null);
  
  const [currentPoint, setCurrentPoint] = useState({
    pointId: null, connectorType: "AC Type 2", powerRating: "", price: "", status: "Available"
  });

  const [currentStation, setCurrentStation] = useState({
    stationId: null,
    stationName: "",
    stationAddress: "",
    latitude: "",
    longitude: "",
    openTime: "",
    closeTime: "",
    points: [],
  });

  const handleShowAdd = () => {
    setIsEditing(false);
    setCurrentStation({
      stationId: null,
      stationName: "",
      stationAddress: "",
      latitude: "",
      longitude: "",
      openTime: "",
      closeTime: "",
      points: [],
    });
    setShowModal(true);
  };

  const handleShowEdit = (station) => {
    setIsEditing(true);
    setCurrentStation(station);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("ลบสถานีนี้หรือไม่?")) {
      setStations(stations.filter((s) => s.stationId !== id));
    }
  };

  const handleSaveStation = () => {
    if (isEditing) {
      setStations(
        stations.map((s) =>
          s.stationId === currentStation.stationId ? currentStation : s
        )
      );
    } else {
      const newId =
        stations.length > 0
          ? Math.max(...stations.map((s) => s.stationId)) + 1
          : 1;
      setStations([...stations, { ...currentStation, stationId: newId }]);
    }
    setShowModal(false);
  };

  const handleManagePoints = (station) => {
    setSelectedStationPoints(station);
    setShowPointsModal(true);
  };

  const handleShowAddPoint = () => {
    setCurrentPoint({
      pointId: null,
      connectorType: "AC Type 2",
      powerRating: "",
      XH: "",
      price: "",
      status: "Available",
    });
    setShowAddPointModal(true);
  };

  const handleSavePoint = () => {
    if (!selectedStationPoints) return;

    const existingPoints = selectedStationPoints.points || [];
    const newPointId =
      existingPoints.length > 0
        ? Math.max(...existingPoints.map((p) => p.pointId)) + 1
        : selectedStationPoints.stationId * 100 + 1;

    const newPointData = { ...currentPoint, pointId: newPointId };

    const updatedStations = stations.map((st) => {
      if (st.stationId === selectedStationPoints.stationId) {
        const updatedPoints = [...(st.points || []), newPointData];
        setSelectedStationPoints({ ...st, points: updatedPoints });
        return { ...st, points: updatedPoints };
      }
      return st;
    });

    setStations(updatedStations);
    setShowAddPointModal(false);
  };

  const handleDeletePoint = (pointId) => {
    if (!window.confirm("Delete this charging point?")) return;

    const updatedStations = stations.map((st) => {
      if (st.stationId === selectedStationPoints.stationId) {
        const updatedPoints = st.points.filter((p) => p.pointId !== pointId);
        setSelectedStationPoints({ ...st, points: updatedPoints });
        return { ...st, points: updatedPoints };
      }
      return st;
    });
    setStations(updatedStations);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Station Management</h2>
          <p className="text-muted">จัดการสถานีชาร์จและจุดชาร์จ</p>
        </div>
        <button className="btn btn-primary" onClick={handleShowAdd}>
          <i className="bi bi-plus-lg me-2"></i>เพิ่มสถานี
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">สถานีทั้งหมด</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>ชื่อสถานี</th>
                <th>ที่อยู่</th>
                <th>ละติจูด/ลองจิจูด</th>
                <th>จำนวนจุดชาร์จ</th>
                <th>เวลาเปิด/ปิด</th>
                <th className="text-end pe-4"></th>
              </tr>
            </thead>
            <tbody>
              {stations.map((st) => (
                <tr key={st.stationId}>
                  <td className="ps-4 text-muted">#{st.stationId}</td>
                  <td>
                    <span className="fw-bold">{st.stationName}</span>
                  </td>
                  <td className="small text-muted">{st.stationAddress}</td>
                  <td className="small text-muted">
                    {st.latitude} {st.longitude}
                  </td>
                  <td>
                    <span className="badgeQX bg-info text-dark border">
                      {st.points ? st.points.length : 0} จุดชาร์จ
                    </span>
                  </td>
                  <td>
                    {st.openTime === "24 ชั่วโมง"
                      ? "เปิด 24 ชั่วโมง"
                      : `${st.openTime} - ${st.closeTime}`}
                  </td>
                  <td className="text-end pe-4">
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => handleManagePoints(st)}
                      title="Manage Points"
                    >
                      <i className="bi bi-plug-fill"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleShowEdit(st)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(st.stationId)}
                      title="Delete"
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

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "แก้ไขสถานี" : "เพิ่มสถานีใหม่"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อสถานี</Form.Label>
              <Form.Control
                type="text"
                value={currentStation.stationName}
                onChange={(e) =>
                  setCurrentStation({
                    ...currentStation,
                    stationName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ที่อยู่</Form.Label>
              <Form.Control
                type="text"
                value={currentStation.stationAddress}
                onChange={(e) =>
                  setCurrentStation({
                    ...currentStation,
                    stationAddress: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ละติจูด</Form.Label>
              <Form.Control
                type="text"
                value={currentStation.latitude}
                onChange={(e) =>
                  setCurrentStation({
                    ...currentStation,
                    latitude: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ลองจิจูด</Form.Label>
              <Form.Control
                type="text"
                value={currentStation.longitude}
                onChange={(e) =>
                  setCurrentStation({
                    ...currentStation,
                    longitude: e.target.value,
                  })
                }
              />
            </Form.Group>
            <div className="row">
              <div className="col-6 mb-3">
                <Form.Label>เวลาเปิด</Form.Label>
                <Form.Control
                  type="time"
                  value={currentStation.openTime}
                  onChange={(e) =>
                    setCurrentStation({
                      ...currentStation,
                      openTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-6 mb-3">
                <Form.Label>เวลาปิด</Form.Label>
                <Form.Control
                  type="time"
                  value={currentStation.closeTime}
                  onChange={(e) =>
                    setCurrentStation({
                      ...currentStation,
                      closeTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleSaveStation}>
            บันทึกสถานี
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPointsModal}
        onHide={() => setShowPointsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            จุดชาร์จ @{" "}
            <span className="text-primary">
              {selectedStationPoints?.stationName}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="success" size="sm" onClick={handleShowAddPoint}>
              <i className="bi bi-plus-lg me-2"></i>เพิ่มจุดชาร์จ
            </Button>
          </div>
          <div className="table-responsive">
            <Table bordered hover>
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>ประเภท</th>
                  <th>กำลังไฟ</th>
                  <th>ราคา/หน่วย</th>
                  <th>สถานะ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selectedStationPoints?.points?.length > 0 ? (
                  selectedStationPoints.points.map((pt) => (
                    <tr key={pt.pointId}>
                      <td>#{pt.pointId}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {pt.connectorType}
                        </span>
                      </td>
                      <td>{pt.powerRating}</td>
                      <td>฿ {pt.price}</td>
                      <td>
                        <span
                          className={`badge rounded-pill bg-${getStatusBadge(
                            pt.status
                          )}`}
                        >
                          {pt.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="link" className="text-danger p-0" onClick={() => handleDeletePoint(pt.pointId)}>
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      ไม่พบจุดชาร์จ
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAddPointModal}
        onHide={() => setShowAddPointModal(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title className="fs-5">Add New Charging Point</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Connector Type</Form.Label>
              <Form.Select
                value={currentPoint.connectorType}
                onChange={(e) =>
                  setCurrentPoint({
                    ...currentPoint,
                    connectorType: e.target.value,
                  })
                }
              >
                <option>AC Type 2</option>
                <option>DC CCS2</option>
                <option>DC CHAdeMO</option>
              </Form.Select>
            </Form.Group>
            <div className="row">
              <div className="col-6 mb-3">
                <Form.Label>Power Rating</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 22kW"
                  value={currentPoint.powerRating}
                  onChange={(e) =>
                    setCurrentPoint({
                      ...currentPoint,
                      powerRating: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-6 mb-3">
                <Form.Label>Price (THB/Unit)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 7.5"
                  value={currentPoint.price}
                  onChange={(e) =>
                    setCurrentPoint({ ...currentPoint, price: e.target.value })
                  }
                />
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Initial Status</Form.Label>
              <Form.Select
                value={currentPoint.status}
                onChange={(e) =>
                  setCurrentPoint({ ...currentPoint, status: e.target.value })
                }
              >
                <option value="Available">Available</option>
                <option value="Offline">Offline</option>
                <option value="Maintenance">Maintenance</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddPointModal(false)}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={handleSavePoint}>
            Add Point
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Station;
