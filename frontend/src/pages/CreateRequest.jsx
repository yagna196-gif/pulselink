import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function CreateRequest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
            🚑 Create Blood Request
          </h1>

          <form className="space-y-5">

            <div>
              <label className="block font-medium mb-2">
                Patient Name
              </label>
              <input
                type="text"
                placeholder="Enter patient name"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Patient Age
              </label>
              <input
                type="number"
                placeholder="Enter patient age"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="9876543210"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                placeholder="Enter hospital name"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Hospital Address
              </label>
              <textarea
                rows="3"
                placeholder="Enter hospital address"
                className="w-full border rounded-lg p-3"
              ></textarea>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Blood Group Required
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

            <div>
              <label className="block font-medium mb-2">
                Units Required
              </label>
              <input
                type="number"
                placeholder="Enter units required"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Emergency Notes
              </label>
              <textarea
                rows="4"
                placeholder="Describe emergency situation"
                className="w-full border rounded-lg p-3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Submit Blood Request
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CreateRequest