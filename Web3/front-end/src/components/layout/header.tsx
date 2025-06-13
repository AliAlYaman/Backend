import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useAuth  } from "../../contexts/auth-context";

export function Header() {
  const { accessToken, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  return (
    <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
      <div className="text-xl font-semibold tracking-wide">CRONOS</div>

      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-300 hover:text-white transition-colors">Learn</a>
        <Link to="wallet/balance" className="text-gray-300 hover:text-white transition-colors">Balance</Link>
        <Link to="wallet" className="text-gray-300 hover:text-white transition-colors">Deposit</Link>
        <Link to="transfer" className="text-gray-300 hover:text-white transition-colors">Transfer</Link>
      </nav>

      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-4">
          { !accessToken ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="inline-block px-4 py-2 text-sm font-semibold text-black bg-gradient-to-r from-blue-400 to-purple-500 
                rounded-full"
              >
                Register
              </Link>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-sm font-medium  bg-red-500 cursor-pointer"
            >
              Logout
            </Button>
          )}
        </div>

        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-sm font-medium text-white hover:text-gray-300"
        >
          <span>Get CRONOS</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}