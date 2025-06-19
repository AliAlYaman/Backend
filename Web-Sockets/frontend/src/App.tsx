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
import JoinRoomPage from "./pages/join-room-page";
import PlayPage from "./pages/play-page";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ChessHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/play"
              element={
                <ProtectedRoute>
                  <PlayPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game/:roomId"
              element={
                <ProtectedRoute>
                  <ChessGamePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game"
              element={
                <ProtectedRoute>
                  <ChessGamePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/join-room"
              element={
                <ProtectedRoute>
                  <JoinRoomPage />
                </ProtectedRoute>
              }
            />

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
