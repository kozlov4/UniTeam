import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import StudentHomePage from "./pages/StudentHomePage/StudentHomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage.jsx";
import ParticipantsPage from "./pages/ParticipantsPage/ParticipantsPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage.jsx";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import CreateProjectModal from "./components/CreateProjectModal/CreateProjectModal";
import PrivateRoute from "./router/PrivateRoute";
import GuestRoute from "./router/GuestRoute";
import MainPage from "./pages/Admin/MainPage/MainPage.jsx";
import ProjectsPageAdmin from "./pages/Admin/ProjectsPageAdmin/ProjectsPageAdmin.jsx";

import "./App.css";
import StudentsPage from "./pages/Admin/StudentsPage/StudentsPage.jsx";
import TechnologiesPage from "./pages/Admin/TechnologiesPage/TechnologiesPage.jsx";

function App() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<HomePage />} />

      {/* Guest only routes */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<StudentHomePage />} />
        <Route path="/about" element={<ProjectDetailPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/create" element={<CreateProjectModal isOpen={true} />} />

        <Route path="/admin/main" element={<MainPage />} />
        <Route path="/admin/projects" element={<ProjectsPageAdmin />} />
        <Route path="/admin/users" element={<StudentsPage />} />
        <Route path="/admin/skills" element={<TechnologiesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
