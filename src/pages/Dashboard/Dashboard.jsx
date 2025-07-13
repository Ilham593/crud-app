import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchAndPage } from "../../store/slices/crudSlice";

function Dashboard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { searchTerm, currentPage } = useSelector((state) => state.crud);
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
          <button
            onClick={toggleModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaPlus className="w-5 h-5" />
            <span>Add New Item</span>
          </button>
        </div>

        <ListItem />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-lg">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
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
