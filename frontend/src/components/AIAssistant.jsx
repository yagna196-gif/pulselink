import { useState } from "react";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    setResponse("AI response will appear here");
  };

  return (
    <div>
      <h2>PulseLink AI Assistant</h2>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about blood donation..."
      />

      <button onClick={sendMessage}>
        Send
      </button>

      <p>{response}</p>
    </div>
  );
}