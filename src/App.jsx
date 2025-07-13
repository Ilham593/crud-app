import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function MainLayout() {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";
    const isSystem = theme === "system";

    root.classList.remove("dark");

    if (isDark) {
      root.classList.add("dark");
      return;
    }

    if (isSystem) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (mediaQuery.matches) {
        root.classList.add("dark");
      }
      const handleChange = (e) => {
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto p-4 ">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
