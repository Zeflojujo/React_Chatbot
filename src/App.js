import { HashRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";

import ChatbotApp from "./chatbot/ChatbotApp";

function App() {

  return (
    <Router>
      <Routes>

        {/* ChatbotApp */}
        <Route path="/" element={<ChatbotApp />} />
      </Routes>
    </Router>
  );
}

export default App;
