import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../../../store/slices/crudSlice";
import { useState, useEffect, useRef } from "react";

function Search() {
  const dispatch = useDispatch();
  const reduxSearchTerm = useSelector((state) => state.crud.searchTerm);

  const [inputValue, setInputValue] = useState(reduxSearchTerm);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isTyping) {
      setInputValue(reduxSearchTerm);
    }
  }, [reduxSearchTerm, isTyping]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (e.target.value !== reduxSearchTerm) {
        dispatch(setSearchTerm(e.target.value));
      }
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
        ref={inputRef}
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
