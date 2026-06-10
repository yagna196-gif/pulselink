import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function DonorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    blood_group: "",
    last_donation_date: "",
    availability_status: "Yes"
  })

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name) {
      setMessage("❌ Name is required")
      return
    }

    if (!formData.phone) {
      setMessage("❌ Phone number is required")
      return
    }

    if (!formData.blood_group) {
      setMessage("❌ Blood group is required")
      return
    }

    if (Number(formData.age) < 18) {
      setMessage("❌ Donor must be at least 18 years old")
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setMessage("✅ Donor registration form validated successfully!")

      setFormData({
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        blood_group: "",
        last_donation_date: "",
        availability_status: "Yes"
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto py-10 md:py-16 px-4 md:px-6">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-8">
            🩸 Donor Registration
          </h1>

          {message && (
            <div className="mb-4 p-3 rounded-lg bg-gray-100 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              name="address"
              placeholder="Address"
              rows="3"
              value={formData.address}
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
              type="date"
              name="last_donation_date"
              value={formData.last_donation_date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <select
              name="availability_status"
              value={formData.availability_status}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option>Yes</option>
              <option>No</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Registering..." : "Register as Donor"}
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DonorRegister