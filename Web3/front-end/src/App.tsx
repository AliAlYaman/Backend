import "./App.css";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
import { HomePage } from "./pages/home";
import { Routes, Route } from "react-router-dom";
import { CryptoTransferDemo } from "./pages/transfer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/transfer" element={<CryptoTransferDemo />} />
    </Routes>
  );
}

export default App;
