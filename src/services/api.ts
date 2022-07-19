import axios from "axios";

export const booksAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});
