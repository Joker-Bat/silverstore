import axios from "axios";

const instance = axios.create({
  baseURL: "https://free-e-store-api.onrender.com/",
});

export default instance;
