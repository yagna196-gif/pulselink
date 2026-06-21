import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DonorRegister from "./pages/DonorRegister";
import CreateRequest from "./pages/CreateRequest";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/donor-register" element={<DonorRegister />} />
      <Route path="/create-request" element={<CreateRequest />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assistant" element={<AIAssistant />} />
    </Routes>
  );
}

export default App;