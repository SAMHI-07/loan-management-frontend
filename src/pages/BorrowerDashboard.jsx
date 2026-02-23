import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/borrower.css";
function BorrowerDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();   // clear login/session
    navigate("/");          // go back to login
  };

  const [activeTab, setActiveTab] = useState("schedule");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);

  /* ===== DUMMY BORROWER STATS ===== */
  const stats = {
    activeLoans: 1,
    totalBorrowed: 50000,
    totalOwed: 45230,
    nextPayment: "10 Mar 2026",
  };

  /* ===== PAYMENT DATA ===== */
  const paymentSchedule = [
    {
      loanId: "L001",
      dueDate: "10/03/2026",
      amount: 1576,
      principal: 1200,
      interest: 376,
      lender: "ABC Bank",
      status: "due",
    },
  ];

  const paymentHistory = [
    {
      paymentId: "P001",
      loanId: "L001",
      amount: 1576,
      principal: 1200,
      interest: 376,
      date: "10/02/2026",
      method: "UPI",
      status: "completed",
    },
  ];
  <button
    onClick={handleLogout}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Logout
  </button>

  return (
    <div className="borrower-container">
      {/* Header */}
      <header className="borrower-header">
        <div>
          <h1>Borrower Dashboard</h1>
          <p>Track your loans and manage payments</p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </header>

      {/* ===== STATS ===== */}
      <div className="stats-grid">
        <div className="card">
          <h4>Active Loans</h4>
          <p className="card-number">{stats.activeLoans}</p>
        </div>

        <div className="card">
          <h4>Total Borrowed</h4>
          <p className="card-number">${stats.totalBorrowed}</p>
        </div>

        <div className="card">
          <h4>Total Owed</h4>
          <p className="card-number">${stats.totalOwed}</p>
        </div>

        <div className="card">
          <h4>Next Payment</h4>
          <p className="card-number">{stats.nextPayment}</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="action-grid">
        <div className="action-card" onClick={() => setShowPaymentModal(true)}>
          <h3>Make a Payment</h3>
          <p>Pay your active loan EMI</p>
        </div>

        <div className="action-card" onClick={() => setShowLoanModal(true)}>
          <h3>Apply for Loan</h3>
          <p>Submit a new loan request</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "schedule" ? "tab active" : "tab"}
          onClick={() => setActiveTab("schedule")}
        >
          Payment Schedule
        </button>
        <button
          className={activeTab === "history" ? "tab active" : "tab"}
          onClick={() => setActiveTab("history")}
        >
          Payment History
        </button>
      </div>

      {/* Payment Schedule */}
      {activeTab === "schedule" && (
        <section className="panel">
          <h3>Payment Schedule</h3>
          <table>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Due Date</th>
                <th>Payment Amount</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Lender</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentSchedule.map((p, i) => (
                <tr key={i}>
                  <td>{p.loanId}</td>
                  <td>{p.dueDate}</td>
                  <td>${p.amount}</td>
                  <td>${p.principal}</td>
                  <td>${p.interest}</td>
                  <td>{p.lender}</td>
                  <td>
                    <span className="status due">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Payment History */}
      {activeTab === "history" && (
        <section className="panel">
          <h3>Payment History</h3>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Loan ID</th>
                <th>Amount</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((p, i) => (
                <tr key={i}>
                  <td>{p.paymentId}</td>
                  <td>{p.loanId}</td>
                  <td>${p.amount}</td>
                  <td>${p.principal}</td>
                  <td>${p.interest}</td>
                  <td>{p.date}</td>
                  <td>{p.method}</td>
                  <td>
                    <span className="status active">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Make Payment Modal */}
      {showPaymentModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Make a Payment</h3>
            <p>Process a payment for your active loan</p>

            <select>
              <option>Choose a loan...</option>
              <option>L001</option>
            </select>

            <input type="number" placeholder="Enter payment amount" />

            <select>
              <option>Choose method...</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Net Banking</option>
            </select>

            <div className="modal-actions">
              <button onClick={() => setShowPaymentModal(false)}>Cancel</button>
              <button
                className="primary-btn"
                onClick={() => {
                  alert("Payment processed successfully");
                  setShowPaymentModal(false);
                }}
              >
                Process Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Loan Modal */}
      {showLoanModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Apply for a New Loan</h3>
            <p>Submit a loan application to available lenders</p>

            <input type="number" placeholder="Enter loan amount" />
            <select>
              <option>Select purpose...</option>
              <option>Education</option>
              <option>Home</option>
              <option>Business</option>
            </select>
            <input type="number" placeholder="Enter loan tenure (months)" />
            <input type="text" placeholder="Employment status" />
            <input type="number" placeholder="Annual income" />

            <div className="modal-actions">
              <button onClick={() => setShowLoanModal(false)}>Cancel</button>
              <button
                className="primary-btn"
                onClick={() => {
                  alert("Loan application submitted");
                  setShowLoanModal(false);
                }}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BorrowerDashboard;