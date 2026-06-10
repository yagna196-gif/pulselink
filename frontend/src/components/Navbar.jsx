import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        <h1 className="text-2xl font-bold">
          🩸 PulseLink
        </h1>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6 font-medium text-sm md:text-base">

          <Link
            to="/"
            className="hover:text-red-200 transition"
          >
            Home
          </Link>

          <Link
            to="/donor-register"
            className="hover:text-red-200 transition"
          >
            Register
          </Link>

          <Link
            to="/create-request"
            className="hover:text-red-200 transition"
          >
            Request Blood
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-red-200 transition"
          >
            Dashboard
          </Link>

        </div>

      </div>
    </nav>
  )
}

export default Navbar