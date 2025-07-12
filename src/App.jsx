import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4 ">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
