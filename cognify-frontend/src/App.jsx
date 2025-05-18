import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';  // Importing useState and useEffect
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SurveyPage from './pages/SurveyPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import GamifiedLearning from './pages/GamifiedLearning';  
import MemoryMatch from './pages/MemoryMatch';
import ColorfulPuzzles from './pages/ColorfulPuzzles';
import ShapeSortingGame from './pages/ShapeSortingGame';
import ChatbotComponent from './pages/ChatbotComponent';
import CalmDownCorner from './pages/CalmDownCorner';
import MeditationPage from "./pages/MeditationPage";
import ColoringPage from "./pages/ColoringPage";
import LearningDashboard from "./pages/LearningDashboard";
import ChatbotWrapper from "./components/ChatbotWrapper"; // ✅ Import the chatbot wrapper
import EducationalResourcesPage from './pages/EducationalResourcesPage'; // Import the new page
import LocalSupportPage from './pages/LocalSupportPage'; // Import the new page


function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const res = await fetch('http://localhost:5000/api/users/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setLoggedInUserId(data._id);  // Assuming _id is returned
      }
    };

    fetchUserId();
  }, []);  // Run once when the component is mounted

  return (
    <Router>
      {loggedInUserId && <ChatbotWrapper />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/survey" element={<SurveyPage />} />      
        <Route path="/home" element={<HomePage />} />
        <Route path="/gamified-learning" element={<GamifiedLearning />} />
        <Route path="/memory-match" element={<MemoryMatch />} />
        <Route path="/shape-sorting" element={<ShapeSortingGame />} />
        <Route path="/colourful-puzzles" element={<ColorfulPuzzles />} />
        <Route path="/chatbot" element={<ChatbotComponent />} />
        <Route path="/calm-down" element={<CalmDownCorner />} />
        <Route path="/calm-down/meditation" element={<MeditationPage />} />
        <Route path="/calm-down/coloring" element={<ColoringPage />} />
        <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/resources" element={<EducationalResourcesPage />} />
                  <Route path="/local-support" element={<LocalSupportPage />} />

        {/* Only pass loggedInUserId once it's set */}
        <Route
  path="/learning-dashboard"
  element={<LearningDashboard userId={loggedInUserId} />}
/>

      </Routes>
    </Router>
  );
}

export default App;
