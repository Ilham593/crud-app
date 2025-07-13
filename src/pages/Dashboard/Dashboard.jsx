import { useEffect, useState } from "react";
import { FaPlus, FaNewspaper } from "react-icons/fa";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchAndPage } from "../../store/slices/crudSlice";

function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, searchTerm, currentPage } = useSelector((state) => state.crud);
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlSearchTerm = searchParams.get("search") || "";
    const urlPage = parseInt(searchParams.get("page"), 10) || 1;

    if (urlSearchTerm !== searchTerm || urlPage !== currentPage) {
      dispatch(
        setSearchAndPage({
          searchTerm: urlSearchTerm,
          currentPage: urlPage,
        })
      );
    }
  }, [location.search, searchTerm, currentPage, dispatch]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-200">
            Selamat Datang, {user ? user.fullname.split(" ")[0] : "Pengguna"}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Ini adalah dasbor manajemen postingan Anda.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <FaNewspaper className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Total Postingan
              </h2>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {data.length}
              </p>
            </div>
          </div>
          <button
            onClick={toggleModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
          >
            <FaPlus className="w-5 h-5" />
            <span>Tulis Postingan Baru</span>
          </button>
        </div>

        <ListItem />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-lg">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold focus:outline-none"
              >
                &times;
              </button>
              <AddItem onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
