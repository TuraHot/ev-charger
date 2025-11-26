import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const Setting = () => {
  const [config, setConfig] = useState({
    appName: "EV Charger Admin",
    currency: "THB",
    taxRate: 7,
    basePriceAC: 5.5,
    basePriceDC: 7.5,
    notifications: true,
    maintenanceMode: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = () => {
    alert("บันทึกการตั้งค่าเรียบร้อยแล้ว!");
    console.log("Saved Config:", config);
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">ตั้งค่าระบบ</h2>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-sliders me-2"></i>ตั้งค่าทั่วไป</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>ชื่อแอปพลิเคชัน</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="appName" 
                    value={config.appName} 
                    onChange={handleChange} 
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>สกุลเงิน</Form.Label>
                      <Form.Select name="currency" value={config.currency} onChange={handleChange}>
                        <option value="THB">THB (฿)</option>
                        <option value="USD">USD ($)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>ภาษีมูลค่าเพิ่ม (%)</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="taxRate" 
                        value={config.taxRate} 
                        onChange={handleChange} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-cash-coin me-2"></i>ราคาค่าชาร์จมาตรฐาน</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>ราคา AC Type 2 (บาท/หน่วย)</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="basePriceAC" 
                    value={config.basePriceAC} 
                    onChange={handleChange} 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>ราคา DC Fast Charge (บาท/หน่วย)</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="basePriceDC" 
                    value={config.basePriceDC} 
                    onChange={handleChange} 
                  />
                </Form.Group>
                <div className="text-muted small">
                  *ราคานี้จะถูกใช้เป็นค่าเริ่มต้นเมื่อสร้างจุดชาร์จใหม่
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 fw-bold"><i className="bi bi-gear-wide-connected me-2"></i>ควบคุมระบบ</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <div className="fw-bold">เปิดใช้งานการแจ้งเตือน</div>
                  <div className="text-muted small">รับการแจ้งเตือนเมื่อมีรายการใหม่ หรือสถานีขัดข้อง</div>
                </div>
                <Form.Check 
                  type="switch" 
                  id="notifications" 
                  name="notifications"
                  checked={config.notifications}
                  onChange={handleChange}
                  className="fs-4"
                />
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold text-danger">โหมดปิดปรับปรุงระบบ (Maintenance Mode)</div>
                  <div className="text-muted small">เมื่อเปิดใช้งาน ผู้ใช้ทั่วไปจะไม่สามารถใช้งานแอปได้</div>
                </div>
                <Form.Check 
                  type="switch" 
                  id="maintenanceMode" 
                  name="maintenanceMode"
                  checked={config.maintenanceMode}
                  onChange={handleChange}
                  className="fs-4"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-4 d-flex justify-content-end">
        <Button variant="primary" size="lg" onClick={handleSave}>
          <i className="bi bi-save me-2"></i>บันทึกการตั้งค่า
        </Button>
      </div>
    </div>
  );
};

export default Setting;