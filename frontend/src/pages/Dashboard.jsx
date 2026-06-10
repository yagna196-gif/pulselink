import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import api from "../services/api"

function Dashboard() {
  const [stats, setStats] = useState({
    total_donors: 0,
    total_requests: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard")
      setStats(response.data)
    } catch (error) {
      console.error("Dashboard Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 md:py-12 px-4 md:px-6">

        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-10">
          📊 Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-xl">
            Loading Dashboard...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

              <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
                <h2 className="text-5xl font-bold text-red-600">
                  {stats.total_donors}
                </h2>
                <p className="text-gray-600 mt-2">
                  Registered Donors
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
                <h2 className="text-5xl font-bold text-blue-600">
                  {stats.total_requests}
                </h2>
                <p className="text-gray-600 mt-2">
                  Blood Requests
                </p>
              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">
                PulseLink Overview
              </h2>

              <p className="text-gray-600 mb-3">
                Total registered donors available in the system.
              </p>

              <p className="text-gray-600">
                Total blood requests created by patients.
              </p>
            </div>
          </>
        )}

      </div>

      <Footer />
    </div>
  )
}

export default Dashboard