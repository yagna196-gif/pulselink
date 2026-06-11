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

  const recentDonors = [
    {
      name: "Palak Ojha",
      blood_group: "O+",
      phone: "7093110206"
    }
  ]

  const recentRequests = [
    {
      patient_name: "Rahul Sharma",
      blood_group: "O+",
      status: "Pending"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-4 md:px-6">

        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-8">
          📊 Dashboard
        </h1>

        {loading ? (
          <div className="text-center text-xl">
            Loading Dashboard...
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                <h2 className="text-5xl font-bold text-red-600">
                  {stats.total_donors}
                </h2>
                <p className="text-gray-600 mt-2">
                  Registered Donors
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                <h2 className="text-5xl font-bold text-blue-600">
                  {stats.total_requests}
                </h2>
                <p className="text-gray-600 mt-2">
                  Blood Requests
                </p>
              </div>

            </div>

            {/* Notification Status */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-green-700 mb-2">
                📱 Notification Status
              </h2>

              <p className="text-green-600">
                Notification system ready for donor alerts.
              </p>
            </div>

            {/* Recent Donors */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">
                🩸 Recent Donors
              </h2>

              <div className="space-y-4">
                {recentDonors.map((donor, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4"
                  >
                    <p className="font-semibold">
                      {donor.name}
                    </p>

                    <p>
                      Blood Group: {donor.blood_group}
                    </p>

                    <p>
                      Phone: {donor.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">
                🚑 Recent Blood Requests
              </h2>

              <div className="space-y-4">
                {recentRequests.map((request, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4"
                  >
                    <p className="font-semibold">
                      {request.patient_name}
                    </p>

                    <p>
                      Blood Group: {request.blood_group}
                    </p>

                    <p>
                      Status: {request.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Matching Donors Section */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                🔍 Matching Donors
              </h2>

              <p className="text-gray-700">
                This section will automatically display matching donors
                after a blood request is created.
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