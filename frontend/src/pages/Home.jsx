import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import {
  Heart,
  MapPin,
  MessageSquare,
  Zap
} from "lucide-react"

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 px-6 bg-gradient-to-r from-red-50 to-red-100">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6">
          🩸 PulseLink
        </h1>

        <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
          Connecting Blood Donors with Patients
        </h2>

        <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-8">
          During Emergencies
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Find verified blood donors instantly and help save lives during
          critical medical situations.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/donor-register"
            className="bg-red-600 hover:bg-red-700 hover:scale-105 transform duration-200 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            Become a Donor
          </Link>

          <Link
            to="/create-request"
            className="bg-white border border-red-600 text-red-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-red-50 hover:scale-105 transform duration-200"
          >
            Request Blood
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <h3 className="text-4xl font-bold text-red-600">500+</h3>
            <p className="text-gray-600 mt-2">Registered Donors</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <h3 className="text-4xl font-bold text-red-600">120+</h3>
            <p className="text-gray-600 mt-2">Lives Saved</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <h3 className="text-4xl font-bold text-red-600">50+</h3>
            <p className="text-gray-600 mt-2">Active Requests</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <h3 className="text-4xl font-bold text-red-600">24/7</h3>
            <p className="text-gray-600 mt-2">Emergency Support</p>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose PulseLink?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="text-red-600" size={32} />
              <h3 className="text-2xl font-bold">
                Instant Matching
              </h3>
            </div>

            <p className="text-gray-600">
              Quickly find compatible blood donors during emergencies.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="text-red-600" size={32} />
              <h3 className="text-2xl font-bold">
                Nearby Donors
              </h3>
            </div>

            <p className="text-gray-600">
              Locate available donors near the patient's location.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="text-red-600" size={32} />
              <h3 className="text-2xl font-bold">
                SMS Notifications
              </h3>
            </div>

            <p className="text-gray-600">
              Notify matching donors instantly through SMS alerts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="text-red-600" size={32} />
              <h3 className="text-2xl font-bold">
                Fast Response
              </h3>
            </div>

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