import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const VALID_USERNAME = "ilham@gmail.com";
  const VALID_PASSWORD = "123456";
  const VALID_FULL_NAME = "ilham pratama kusuma";

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === VALID_USERNAME && form.password === VALID_PASSWORD) {
      dispatch(login({ username: VALID_USERNAME, fullname: VALID_FULL_NAME }));
    } else {
      setError("Email atau password salah.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden max-w-5xl w-full">
        <div className="md:w-1/2 flex items-center justify-center bg-slate-50 dark:bg-slate-700 p-6 md:p-10">
          <img
            src={logo}
            alt="login logo"
            className="max-w-full h-auto object-contain rounded-lg"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-slate-800 dark:text-slate-200 text-center mb-8">
            Selamat Datang!
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
            Silakan masuk ke akun Anda.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-200 transition duration-300 ease-in-out"
                value={form.email}
                onChange={handleInputChange}
                placeholder="contoh@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-200 transition duration-300 ease-in-out"
                value={form.password}
                onChange={handleInputChange}
                placeholder="password Anda"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm text-center font-medium mt-2">
                {error}
              </p>
            )}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
