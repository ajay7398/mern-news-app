import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoute from './routes/user.js';
import connectDB from "./config/DB.js";

dotenv.config();
const app = express();

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
// ✅ CORS Setup for Netlify + Render
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://radiant-unicorn-d21754.netlify.app'
  ],
  credentials: true
}));



// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoute);

// ✅ News Route
app.get("/news", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const category = req.query.category;
  const searchValue = req.query.search;

  const filePath = path.join(__dirname, "assets", "data.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const allNews = JSON.parse(data);

  let filteredNews = allNews;

  if (category) {
    filteredNews = allNews.filter(item => item.category === category);
  }

  if (searchValue) {
    filteredNews = filteredNews.filter(article =>
      article.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  const totalLength = filteredNews.length;
  const totalPage = Math.ceil(totalLength / pageSize);
  const startIndex = (page - 1) * pageSize;
  const lastIndex = startIndex + pageSize;
  const paginatedNews = filteredNews.slice(startIndex, lastIndex);

  res.json({ data: paginatedNews, totalPage });
});

// ✅ Connect to DB and Start Server
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`🚀 API running at port ${process.env.PORT}`);
});
