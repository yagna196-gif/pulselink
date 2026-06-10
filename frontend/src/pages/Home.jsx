import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-red-50">
        <h1 className="text-6xl font-bold text-red-600 mb-6">
          🩸 PulseLink
        </h1>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Connecting Blood Donors with Patients
        </h2>

        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          During Emergencies
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Find verified blood donors instantly and help save lives during
          critical medical situations.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/donor-register"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            Become a Donor
          </Link>

          <Link
            to="/create-request"
            className="bg-white border border-red-600 text-red-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-red-50 transition"
          >
            Request Blood
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-4xl font-bold text-red-600">500+</h3>
            <p className="text-gray-600 mt-2">Registered Donors</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-4xl font-bold text-red-600">120+</h3>
            <p className="text-gray-600 mt-2">Lives Saved</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-4xl font-bold text-red-600">50+</h3>
            <p className="text-gray-600 mt-2">Active Requests</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-4xl font-bold text-red-600">24/7</h3>
            <p className="text-gray-600 mt-2">Emergency Support</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose PulseLink?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">
              🩸 Instant Matching
            </h3>
            <p className="text-gray-600">
              Quickly find compatible blood donors during emergencies.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">
              📍 Nearby Donors
            </h3>
            <p className="text-gray-600">
              Locate available donors near the patient's location.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">
              📱 SMS Notifications
            </h3>
            <p className="text-gray-600">
              Notify matching donors instantly through SMS alerts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">
              ⚡ Fast Response
            </h3>
            <p className="text-gray-600">
              Designed specifically for urgent blood requirements.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home