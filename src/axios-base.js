import axios from "axios";

const instance = axios.create({
  baseURL: "https://freeestoreapi.herokuapp.com/",
});

export default instance;
