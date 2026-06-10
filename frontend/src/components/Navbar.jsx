import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        backgroundColor: "#dc2626",
        color: "white",
        display: "flex",
        gap: "20px"
      }}
    >
      <Link to="/" style={{ color: "white" }}>Home</Link>
      <Link to="/donor-register" style={{ color: "white" }}>Register</Link>
      <Link to="/create-request" style={{ color: "white" }}>Request Blood</Link>
      <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
    </nav>
  )
}

export default Navbar