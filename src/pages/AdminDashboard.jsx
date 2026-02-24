import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaCog,
  FaShieldAlt,
  FaDatabase,
  FaEnvelope,
} from "react-icons/fa";
import "../styles/Dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-container">
      {/* HEADER */}
      <header className="admin-header">
        <div>
          <h2 className="brand">Loan Management Platform</h2>
          <span className="subtitle">Admin Dashboard</span>
        </div>

        <div className="header-right">
          <div className="user-info">
            <strong>John Smith</strong>
            <span>Admin</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="admin-main">
        <h1>Admin Dashboard</h1>
        <p className="desc">
          Oversee platform operations and manage user accounts
        </p>

        {/* STATS */}
        <div className="stats-grid">
          <div className="card">
            <FaUsers className="card-icon" />
            <h4>Total Users</h4>
            <p className="card-number">6</p>
            <span>Across all roles</span>
          </div>

          <div className="card">
            <FaMoneyCheckAlt className="card-icon" />
            <h4>Active Loans</h4>
            <p className="card-number">4</p>
            <span>Currently active</span>
          </div>

          <div className="card">
            <FaFileInvoiceDollar className="card-icon" />
            <h4>Total Loan Volume</h4>
            <p className="card-number">$190,000</p>
            <span>All time disbursed</span>
          </div>

          <div className="card">
            <FaExchangeAlt className="card-icon" />
            <h4>Transactions</h4>
            <p className="card-number">6</p>
            <span>Total recorded</span>
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          <button
            className={activeTab === "users" ? "tab active" : "tab"}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>

          <button
            className={activeTab === "loans" ? "tab active" : "tab"}
            onClick={() => setActiveTab("loans")}
          >
            Loan Oversight
          </button>

          <button
            className={activeTab === "settings" ? "tab active" : "tab"}
            onClick={() => setActiveTab("settings")}
          >
            System Settings
          </button>
        </div>

        {/* USER MANAGEMENT */}
        {activeTab === "users" && (
          <section className="table-section">
            <h3>User Accounts</h3>
            <p className="table-desc">
              Manage and monitor all platform users
            </p>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John</td>
                  <td>john@example.com</td>
                  <td>Admin</td>
                  <td>
                    <span className="status active">Active</span>
                  </td>
                  <td>01/15/2024</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* LOAN OVERSIGHT */}
        {activeTab === "loans" && (
          <section className="table-section">
            <h3>All Loans</h3>
            <p className="table-desc">
              Overview of all loans in the system
            </p>

            <table>
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Borrower</th>
                  <th>Lender</th>
                  <th>Amount</th>
                  <th>Rate</th>
                  <th>Status</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>L001</td>
                  <td>Michael Brown</td>
                  <td>Sarah Johnson</td>
                  <td>$50,000</td>
                  <td>8.5%</td>
                  <td>
                    <span className="status active">Active</span>
                  </td>
                  <td>$45,230</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* SYSTEM SETTINGS */}
        {activeTab === "settings" && (
          <section className="settings-section">
            <h3>System Configuration</h3>
            <p className="table-desc">
              Platform settings and security options
            </p>

            <div className="settings-card">
              <FaShieldAlt />
              <div>
                <strong>Two-Factor Authentication</strong>
                <p>Require 2FA for all users</p>
              </div>
              <button>Configure</button>
            </div>

            <div className="settings-card">
              <FaDatabase />
              <div>
                <strong>Data Backup</strong>
                <p>Automated daily backups</p>
              </div>
              <button>Configure</button>
            </div>

            <div className="settings-card">
              <FaEnvelope />
              <div>
                <strong>Email Notifications</strong>
                <p>Configure email templates</p>
              </div>
              <button>Configure</button>
            </div>

            <div className="settings-card">
              <FaCog />
              <div>
                <strong>Audit Logs</strong>
                <p>View system activity logs</p>
              </div>
              <button>View Logs</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;