import axios from "axios";
const { NEXT_PUBLIC_SERVER_BASE_URL_DEV } = process.env;
export const baseURL =
  NEXT_PUBLIC_SERVER_BASE_URL_DEV || "http://localhost:8080";

const myApi = axios.create({
  baseURL,
  withCredentials: true, // Include cookies if needed
  headers: {
    "Content-Type": "application/json", // Optional, set default headers
  },
});

export default myApi;
