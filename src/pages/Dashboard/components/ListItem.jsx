import { useSelector, useDispatch } from "react-redux";
import { deleteData } from "../../../store/slices/crudSlice";
import UpdateData from "./Updatedata";
import { useState } from "react";
import Search from "./SearchTerm";
import { useNavigate } from "react-router-dom";

function ListItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, searchTerm, currentPage, itemsPerPage } = useSelector(
    (state) => state.crud
  );

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const filteredData = data.filter((item) => {
    if (!searchTerm.trim()) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchTermLower) ||
      item.description.toLowerCase().includes(searchTermLower)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", pageNumber);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleOpenUpdateModal = (item) => {
    setItemToEdit(item);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setItemToEdit(null);
    setIsUpdateModalOpen(false);
  };

  const handleDelete = (id) => {
    const result = window.confirm(
      "Apakah Anda yakin ingin menghapus item ini?"
    );
    if (result) {
      dispatch(deleteData(id));
    }
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex justify-center p-4">
      <div className="p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg w-full border border-transparent dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-200 text-center mb-6">
          Daftar Item
        </h2>

        <Search />

        {currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-3"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-slate-800 dark:text-slate-200">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-end space-x-2 mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors duration-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleOpenUpdateModal(item)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination />
          </>
        ) : searchTerm ? (
          <p className="text-center text-slate-500 dark:text-slate-400 text-lg">
            Tidak ada item yang cocok dengan pencarian "{searchTerm}".
          </p>
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 text-lg">
            Belum ada item ditambahkan.
          </p>
        )}
      </div>

      {isUpdateModalOpen && itemToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-lg">
            <button
              onClick={handleCloseUpdateModal}
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold focus:outline-none"
            >
              &times;
            </button>
            <UpdateData
              itemToEdit={itemToEdit}
              onClose={handleCloseUpdateModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;
