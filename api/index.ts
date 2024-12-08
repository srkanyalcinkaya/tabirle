import axios from 'axios';

// setting up base URL
export const api = axios.create({ 
  // baseURL: "https://ruyaci.vercel.app/api/v1/"
  baseURL: "http://localhost:6060/api/v1/"
});