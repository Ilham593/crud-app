import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
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
