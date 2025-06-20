import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function ArticleDetail() {
     const article=useSelector((state)=>state.article.value)
     const {id}=useParams();

console.log(article)
   
  return (
    <div className="bg-white  my-30 overflow-hidden max-w-md mx-auto">
      <img
        src={article[id].image}
        alt={article[id].title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full mb-2">
          {article[id].category}
        </span>
        <h3 className="text-lg font-semibold text-gray-800">{article[id].title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{article[id].content}</p>
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>By {article[id].author}</span>
          <span>{article[id].formattedDate}</span>
        </div>
      </div>
      <button className='mx-auto my-5'>Read More...</button>
    </div>
  )
}

export default ArticleDetail
