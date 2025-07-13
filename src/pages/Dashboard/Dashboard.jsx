import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setCurrentPage } from "../../store/slices/crudSlice";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { searchTerm, currentPage, itemsPerPage } = useSelector(
    (state) => state.crud
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [paginationInfo, setPaginationInfo] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePaginationInfoChange = (info) => {
    setPaginationInfo(info);

    if (info.currentPage > info.totalPages && info.currentPage > 1) {
      dispatch(setCurrentPage(info.totalPages));
      dispatch(setCurrentPage(1));
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= paginationInfo.totalPages) {
      dispatch(setCurrentPage(pageNumber));
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlSearchTerm = searchParams.get("search") || "";
    const urlPage = Number(searchParams.get("page")) || 1;

    if (urlSearchTerm !== searchTerm) {
      dispatch(setSearchTerm(urlSearchTerm));
    }

    if (
      urlPage !== currentPage &&
      urlPage >= 1 &&
      (paginationInfo.totalPages === 0 || urlPage <= paginationInfo.totalPages)
    ) {
      dispatch(setCurrentPage(urlPage));
    } else if (urlPage !== currentPage && urlPage < 1) {
      dispatch(setCurrentPage(1));
    }
  }, [
    location.search,
    searchTerm,
    dispatch,
    currentPage,
    paginationInfo.totalPages,
  ]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchTerm && searchTerm.trim() !== "") {
      newParams.set("search", searchTerm.trim());
    }
    if (currentPage > 1) {
      newParams.set("page", currentPage.toString());
    }

    const newQueryString = newParams.toString();
    const currentQueryString = new URLSearchParams(location.search).toString();

    if (newQueryString !== currentQueryString) {
      navigate(`?${newQueryString}`, { replace: true });
    }
  }, [searchTerm, currentPage, navigate, location.search]);
  const pageNumbers = [];
  for (let i = 1; i <= paginationInfo.totalPages; i++) {
    pageNumbers.push(i);
  }
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

        <ListItem onPaginationInfoChange={handlePaginationInfoChange} />

        {paginationInfo.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-4 py-2 rounded-lg font-bold ${
                  number === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors duration-200`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === paginationInfo.totalPages}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}

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
