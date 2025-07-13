import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import { setTheme } from "../../store/slices/themeSlice";
import { FaChevronDown, FaSun, FaMoon, FaDesktop, FaPencilAlt } from "react-icons/fa";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
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

  const themeOptions = [
    { name: "light", icon: <FaSun /> },
    { name: "dark", icon: <FaMoon /> },
    { name: "system", icon: <FaDesktop /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-200 p-4 shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-400 dark:hover:text-blue-400 transition-colors duration-300"
        >
          <FaPencilAlt />
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-slate-800 dark:text-slate-200 hover:text-blue-400 dark:hover:text-blue-400 transition-colors duration-300 text-lg font-medium"
          >
            Home
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 hover:text-blue-400 dark:hover:text-blue-400 focus:outline-none transition-colors duration-300 p-2 rounded-md"
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
                className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 font-bold border-b border-gray-200 dark:border-gray-700">
                  {user ? user.fullname : "Tamu"}
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  role="menuitem"
                >
                  Edit Profil
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <div className="px-4 pt-2 pb-1 text-xs text-gray-500 dark:text-gray-400">
                  Pilih Tema
                </div>
                <div className="flex justify-around items-center px-2 py-1">
                  {themeOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleThemeChange(option.name)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        theme === option.name
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                      title={
                        option.name.charAt(0).toUpperCase() +
                        option.name.slice(1)
                      }
                    >
                      {option.icon}
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
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
