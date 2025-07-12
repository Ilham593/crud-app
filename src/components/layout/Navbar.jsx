import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import { FaChevronDown } from "react-icons/fa";
function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
        >
          CRUD APP
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition-colors duration-300 text-lg font-medium"
          >
            Home
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-white hover:text-blue-400 focus:outline-none transition-colors duration-300 p-2 rounded-md hover:bg-gray-700"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <span className="font-semibold text-lg">
                {user ? user.fullname : "Pengguna"}
              </span>

              <FaChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10 ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="block px-4 py-2 text-sm text-gray-800 font-bold border-b border-gray-200">
                  {user ? user.fullname : "Tamu"}
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  role="menuitem"
                >
                  Edit Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
