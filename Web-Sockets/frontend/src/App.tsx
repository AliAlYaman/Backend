import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ChessHomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import ProtectedRoute from "./router/protected-route";
import DashboardPage from "./pages/dashboard-page";
import ProfilePage from "./pages/profile-page";
import { AuthProvider } from "./contexts/auth-context";
import ChessGamePage from "./pages/chess-game-page";
import { useEffect } from "react";
import {socket} from "./lib/socket";

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server');
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <AuthProvider>
        <Router>
            <Routes>
            <Route path="/" element={<ChessHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/game/" element={<ChessGamePage />} />
            <Route path="/game/:roomId" element={<ChessGamePage />} />


            <Route
              path="/dashboard"
              element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
              }
            />
            </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
