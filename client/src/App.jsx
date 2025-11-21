import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage.jsx";
import PredictionPage from "./pages/predictionpage.jsx";
import ResultsPage from "./pages/resultspage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}
export default App;
