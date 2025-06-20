import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IncrementPge, DecrementPage } from "../features/paging/pageSlice";

function Pagination(prop) {
  const page = useSelector((state) => state.paging.value);
  const dispatch = useDispatch();

  return (
    <div className="flex w-screen justify-center items-center my-9 gap-4">
      <button
        onClick={() => dispatch(DecrementPage())}
        disabled={page === 1}
        className={`bg-orange-600 text-white rounded px-3 ${
          page === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Pre
      </button>
      <h2>
        {page} of {prop.totalPage}
      </h2>
      <button
        onClick={() => dispatch(IncrementPge())}
        disabled={page === prop.totalPage}
        className={`bg-orange-600 text-white rounded px-3 ${
          page === prop.totalPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
