import "./App.css";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
import { HomePage } from "./pages/home";
import { Routes, Route } from "react-router-dom";
import { CryptoTransferDemo } from "./pages/transfer";
import WalletDeposit from "./pages/wallet";
import BalancePage from "./pages/balance";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/transfer" element={<CryptoTransferDemo />} />
      <Route path="/wallet" element={<WalletDeposit />} />
      <Route path="/wallet/balance" element={<BalancePage />} />
    </Routes>
  );
}

export default App;
