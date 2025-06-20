import express from "express";
import dotenv from 'dotenv'
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoute from './routes/user.js'
import connectDB from "./config/DB.js";
const app = express();
dotenv.config();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api",userRoute);

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/news", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const category = req.query.category;
  const searchValue = req.query.search;

  const filePath = path.join(__dirname, "assets", "data.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const allNews = JSON.parse(data);

  // Filter by category if provided
  let filteredNews = allNews;

  if (category) {
    filteredNews = allNews.filter((item) => item.category === category);
  }

  if (searchValue) {
    filteredNews = filteredNews.filter(
      (article) => article.title.toLowerCase().includes(searchValue)
      // || article.content.toLowerCase().includes(searchValue)
    );
  }

  const totalLength = filteredNews.length;
  const totalPage = Math.ceil(totalLength / pageSize);
  const startIndex = (page - 1) * pageSize;
  const lastIndex = startIndex + pageSize;

  const paginatedNews = filteredNews.slice(startIndex, lastIndex);

  res.json({ data: paginatedNews, totalPage });
});


connectDB();

app.listen(process.env.PORT, () => {
  console.log("API running at port",process.env.PORT);
});
