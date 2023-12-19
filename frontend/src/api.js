import axios from 'axios';

const API_PORT =
  process.env.NODE_ENV === "production"
  ? "/"
  : `https://tsmcool-3.azurewebsites.net/`
const instance = axios.create({
  baseURL: API_PORT,
});

export default instance;