import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import StudentHomePage from "./pages/StudentHomePage/StudentHomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage.jsx";
import ParticipantsPage from "./pages/ParticipantsPage/ParticipantsPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage.jsx";

import "./App.css";

import CreateProjectModal from "./components/CreateProjectModal/CreateProjectModal";
import MessagesPage from "./pages/MessagesPage/MessagesPage";

function App() {
  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/create" element={<CreateProjectModal isOpen={true} />} />
      <Route path="/" element={<StudentHomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/participants" element={<ParticipantsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
