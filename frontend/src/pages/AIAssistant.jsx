import { useState } from "react";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    let aiReply = "";

    if (message.toLowerCase().includes("o+")) {
      aiReply =
        "O+ donors can donate to O+, A+, B+, and AB+ recipients.";
    } else if (message.toLowerCase().includes("donate")) {
      aiReply =
        "Healthy adults between 18 and 65 years can donate blood.";
    } else if (message.toLowerCase().includes("blood")) {
      aiReply =
        "PulseLink helps connect blood donors with patients during emergencies.";
    } else {
      aiReply =
        "I can help with blood donation, blood groups, and donor registration.";
    }

    setChat([
      ...chat,
      { sender: "user", text: message },
      { sender: "ai", text: aiReply },
    ]);

    setMessage("");
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        PulseLink AI Assistant
      </h1>

      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${
              msg.sender === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <span className="inline-block p-2 rounded bg-gray-100">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about blood donation..."
          className="border p-2 flex-1 rounded"
        />

        <button
          onClick={sendMessage}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}