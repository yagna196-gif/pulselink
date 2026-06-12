import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import api from "../services/api"

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
  const language = localStorage.getItem("language") || "en"

const text = {
  en: {
    title: "Donor Registration",
    name: "Full Name",
    age: "Age",
    gender: "Select Gender",
    phone: "Phone Number",
    address: "Address",
    bloodGroup: "Select Blood Group",
    register: "Register as Donor",
    registering: "Registering...",
    yes: "Yes",
    no: "No"
  },

  hi: {
    title: "दाता पंजीकरण",
    name: "पूरा नाम",
    age: "आयु",
    gender: "लिंग चुनें",
    phone: "फोन नंबर",
    address: "पता",
    bloodGroup: "रक्त समूह चुनें",
    register: "दाता के रूप में पंजीकरण करें",
    registering: "पंजीकरण हो रहा है...",
    yes: "हाँ",
    no: "नहीं"
  },

  te: {
    title: "దాత నమోదు",
    name: "పూర్తి పేరు",
    age: "వయస్సు",
    gender: "లింగాన్ని ఎంచుకోండి",
    phone: "ఫోన్ నంబర్",
    address: "చిరునామా",
    bloodGroup: "రక్త గ్రూప్ ఎంచుకోండి",
    register: "దాతగా నమోదు చేయండి",
    registering: "నమోదు జరుగుతోంది...",
    yes: "అవును",
    no: "కాదు"
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

    try {
      setLoading(true)
      setMessage("")

      const donorData = {
        name: formData.name,
        phone: formData.phone,
        age: Number(formData.age),
        gender: formData.gender,
        address: formData.address,
        blood_group: formData.blood_group,
        last_donation_date: formData.last_donation_date,
        availability_status:
          formData.availability_status === "Yes"
      }

      const response = await api.post(
        "/donors/register",
        donorData
      )

      console.log(response.data)

      setMessage("✅ Donor registered successfully!")

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
    } catch (error) {
      console.error(error)

      setMessage(
        "❌ Registration failed. Please try again."
      )
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
            🩸 {text[language].title}
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
              placeholder={text[language].name}
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="number"
              name="age"
              placeholder={text[language].age}
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
              <option value="">{text[language].gender}</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder={text[language].phone}
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              name="address"
              placeholder={text[language].address}
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
              <option>{text[language].yes}</option>
              <option>{text[language].no}</option>
              
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading
                ? text[language].registering
                : text[language].register}
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default DonorRegister