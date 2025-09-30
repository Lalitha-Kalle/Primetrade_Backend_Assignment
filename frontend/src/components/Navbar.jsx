import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">
        {user && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/tasks" className="hover:underline">
              Tasks
            </Link>
            {user.role === "admin" && (
              <Link to="/users" className="hover:underline">
                Users
              </Link>
            )}
          </>
        )}
      </div>

      <div className="flex gap-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
