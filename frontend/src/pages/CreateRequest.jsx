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
  const language = localStorage.getItem("language") || "en"

const text = {
  en: {
    title: "Create Blood Request",
    patientName: "Patient Name",
    patientAge: "Patient Age",
    phone: "Contact Number",
    hospitalName: "Hospital Name",
    hospitalAddress: "Hospital Address",
    bloodGroup: "Select Blood Group",
    unitsRequired: "Units Required",
    notes: "Emergency Notes",
    submit: "Submit Blood Request",
    submitting: "Submitting..."
  },

  hi: {
    title: "रक्त अनुरोध बनाएं",
    patientName: "रोगी का नाम",
    patientAge: "रोगी की आयु",
    phone: "संपर्क नंबर",
    hospitalName: "अस्पताल का नाम",
    hospitalAddress: "अस्पताल का पता",
    bloodGroup: "रक्त समूह चुनें",
    unitsRequired: "आवश्यक यूनिट",
    notes: "आपातकालीन नोट्स",
    submit: "रक्त अनुरोध भेजें",
    submitting: "भेजा जा रहा है..."
  },

  te: {
    title: "రక్త అభ్యర్థన సృష్టించండి",
    patientName: "రోగి పేరు",
    patientAge: "రోగి వయస్సు",
    phone: "సంప్రదింపు నంబర్",
    hospitalName: "ఆసుపత్రి పేరు",
    hospitalAddress: "ఆసుపత్రి చిరునామా",
    bloodGroup: "రక్త గ్రూప్ ఎంచుకోండి",
    unitsRequired: "అవసరమైన యూనిట్లు",
    notes: "అత్యవసర గమనికలు",
    submit: "రక్త అభ్యర్థన పంపండి",
    submitting: "పంపబడుతోంది..."
  }
}

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
            🚑 {text[language].title}
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
              placeholder={text[language].patientName}
              value={formData.patient_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              name="age"
              placeholder={text[language].patientAge}
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder={text[language].phone}
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              name="hospital_name"
              placeholder={text[language].hospitalName}
              value={formData.hospital_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="3"
              name="hospital_address"
              placeholder={text[language].hospitalAddress}
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
              <option value="">{text[language].bloodGroup}</option>
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
              placeholder={text[language].unitsRequired}
              value={formData.units_required}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="4"
              name="notes"
              placeholder={text[language].notes}
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
              ? text[language].submitting
              : text[language].submit}

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