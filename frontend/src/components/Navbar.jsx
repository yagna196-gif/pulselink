import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            🩸 PulseLink
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 font-medium">
            <Link to="/" className="hover:text-red-200 transition">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 font-medium">

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-red-200"
            >
              Home
            </Link>

            <Link
              to="/donor-register"
              onClick={() => setIsOpen(false)}
              className="hover:text-red-200"
            >
              Register
            </Link>

            <Link
              to="/create-request"
              onClick={() => setIsOpen(false)}
              className="hover:text-red-200"
            >
              Request Blood
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-red-200"
            >
              Dashboard
            </Link>

          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar