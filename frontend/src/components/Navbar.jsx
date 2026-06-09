import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">
        PulseLink
      </h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/donor-register">Register</Link>
        <Link to="/create-request">Request Blood</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  )
}

export default Navbar