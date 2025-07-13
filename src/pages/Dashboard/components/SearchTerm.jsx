import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const reduxSearchTerm = useSelector((state) => state.crud.searchTerm);

  const [inputValue, setInputValue] = useState(reduxSearchTerm);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    setInputValue(reduxSearchTerm);
  }, [reduxSearchTerm]);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setInputValue(newSearchTerm);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const searchParams = new URLSearchParams(location.search);

      searchParams.set("page", "1");

      if (newSearchTerm.trim()) {
        searchParams.set("search", newSearchTerm.trim());
      } else {
        searchParams.delete("search");
      }

      navigate(`?${searchParams.toString()}`, { replace: true });
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition duration-300 ease-in-out text-lg"
        placeholder="Cari item berdasarkan judul atau deskripsi..."
        aria-label="Search items"
      />
    </form>
  );
}

export default Search;
