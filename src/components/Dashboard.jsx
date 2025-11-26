import Dropdown from "react-bootstrap/Dropdown";

const Dashboard = () => {
  const stats = [
    {
      title: "จำนวนเงินทั้งหมด",
      value: "฿ 4,500",
      icon: "bi-currency-bitcoin",
      color: "primary",
    },
    {
      title: "จุดชาร์จที่ใช้งานได้",
      value: "8",
      icon: "bi-ev-station-fill",
      color: "success",
    },
    {
      title: "พลังงานที่จ่ายไป",
      value: "350 kWh",
      icon: "bi-lightning-charge-fill",
      color: "warning",
    },
    { title: "ผู้ใช้ใหม่", value: "12", icon: "bi-people-fill", color: "info" },
  ];

  const recentTransactions = [
    {
      id: 1,
      station: "Station A1",
      user: "John Doe",
      time: "10:30 AM",
      paymentMethod: "บัตรเครดิต",
      amount: "฿120",
      status: "เสร็จสิ้น",
    },
    {
      id: 2,
      station: "Station B2",
      user: "Jane Smith",
      time: "11:15 AM",
      paymentMethod: "QR Code",
      amount: "฿200",
      status: "กำลังชาร์จ",
    },
    {
      id: 3,
      station: "Station A2",
      user: "Robert B.",
      time: "11:45 AM",
      paymentMethod: "บัตรเครดิต",
      amount: "฿85",
      status: "เสร็จสิ้น",
    },
    {
      id: 4,
      station: "Station C1",
      user: "Alice W.",
      time: "12:00 PM",
      paymentMethod: "-",
      amount: "-",
      status: "กำลังรอ",
    },
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted">Overview of your EV Charging System</p>
        </div>

        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="border shadow-sm"
          >
            <i className="bi bi-calendar-event me-2"></i> Today
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="" active>
              Today
            </Dropdown.Item>
            <Dropdown.Item href="">This Week</Dropdown.Item>
            <Dropdown.Item href="">This Month</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted mb-1">{stat.title}</h6>
                  <h3 className="fw-bold mb-0">{stat.value}</h3>
                </div>
                <div
                  className={`icon-box bg-${stat.color} bg-opacity-10 text-${stat.color} rounded-3 p-3`}
                >
                  <i className={`bi ${stat.icon} fs-4`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">การทำรายการล่าสุด</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-center">
                  <tr>
                    <th>ชื่อสถานี</th>
                    <th>ชื่อผู้ใช้</th>
                    <th>เวลาทำรายการ</th>
                    <th>วิธีการชำระเงิน</th>
                    <th>Status</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>
                        <span className="fw-bold">{tx.station}</span>
                      </td>
                      <td>{tx.user}</td>
                      <td className="text-center">{tx.time}</td>
                      <td className="text-center">{tx.paymentMethod}</td>
                      <td className="text-center">
                        <span
                          className={`badge rounded-pill bg-${
                            tx.status === "เสร็จสิ้น"
                              ? "success"
                              : tx.status === "กำลังชาร์จ"
                              ? "warning"
                              : "secondary"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="text-end">{tx.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Station Status</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>
                  <i className="bi bi-circle-fill text-success me-2"></i>
                  ใช้งานได้
                </span>
                <span className="fw-bold">8</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>
                  <i className="bi bi-circle-fill text-warning me-2"></i>
                  กำลังใช้งาน
                </span>
                <span className="fw-bold">3</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>
                  <i className="bi bi-circle-fill text-danger me-2"></i>ปิดการใช้งาน
                </span>
                <span className="fw-bold">1</span>
              </div>
              <hr />
              <div className="text-center mt-3">
                <button className="btn btn-outline-primary w-100">
                  View All Stations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
