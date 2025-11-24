import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage.jsx";
import PredictionPage from "./pages/predictionpage.jsx";
import ResultsPage from "./pages/resultspage.jsx";
import LoginPage from "./pages/loginpage.jsx";
import SignupPage from "./pages/signuppage.jsx";
import NotFoundPage from "./pages/404.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
export default App;
