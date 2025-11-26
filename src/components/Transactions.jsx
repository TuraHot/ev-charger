import { recentTransactions } from "../data/mockData";
import { getStatusBadge } from "../utils/helper";

const Transactions = () => {
  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">ประวัติการทำรายการ</h2>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">รายการธุรกรรมทั้งหมด</h5>
          <button className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-download me-1"></i> Export CSV
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Transaction ID</th>
                <th>Station</th>
                <th>User</th>
                <th>Time</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="ps-4 text-muted">#{tx.id.toString().padStart(6, '0')}</td>
                  <td className="fw-bold">{tx.station}</td>
                  <td>
                    <div className="d-flex align-items-center">
                       {/* รูปโปรไฟล์จำลอง */}
                       <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                        <i className="bi bi-person-fill text-secondary"></i>
                      </div>
                      {tx.user}
                    </div>
                  </td>
                  <td>{tx.time}</td>
                  <td>
                    {/* ไอคอนตามวิธีจ่ายเงิน */}
                    {tx.paymentMethod === 'บัตรเครดิต' && <i className="bi bi-credit-card-fill text-primary me-2"></i>}
                    {tx.paymentMethod === 'QR Code' && <i className="bi bi-qr-code text-success me-2"></i>}
                    {tx.paymentMethod}
                  </td>
                  <td className="fw-bold">{tx.amount}</td>
                  <td>
                    {/* ใช้ Helper เลือกสี Badge */}
                    <span className={`badge rounded-pill bg-${getStatusBadge(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-link text-decoration-none">View Slip</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Section */}
        <div className="card-footer bg-white py-3">
            <nav>
                <ul className="pagination justify-content-end mb-0">
                    <li className="page-item disabled"><a className="page-link" href="#">ก่อนหน้า</a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">ถัดไป</a></li>
                </ul>
            </nav>
        </div>
      </div>
    </div>
  );
};

export default Transactions;