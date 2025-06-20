import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ArticleDetail from "./components/ArticleDetail";
import Article from "./pages/Article";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/news" replace />} />
          <Route path="/news" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/news/:category" element={<Home />} />
          <Route path="/articles/:id" element={<Article/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
