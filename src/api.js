import axios from 'axios';

const API_PORT =
  process.env.NODE_ENV === "production"
  ? "/"
  : `http://localhost:8888/`
const instance = axios.create({
  baseURL: API_PORT,
});

export default instance;