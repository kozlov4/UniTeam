import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/LoginPage/LoginPage.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
