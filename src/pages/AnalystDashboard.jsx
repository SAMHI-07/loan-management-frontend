import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import "../styles/analyst.css";

const loanStatusData = [
  { name: "Active", value: 4 },
  { name: "Completed", value: 0 },
  { name: "Defaulted", value: 0 },
];

const interestRateData = [
  { range: "5-7%", count: 1 },
  { range: "7-9%", count: 2 },
  { range: "9-11%", count: 1 },
];

const trendsData = [
  { month: "Sep", disbursement: 15000, payment: 3000 },
  { month: "Oct", disbursement: 25000, payment: 4200 },
  { month: "Nov", disbursement: 50000, payment: 5200 },
  { month: "Dec", disbursement: 100000, payment: 6000 },
  { month: "Jan", disbursement: 0, payment: 6500 },
  { month: "Feb", disbursement: 0, payment: 7000 },
];

export default function AnalystDashboard() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="analyst-container">
      <h1>Financial Analyst Dashboard</h1>

      {/* Tabs */}
      <div className="analyst-tabs">
        {["overview", "trends", "risk", "reports"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t === "overview"
              ? "Portfolio Overview"
              : t === "trends"
              ? "Trends Analysis"
              : t === "risk"
              ? "Risk Assessment"
              : "Reports"}
          </button>
        ))}
      </div>

      {/* ================= PORTFOLIO OVERVIEW ================= */}
      {tab === "overview" && (
        <>
          <div className="grid-2">
            <div className="card">
              <h3>Loan Status Distribution</h3>
              <p>Current portfolio breakdown</p>
              <PieChart width={300} height={260}>
                <Pie
                  data={loanStatusData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            <div className="card">
              <h3>Interest Rate Distribution</h3>
              <p>Loans by interest rate ranges</p>
              <BarChart width={350} height={260} data={interestRateData}>
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </div>
          </div>

          <div className="metrics">
            <div className="metric-card">
              <span>Total Outstanding</span>
              <h2>$164,730</h2>
            </div>
            <div className="metric-card">
              <span>Avg Loan Size</span>
              <h2>$47,500</h2>
            </div>
            <div className="metric-card">
              <span>Active Borrowers</span>
              <h2>2</h2>
            </div>
          </div>
        </>
      )}

      {/* ================= TRENDS ANALYSIS ================= */}
      {tab === "trends" && (
        <>
          <div className="card wide">
            <h3>Payment & Disbursement Trends</h3>
            <p>6-month historical view</p>
            <LineChart width={900} height={300} data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="disbursement"
                stroke="#3b82f6"
              />
              <Line type="monotone" dataKey="payment" stroke="#22c55e" />
            </LineChart>
          </div>

          <div className="grid-2">
            <div className="card">
              <h3>Growth Metrics</h3>
              <ul className="list">
                <li>Loan Volume Growth <span className="green">+15.2%</span></li>
                <li>Payment Collection <span className="green">+8.7%</span></li>
                <li>New Borrowers <span className="green">+12.0%</span></li>
              </ul>
            </div>

            <div className="card">
              <h3>Forecast</h3>
              <div className="forecast blue">$275,000</div>
              <div className="forecast green">$18,500</div>
              <div className="forecast purple">$12,300</div>
            </div>
          </div>
        </>
      )}

      {/* ================= RISK ASSESSMENT ================= */}
      {tab === "risk" && (
        <>
          <div className="card wide">
            <h3>Risk Assessment Matrix</h3>

            {[
              { id: "L001", name: "Michael Brown", risk: "High Risk" },
              { id: "L002", name: "Robert Wilson", risk: "Medium Risk" },
              { id: "L003", name: "Michael Brown", risk: "Medium Risk" },
              { id: "L004", name: "Robert Wilson", risk: "High Risk" },
            ].map((l) => (
              <div key={l.id} className="risk-row">
                <div>
                  <strong>{l.id} - {l.name}</strong>
                  <p>$50,000 • repayment progress</p>
                </div>
                <span className={`risk ${l.risk.includes("High") ? "high" : "medium"}`}>
                  {l.risk}
                </span>
              </div>
            ))}
          </div>

          <div className="metrics">
            <div className="metric-card">Low Risk <h2>0</h2></div>
            <div className="metric-card">Medium Risk <h2>2</h2></div>
            <div className="metric-card">High Risk <h2>2</h2></div>
          </div>
        </>
      )}

      {/* ================= REPORTS ================= */}
      {tab === "reports" && (
        <div className="card wide">
          <h3>Generate Reports</h3>

          {[
            "Portfolio Performance Report",
            "Risk Assessment Report",
            "Payment History Report",
            "Financial Forecast",
          ].map((r) => (
            <div key={r} className="report-row">
              <span>{r}</span>
              <button>Generate</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}