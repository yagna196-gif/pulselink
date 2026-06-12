import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  )

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const text = {
    en: {
      home: "Home",
      register: "Register",
      request: "Request Blood",
      dashboard: "Dashboard",
    },

    hi: {
      home: "होम",
      register: "पंजीकरण",
      request: "रक्त अनुरोध",
      dashboard: "डैशबोर्ड",
    },

    te: {
      home: "హోమ్",
      register: "నమోదు",
      request: "రక్త అభ్యర్థన",
      dashboard: "డ్యాష్‌బోర్డ్",
    },
  }

  const handleLanguageChange = (e) => {
    localStorage.setItem("language", e.target.value)
    setLanguage(e.target.value)
    window.location.reload()
  }

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            🩸 PulseLink
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center font-medium">

            <Link
              to="/"
              className="hover:text-red-200 transition"
            >
              {text[language].home}
            </Link>

            <Link
              to="/donor-register"
              className="hover:text-red-200 transition"
            >
              {text[language].register}
            </Link>

            <Link
              to="/create-request"
              className="hover:text-red-200 transition"
            >
              {text[language].request}
            </Link>

            <Link
              to="/dashboard"
              className="hover:text-red-200 transition"
            >
              {text[language].dashboard}
            </Link>

            <select
              value={language}
              onChange={handleLanguageChange}
              className="text-black rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>

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
              {text[language].home}
            </Link>

            <Link
              to="/donor-register"
              onClick={() => setIsOpen(false)}
              className="hover:text-red-200"
            >
              {text[language].register}
            </Link>

            <Link
              to="/create-request"
              onClick={() => setIsOpen(false)}
              className="hover:text-red-200"
            >
              {text[language].request}
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="hover:text-red-200"
            >
              {text[language].dashboard}
            </Link>

            <select
              value={language}
              onChange={handleLanguageChange}
              className="text-black rounded px-2 py-1 w-40"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>

          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar