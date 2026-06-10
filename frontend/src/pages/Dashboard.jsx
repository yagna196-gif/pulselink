import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-red-600 mb-10">
          📊 Dashboard
        </h1>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <h2 className="text-4xl font-bold text-red-600">500</h2>
            <p className="text-gray-600 mt-2">Total Donors</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <h2 className="text-4xl font-bold text-blue-600">50</h2>
            <p className="text-gray-600 mt-2">Active Requests</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <h2 className="text-4xl font-bold text-green-600">35</h2>
            <p className="text-gray-600 mt-2">Accepted Requests</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <h2 className="text-4xl font-bold text-yellow-500">15</h2>
            <p className="text-gray-600 mt-2">Pending Requests</p>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">
            Recent Blood Requests
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Patient</th>
                <th className="text-left py-3">Blood Group</th>
                <th className="text-left py-3">Hospital</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Rahul Sharma</td>
                <td>O+</td>
                <td>City Hospital</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Priya Singh</td>
                <td>A+</td>
                <td>Apollo Hospital</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Accepted
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3">Aman Verma</td>
                <td>B+</td>
                <td>Care Hospital</td>
                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Accepted
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard