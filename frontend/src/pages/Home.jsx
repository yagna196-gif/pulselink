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

  const language = localStorage.getItem("language") || "en"

  const text = {
    en: {
      title: "Connecting Blood Donors with Patients",
      subtitle: "During Emergencies",
      description:
        "Find verified blood donors instantly and help save lives during critical medical situations.",
      donor: "Become a Donor",
      request: "Request Blood",
      registeredDonors: "Registered Donors",
      livesSaved: "Lives Saved",
      activeRequests: "Active Requests",
      emergencySupport: "Emergency Support",
      whyChoose: "Why Choose PulseLink?",
      instantMatching: "Instant Matching",
      instantMatchingDesc:
        "Quickly find compatible blood donors during emergencies.",
      nearbyDonors: "Nearby Donors",
      nearbyDonorsDesc:
        "Locate available donors near the patient's location.",
      smsNotifications: "SMS Notifications",
      smsNotificationsDesc:
        "Notify matching donors instantly through SMS alerts.",
      fastResponse: "Fast Response",
      fastResponseDesc:
        "Designed specifically for urgent blood requirements."
    },

    hi: {
      title: "रक्तदाताओं को मरीजों से जोड़ना",
      subtitle: "आपातकालीन स्थितियों में",
      description:
        "सत्यापित रक्तदाताओं को तुरंत खोजें और जीवन बचाने में मदद करें।",
      donor: "दाता बनें",
      request: "रक्त अनुरोध करें",
      registeredDonors: "पंजीकृत दाता",
      livesSaved: "बचाए गए जीवन",
      activeRequests: "सक्रिय अनुरोध",
      emergencySupport: "आपातकालीन सहायता",
      whyChoose: "PulseLink क्यों चुनें?",
      instantMatching: "तुरंत मिलान",
      instantMatchingDesc:
        "आपातकाल में उपयुक्त रक्तदाता जल्दी खोजें।",
      nearbyDonors: "निकटतम दाता",
      nearbyDonorsDesc:
        "मरीज के पास उपलब्ध रक्तदाताओं को खोजें।",
      smsNotifications: "SMS सूचनाएँ",
      smsNotificationsDesc:
        "मिलान किए गए दाताओं को तुरंत SMS भेजें।",
      fastResponse: "तेज़ प्रतिक्रिया",
      fastResponseDesc:
        "आपातकालीन रक्त आवश्यकताओं के लिए डिज़ाइन किया गया।"
    },

    te: {
      title: "రక్త దాతలను రోగులతో అనుసంధానం చేయడం",
      subtitle: "అత్యవసర పరిస్థితుల్లో",
      description:
        "ధృవీకరించబడిన రక్తదాతలను వెంటనే కనుగొని ప్రాణాలను కాపాడండి.",
      donor: "దాతగా మారండి",
      request: "రక్తం అభ్యర్థించండి",
      registeredDonors: "నమోదైన దాతలు",
      livesSaved: "రక్షించబడిన ప్రాణాలు",
      activeRequests: "క్రియాశీల అభ్యర్థనలు",
      emergencySupport: "అత్యవసర సహాయం",
      whyChoose: "PulseLink ఎందుకు?",
      instantMatching: "తక్షణ సరిపోలిక",
      instantMatchingDesc:
        "అత్యవసర సమయంలో సరిపోయే రక్తదాతలను వెంటనే కనుగొనండి.",
      nearbyDonors: "సమీప దాతలు",
      nearbyDonorsDesc:
        "రోగి సమీపంలో ఉన్న దాతలను గుర్తించండి.",
      smsNotifications: "SMS నోటిఫికేషన్లు",
      smsNotificationsDesc:
        "సరిపోలిన దాతలకు వెంటనే SMS పంపండి.",
      fastResponse: "వేగవంతమైన స్పందన",
      fastResponseDesc:
        "అత్యవసర రక్త అవసరాల కోసం ప్రత్యేకంగా రూపొందించబడింది."
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="text-center py-16 md:py-24 px-6 bg-gradient-to-r from-red-50 to-red-100">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6">
          🩸 PulseLink
        </h1>

        <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
          {text[language].title}
        </h2>

        <h2 className="text-xl md:text-3xl font-semibold text-gray-800 mb-8">
          {text[language].subtitle}
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          {text[language].description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

  <Link
    to="/donor-register"
    className="bg-red-600 hover:bg-red-700 hover:scale-105 transform duration-200 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
  >
    {text[language].donor}
  </Link>

  <Link
    to="/create-request"
    className="bg-white border border-red-600 text-red-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-red-50 hover:scale-105 transform duration-200"
  >
    {text[language].request}
  </Link>

  <Link
    to="/assistant"
    className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transform duration-200 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
  >
    AI Assistant
  </Link>

</div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-4xl font-bold text-red-600">500+</h3>
            <p className="text-gray-600 mt-2">{text[language].registeredDonors}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-4xl font-bold text-red-600">120+</h3>
            <p className="text-gray-600 mt-2">{text[language].livesSaved}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-4xl font-bold text-red-600">50+</h3>
            <p className="text-gray-600 mt-2">{text[language].activeRequests}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h3 className="text-4xl font-bold text-red-600">24/7</h3>
            <p className="text-gray-600 mt-2">{text[language].emergencySupport}</p>
          </div>

        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {text[language].whyChoose}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="text-red-600" size={32} />
              <h3 className="text-2xl font-bold">
                {text[language].instantMatching}
              </h3>
            </div>
            <p>{text[language].instantMatchingDesc}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="text-red-600" size={32} />
              <h3 className="text-2xl font-bold">
                {text[language].nearbyDonors}
              </h3>
            </div>
            <p>{text[language].nearbyDonorsDesc}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="text-red-600" size={32} />
              <h3 className="text-2xl font-bold">
                {text[language].smsNotifications}
              </h3>
            </div>
            <p>{text[language].smsNotificationsDesc}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="text-red-600" size={32} />
              <h3 className="text-2xl font-bold">
                {text[language].fastResponse}
              </h3>
            </div>
            <p>{text[language].fastResponseDesc}</p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home