import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function DonorRegister() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
            🩸 Donor Registration
          </h1>

          <form className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                placeholder="Enter your age"
                min="18"
                max="65"
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-medium mb-2">
                Gender
              </label>
              <select className="w-full border rounded-lg p-3">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="9876543210"
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium mb-2">
                Address
              </label>
              <textarea
                placeholder="Enter your address"
                className="w-full border rounded-lg p-3"
                rows="3"
              ></textarea>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block font-medium mb-2">
                Blood Group
              </label>
              <select className="w-full border rounded-lg p-3">
                <option>Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            {/* Last Donation Date */}
            <div>
              <label className="block font-medium mb-2">
                Last Donation Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg p-3"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block font-medium mb-2">
                Available to Donate?
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Register as Donor
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DonorRegister