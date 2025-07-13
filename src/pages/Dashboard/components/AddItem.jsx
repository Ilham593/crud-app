import { useDispatch } from "react-redux";
import { addData } from "../../../store/slices/crudSlice";
import { useState } from "react";

function AddItem({ onClose }) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
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
      image: form.image,
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
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6 w-full max-w-lg"
      >
        <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-200 text-center mb-6">
          Buat Postingan Baru
        </h3>
        <div>
          <label
            className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2"
            htmlFor="title"
          >
            Judul Postingan
          </label>

          <input
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-200 transition duration-300 ease-in-out"
            id="title"
            type="text"
            placeholder="Tulis judul blog Anda di sini..."
            value={form.title}
            onChange={handleInputChange}
            name="title"
            required
          />
        </div>
        <div>
          <label
            className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2"
            htmlFor="image"
          >
            Gambar (Opsional)
          </label>
          <input
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100"
            id="image"
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <div>
          <label
            className="block text-slate-700 dark:text-slate-300 text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg ... "
            id="description"
            rows="5"
            placeholder="Tulis konten blog Anda di sini..."
            value={form.description}
            onChange={handleInputChange}
            name="description"
            required
          ></textarea>
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
          Simpan
        </button>
      </form>
    </div>
  );
}

export default AddItem;
