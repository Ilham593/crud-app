import { useDispatch } from "react-redux";
import { addData } from "../../../store/slices/crudSlice";
import { useState } from "react";

function AddItem({ onClose }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

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

    const newItem = {
      id: Date.now(),
      title: form.title,
      description: form.description,
    };

    dispatch(addData(newItem));

    setForm({
      title: "",
      description: "",
    });
    setError("");

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex justify-center p-4">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-xl shadow-lg space-y-6 w-full max-w-lg"
      >
        {" "}
        <h3 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Tambah Item Baru
        </h3>{" "}
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-300 ease-in-out"
            id="title"
            type="text"
            placeholder="Enter title"
            value={form.title}
            onChange={handleInputChange}
            name="title"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-300 ease-in-out"
            id="description"
            type="text"
            placeholder="Enter description"
            value={form.description}
            onChange={handleInputChange}
            name="description"
            required
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}
        <button
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
          type="submit"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;
