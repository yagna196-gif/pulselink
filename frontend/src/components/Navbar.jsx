import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-red-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">
        🩸 PulseLink
      </h1>

      <div className="flex gap-6 font-medium">
        <Link to="/" className="hover:text-red-200">
          Home
        </Link>

        <Link to="/donor-register" className="hover:text-red-200">
          Register
        </Link>

        <Link to="/create-request" className="hover:text-red-200">
          Request Blood
        </Link>

        <Link to="/dashboard" className="hover:text-red-200">
          Dashboard
        </Link>
      </div>
    </nav>
  )
}

export default Navbar