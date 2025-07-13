import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const [newName, setNewName] = useState(user ? user.fullname : "");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    setSuccessMessage("");
  };

  const handleUpdate = () => {
    if (newName.trim() === "") {
      setSuccessMessage("Nama tidak boleh kosong");
      return;
    }

    dispatch(updateProfile({ fullname: newName }));
    setSuccessMessage("Profile berhasil diupdate");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-slate-200">
          Edit Profil
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fullname"
              className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullname"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 dark:text-slate-200 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              value={newName}
              onChange={handleNameChange}
              required
            />
          </div>
          {successMessage && (
            <p
              className={`text-center text-sm font-medium ${
                successMessage.includes("berhasil")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {successMessage}
            </p>
          )}
          <div>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300"
            >
              Update Profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
