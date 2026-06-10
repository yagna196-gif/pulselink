import Navbar from "../components/Navbar"

function Home() {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>PulseLink</h1>

        <p>
          Connecting Blood Donors with Patients During Emergencies
        </p>

        <button>
          Register as Donor
        </button>

        <button style={{ marginLeft: "10px" }}>
          Request Blood
        </button>
      </div>
    </div>
  )
}

export default Home