import { useState } from "react";
import "../styles/lender.css";
import { useNavigate } from "react-router-dom";

function LenderDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("loans");
  const [showCreateLoan, setShowCreateLoan] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculator state
  const [principal, setPrincipal] = useState(50000);
  const [rate, setRate] = useState(8.5);
  const [term, setTerm] = useState(36);

  // Loans
  const [loans, setLoans] = useState([
    {
      id: "L001",
      borrower: "Michael Brown",
      amount: 50000,
      rate: 8.5,
      term: 36,
      status: "active",
    },
  ]);

  // Calculator logic
  const monthlyRate = rate / 100 / 12;
  const monthlyPayment =
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -term));
  const totalAmount = monthlyPayment * term;
  const totalInterest = totalAmount - principal;

  // Create Loan
  function handleCreateLoan(e) {
    e.preventDefault();
    const form = e.target;

    const newLoan = {
      id: `L00${loans.length + 1}`,
      borrower: form.borrower.value,
      amount: Number(form.amount.value),
      rate: Number(form.rate.value),
      term: Number(form.term.value),
      status: "active",
    };

    setLoans([...loans, newLoan]);
    setShowCreateLoan(false);
    setShowSuccess(true);
    setActiveTab("loans");
    form.reset();

    setTimeout(() => setShowSuccess(false), 2500);
  }

  return (
    <div className="lender-container">
      {/* Header */}
      <header className="lender-hero">
        <div>
          <h1>Lender Dashboard</h1>
          <p>Manage your loan portfolio and track payments</p>
        </div>

        <div className="header-actions">
          <button
            className="secondary-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
           }}
          >
            Logout
          </button>

          <button
            className="primary-btn"
            onClick={() => setShowCreateLoan(true)}
          >
            + Create Loan Offer
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Active Loans</h4>
          <p>{loans.length}</p>
        </div>
        <div className="stat-card">
          <h4>Total Lent</h4>
          <p>$150,000</p>
        </div>
        <div className="stat-card">
          <h4>Outstanding</h4>
          <p>$138,430</p>
        </div>
        <div className="stat-card">
          <h4>Borrowers</h4>
          <p>2</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["loans", "payments", "calculator"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "loans"
              ? "My Loans"
              : tab === "payments"
              ? "Payment History"
              : "Loan Calculator"}
          </button>
        ))}
      </div>

      {/* Loans */}
      {activeTab === "loans" && (
        <section className="panel">
          <h3>Active Loans</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Borrower</th>
                <th>Amount</th>
                <th>Rate</th>
                <th>Term</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.borrower}</td>
                  <td>${loan.amount}</td>
                  <td>{loan.rate}%</td>
                  <td>{loan.term}m</td>
                  <td>
                    <span className="status active">active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Payments */}
      {activeTab === "payments" && (
        <section className="panel">
          <h3>Payment History</h3>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Loan</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>P001</td>
                <td>L001</td>
                <td>$1,576</td>
                <td>02/15/2026</td>
                <td>
                  <span className="status active">completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* Calculator */}
      {activeTab === "calculator" && (
        <section className="panel">
          <h3>Loan Calculator</h3>

          <div className="calc-grid">
            <input type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} />
            <input type="number" value={rate} onChange={(e) => setRate(+e.target.value)} />
            <input type="number" value={term} onChange={(e) => setTerm(+e.target.value)} />
          </div>

          <div className="calc-cards">
            <div className="calc-card blue">
              <h4>Monthly Payment</h4>
              <p>${monthlyPayment.toFixed(2)}</p>
            </div>
            <div className="calc-card green">
              <h4>Total Interest</h4>
              <p>${totalInterest.toFixed(2)}</p>
            </div>
            <div className="calc-card purple">
              <h4>Total Amount</h4>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Create Loan Modal */}
      {showCreateLoan && (
        <div className="modal-backdrop">
          <form className="loan-modal" onSubmit={handleCreateLoan}>
            <h3>Create Loan Offer</h3>

            <input name="borrower" placeholder="Borrower Name" required />
            <input name="amount" type="number" placeholder="Amount ($)" required />
            <input name="rate" type="number" placeholder="Interest Rate (%)" required />
            <input name="term" type="number" placeholder="Term (months)" required />

            <div className="modal-actions">
              <button type="button" onClick={() => setShowCreateLoan(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-popup">
          <h4>✅ Loan Offer Created</h4>
          <p>Your loan offer was created successfully.</p>
        </div>
      )}
    </div>
  );
}

export default LenderDashboard;