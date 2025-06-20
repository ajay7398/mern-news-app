import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar.jsx";
import { fetchTopHeadlines } from "../api/newsApi";
import NewsCard from "../components/NewsCard.jsx";
import Pagination from "../components/Pagination.jsx";
import { useDispatch, useSelector } from 'react-redux';
import Footer from "../components/Footer.jsx";
import { setArticles } from "../features/articles/articleSlice.js";
function Home() {
  const dispatch=useDispatch();
    const page=useSelector((state)=>state.paging.value)
    const search=useSelector((state)=>state.search.value)
    const category=useSelector((state)=>state.category.value);
  const [newsData, setNewsData] = useState([]);
  const [newsTYpe, setNewsType] = useState("");
const [totalPage,setTotalPage]=useState(null);
  useEffect(() => {
    
    const getNews = async () => {
      try {
        const result = await fetchTopHeadlines(page,category,search);
    
        setNewsData(result.data.data); // set the news data to state
        dispatch(setArticles(result.data.data))
        setTotalPage(result.data.totalPage);
        
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getNews();
  },[page,category,search]);

  return (
    <div>
      <Navbar />
      <SearchBar />
      {/* You can use newsData here to show articles */}
      <div className=" z-10 grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-5 mx-1 lg:mx-20 my-5">
        {newsData.map((article, index) => (
          <NewsCard
            key={index}
            id={index}
            title={article.title}
            content={article.content}
            author={article.author}
            published_at={article.published_at}
            category={article.category}
            image={article.image}
          />
        ))}
      </div>
      <Pagination totalPage={totalPage}/>
      <Footer/>
    </div>
  );
}

export default Home;
