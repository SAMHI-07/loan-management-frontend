import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const role = e.target.role.value;

    if (role === "admin") navigate("/admin");
    if (role === "lender") navigate("/lender");
    if (role === "borrower") navigate("/borrower");
    if (role === "analyst") navigate("/analyst");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Loan Management Platform</h2>
        <p>Sign in to access your dashboard</p>

        <form onSubmit={handleLogin}>
          <select name="role" required>
            <option value="">Choose your role</option>
            <option value="admin">Admin</option>
            <option value="lender">Lender</option>
            <option value="borrower">Borrower</option>
            <option value="analyst">Financial Analyst</option>
          </select>

          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">Sign In</button>
        </form>

        <p className="demo-text">
          Demo Mode: Select any role and use any credentials
        </p>
      </div>
    </div>
  );
}