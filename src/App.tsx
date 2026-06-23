import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FoodsPage from "./pages/FoodsPage";
import MythsPage from "./pages/MythsPage";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/LoginPage";
import FriendsPage from "./pages/FriendsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col font-['Nunito']">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/alimentos" element={<FoodsPage />} />
            <Route path="/mitos" element={<MythsPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/amigos" element={<FriendsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
