import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import MatchingDonors from "../components/MatchingDonors"
import api from "../services/api"

function CreateRequest() {
  const [formData, setFormData] = useState({
    patient_name: "",
    age: "",
    phone: "",
    hospital_name: "",
    hospital_address: "",
    blood_group: "",
    units_required: "",
    notes: ""
  })

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const [matchedDonors, setMatchedDonors] = useState([])
  const [notificationsSent, setNotificationsSent] = useState(0)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.patient_name) {
      setMessage("❌ Patient name is required")
      return
    }

    if (!formData.phone) {
      setMessage("❌ Contact number is required")
      return
    }

    if (!formData.blood_group) {
      setMessage("❌ Blood group is required")
      return
    }

    if (!formData.hospital_address) {
      setMessage("❌ Hospital address is required")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const requestData = {
        patient_name: formData.patient_name,
        phone: formData.phone,
        hospital_address: formData.hospital_address,
        blood_group: formData.blood_group,
        notes: formData.notes
      }

      const response = await api.post(
        "/requests/",
        requestData
      )

      console.log("FULL RESPONSE:", response.data)
      console.log("DONORS:", response.data.matching_donors)

      setMatchedDonors(
        response.data.matching_donors || []
      )

      setNotificationsSent(
        response.data.notifications_sent || 0
      )

      setMessage("✅ Blood request submitted successfully!")

      setFormData({
        patient_name: "",
        age: "",
        phone: "",
        hospital_name: "",
        hospital_address: "",
        blood_group: "",
        units_required: "",
        notes: ""
      })
    } catch (error) {
      console.error(error)
      setMessage("❌ Failed to submit blood request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto py-10 md:py-16 px-4 md:px-6">

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">

          <h1 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-8">
            🚑 Create Blood Request
          </h1>

          {message && (
            <div className="mb-4 p-3 rounded-lg bg-gray-100 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="patient_name"
              placeholder="Patient Name"
              value={formData.patient_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              name="age"
              placeholder="Patient Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              name="hospital_name"
              placeholder="Hospital Name"
              value={formData.hospital_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="3"
              name="hospital_address"
              placeholder="Hospital Address"
              value={formData.hospital_address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>

            <input
              type="number"
              name="units_required"
              placeholder="Units Required"
              value={formData.units_required}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="4"
              name="notes"
              placeholder="Emergency Notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading
                ? "Submitting..."
                : "Submit Blood Request"}
            </button>

          </form>

        </div>

        {notificationsSent > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
            📱 Notifications sent to {notificationsSent} matching donor(s)
          </div>
        )}

        <MatchingDonors donors={matchedDonors} />

      </div>

      <Footer />
    </div>
  )
}

export default CreateRequest