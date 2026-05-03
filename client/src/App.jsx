import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";

import "./App.css";

import CreateProjectModal from "./components/CreateProjectModal/CreateProjectModal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />

      <Route path="/create" element={<CreateProjectModal isOpen={true} />} />
    </Routes>
  );
}

export default App;
