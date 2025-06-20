import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import news from "../assets/news.svg";
import { useSelector } from "react-redux";
import { setCategory } from "../features/paging/categorySlice";
import { setUser } from "../features/user/userSlice";
import axios from "axios"
function Navbar() {
  const username = useSelector((state) => state.username.value);
  const navigate = useNavigate(); // Add this
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const [auth, setAuth] = useState(false);
  const [logout,setLogout]=useState(false);
const [name ,setName]=useState("");
  const handleCategoryClick = (category) => {
    dispatch(setCategory(category)); // Update Redux store
    navigate(`/news/${category.toLowerCase()}`); // Update URL
    setMobile(!mobile);
  };


    // Redirect to login page or home page
    
 const handleLogout = async () => {
  try {
    await axios.post(
       `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    
    // Clear all states
    dispatch(setUser(''));
    setLogout(false);
    setName('');
    setAuth(false);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};


useEffect(()=>{
  const getUser=async()=>{
const user=await axios.get(`${import.meta.env.VITE_API_URL}/api/user`,{
    withCredentials: true
});
setName(user.data.user);
  }
  getUser();
  setAuth(false)
},[username]);






  return (
    <div className="bg-red-900 text-white border-b-amber-50 w-screen fixed top-0">
      <nav className=" p-5 flex justify-between items-center">
        <img className="w-5 lg:w-8" src={news} />
        <ul
          className={`${
            mobile ? "block" : "hidden"
          } text-2xl z-50 absolute bg-black lg:bg-transparent flex flex-col top-15 h-screen lg:h-full left-0 w-full lg:w-auto items-center lg:static lg:flex lg:flex-row lg:justify-center lg:gap-1 gap-2`}
        >
          <li
            onClick={() => handleCategoryClick("")}
            className="border-b  w-full text-center  border-white pb-2 lg:border-none lg:hover:bg-gray-700 lg:px-3 lg:py-1 rounded cursor-pointer"
          >
            All
          </li>
          <li
            onClick={() => handleCategoryClick("Technology")}
            className=" border-b  w-full text-center  border-white pb-2 lg:border-none lg:hover:bg-gray-700 lg:px-3 lg:py-1 rounded cursor-pointer"
          >
            Technology
          </li>
          <li
            onClick={() => handleCategoryClick("Business")}
            className="border-b  w-full text-center  border-white pb-2 lg:border-none lg:hover:bg-gray-700 lg:px-3 lg:py-1 rounded cursor-pointer"
          >
            Business
          </li>
          <li
            onClick={() => handleCategoryClick("Sports")}
            className="border-b  w-full text-center  border-white pb-2 lg:border-none lg:hover:bg-gray-700 lg:px-3 lg:py-1 rounded cursor-pointer"
          >
            Sports
          </li>
          <li
            onClick={() => handleCategoryClick("Health")}
            className="border-b  w-full text-center  border-white pb-2 lg:border-none lg:hover:bg-gray-700 lg:px-3 lg:py-1 rounded cursor-pointer"
          >
            Health
          </li>
          <li
            onClick={() => handleCategoryClick("Science")}
            className="border-b  w-full text-center  border-white pb-2 lg:border-none lg:hover:bg-gray-700 lg:px-3 lg:py-1 rounded cursor-pointer"
          >
            Science
          </li>
          <li
            onClick={() => handleCategoryClick("Entertainment")}
            className="border-b  w-full text-center  border-white pb-2 lg:border-none lg:hover:bg-gray-700 lg:px-3 lg:py-1 rounded cursor-pointer"
          >
            Entertainment
          </li>
          <li
            onClick={() => handleCategoryClick("Politics")}
            className="border-b  w-full text-center  border-white pb-2 lg:border-none lg:hover:bg-gray-700 lg:px-3 lg:py-1 rounded cursor-pointer"
          >
            Politics
          </li>
        </ul>
        <p onClick={handleLogout} className={`${logout?'block':'hidden'} bg-orange-400 cursor-pointer text-white px-4 py-2 absolute right-20 rounded`}>Logout</p>
        {name ? (
          <div onClick={()=>setLogout(!logout)} className=" cursor-pointer flex items-center gap-2 lg:mr-4 absolute lg:static right-12">
            <div
              className="
        w-5 h-5 lg:w-7 lg:h-7
        rounded-full 
        bg-white 
        flex items-center justify-center 
        text-black font-bold lg:text-lg
        text:sm
        shadow-md
        hover:bg-blue-600 transition-colors
      "
            >
              {" "}
              {name.charAt(0)}
            </div>
          </div>
        ) : (
          <div className={`${auth ? "flex" : "hidden"} 
      lg:flex items-center gap-2 absolute lg:static lg:mr-5 right-4 top-16 lg:top-0 bg-black lg:bg-transparent p-2 lg:p-0 rounded-lg`}>
    <button
      onClick={() => navigate("/signup")}
      className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600 text-xl"
    >
      Register
    </button>
             <button
      onClick={() => navigate("/login")}
      className="bg-white text-xl text-red-900 px-2 py-1 rounded hover:bg-gray-100"
    >
      Login
    </button>
  </div>
)}
        <div className="flex gap-2 lg:hidden">
          <CgProfile
            onClick={() => setAuth(!auth)}
            className={`${name ? "hidden" : "block"} lg:hidden text-2xl`}
          />
          <GiHamburgerMenu onClick={() => setMobile(!mobile)} className="text-2xl" />
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
