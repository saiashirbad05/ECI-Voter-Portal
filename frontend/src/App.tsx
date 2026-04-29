import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TricolorBar from './components/layout/TricolorBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Chatbot from './components/chatbot/Chatbot';

import HomePage from './pages/HomePage/HomePage';
import CandidatesPage from './pages/CandidatesPage/CandidatesPage';
import ConstituencyPage from './pages/ConstituencyPage/ConstituencyPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import TurnoutPage from './pages/TurnoutPage/TurnoutPage';
import NewsPage from './pages/NewsPage/NewsPage';
import GrievancePage from './pages/GrievancePage/GrievancePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import VerifyPage from './pages/VerifyPage/VerifyPage';
import CommandPalette from './components/common/CommandPalette';
import './styles/global.css';


function AppContent() {
  const location = useLocation();

  return (
    <div className="app-container">
      <TricolorBar />
      <Header />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0.38, 0.9] }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/candidates" element={<CandidatesPage />} />
              <Route path="/constituency" element={<ConstituencyPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/turnout" element={<TurnoutPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/grievance" element={<GrievancePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify" element={<VerifyPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
      <CommandPalette />
    </div>


  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
