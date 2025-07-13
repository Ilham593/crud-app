import { useSelector, useDispatch } from "react-redux";
import { deleteData } from "../../../store/slices/crudSlice";
import UpdateData from "./Updatedata";
import { useEffect, useState } from "react";
import Search from "./SearchTerm";
function ListItem({ onPaginationInfoChange }) {
  const dispatch = useDispatch();
  const { data, searchTerm, currentPage, itemsPerPage } = useSelector(
    (state) => state.crud
  );

  const filteredData = data.filter((item) => {
    if (!searchTerm.trim()) {
      return true;
    }

    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchTermLower) ||
      item.description.toLowerCase().includes(searchTermLower)
    );
  });

  const totalFilteredItems = filteredData.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

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
    return;
  };

  useEffect(() => {
    if (onPaginationInfoChange) {
      onPaginationInfoChange({
        totalItems: totalFilteredItems,
        totalPages: totalPages,
        currentPage: currentPage,
      });
    }
  }, [totalFilteredItems, totalPages, currentPage, onPaginationInfoChange]);

  return (
    <div className="flex justify-center p-4">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Daftar Item
        </h2>

        <Search />

        {paginatedData.length === 0 && !searchTerm ? (
          <p className="text-center text-gray-600 text-lg">
            Belum ada item ditambahkan.
          </p>
        ) : paginatedData.length === 0 && searchTerm ? (
          <p className="text-center text-gray-600 text-lg">
            Tidak ada item yang cocok dengan pencarian "{searchTerm}".
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between space-y-3"
              >
                <div className="text-gray-800">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex justify-end space-x-2 mt-auto pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleOpenUpdateModal(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300" // Warna biru untuk Update
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isUpdateModalOpen && itemToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-lg">
            <button
              onClick={handleCloseUpdateModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
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
