import axios from "axios";

export const fetchTopHeadlines = async (page, category = "All", search) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/news`, {
    params: {
      page,
      pageSize: 20,
      category,
      search,
    },
  });
  return response;
};
