import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  function handleSearch() {
    navigate(`/reports?title=${search}`);
    setSearch("");
  }
  return (
    <div className="flex items-center gap-2 border border-[#fe9a14] rounded-[18px] px-3 py-2 focus-within:border-[#f5f5f5] transition duration-500">
      <button onClick={handleSearch}>
        <CiSearch />
      </button>
      <input
        type="text"
        placeholder="Search lost items"
        value={search}
        className="w-37.5 lg:w-47.5"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
