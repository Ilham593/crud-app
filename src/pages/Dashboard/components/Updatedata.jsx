import { updateData } from "../../../store/slices/crudSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function UpdateData({ itemToEdit, onClose }) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setForm({
        id: itemToEdit.id,
        title: itemToEdit.title,
        description: itemToEdit.description,
      });
    }
  }, [itemToEdit]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title dan Description tidak boleh kosong.");
      return;
    }

    const updatedItem = {
      id: form.id,
      title: form.title,
      description: form.description,
    };

    dispatch(updateData(updatedItem));

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg space-y-6">
      {" "}
      <h3 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        Edit Item
      </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="update-title"
          >
            Title
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-300 ease-in-out"
            type="text"
            id="update-title"
            name="title"
            placeholder="Enter new title"
            value={form.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="update-description"
          >
            Description
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-300 ease-in-out"
            type="text"
            id="update-description"
            name="description"
            placeholder="Enter new description"
            value={form.description}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full mt-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateData;
