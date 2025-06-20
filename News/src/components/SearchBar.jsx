import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setValue } from "../features/filtering/filterSlice";
function SearchBar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  return (
    <div className=" z-10 py-4 lg:py-8 mt-15 lg:mt-18 w-full flex justify-center bg-gradient-to-t from-red-200 to-red-50 ">
      <div className=" flex items-center gap-1 flex-col lg:flex-row lg:gap-0  lg:mx-2  lg:max-w-fit lg:rounded-[10px] overflow-hidden ">
        <input
          className=" outline-none w-60 bg-white rounded lg:rounded-s-[10px] px-2 py-1 text-[15px] lg:w-xs h-auto placeholder:text-gray-500 placeholder:italic "
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
        />
        <button
          onClick={() => dispatch(setValue(query))} 
          className="bg-orange-600 text-white  w-fit  px-2 h-full"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
