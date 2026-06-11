function MatchingDonors({ donors }) {
  if (!donors || donors.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        🔍 Matching Donors Found
      </h2>

      <div className="space-y-4">
        {donors.map((donor, index) => (
          <div
            key={index}
            className="border rounded-lg p-4"
          >
            <p className="font-semibold">
              {donor.name}
            </p>

            <p>
              🩸 {donor.blood_group}
            </p>

            <p>
              📞 {donor.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchingDonors