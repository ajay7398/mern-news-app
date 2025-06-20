import React from 'react';
import { Link } from 'react-router-dom';
const NewsCard = ({id, title, content, author, published_at, category, image }) => {

 
  const formattedDate = new Date(published_at).toLocaleDateString();
  return (
    <Link to={`/articles/${id}`}>
    <div className="hover:ring hover:ring-amber-300 bg-white rounded-2xl shadow-md overflow-hidden max-w-md mx-auto">
     
       <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
     
      <div className="p-4">
        <span className="inline-block bg-orange-400 text-white text-xs px-3 py-1 rounded-full mb-2">
          {category}
        </span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
       
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>By {author}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default NewsCard
