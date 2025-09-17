<<<<<<< HEAD
import axios from "axios";
 
const api = axios.create({
  baseURL: "http://localhost:8080", // backend
});
 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
=======
/*import axios from "axios";
 
const api = axios.create({
  baseURL: "http://localhost:3000", // আপনার backend URL
});
 
// JWT Interceptor
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
 
export default api;*/

import axios from "axios";
 
// 🔹 এখানে backend এর URL বসান
// যদি NestJS backend port 3000 এ চলে:
const api = axios.create({
  baseURL: "http://localhost:8080", // <-- আপনার backend URL
});
 
// ✅ Request এ token থাকলে পাঠাবে
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
>>>>>>> f30c23ed12ebe6dac7180569303d24026584a117
  return config;
});
 
export default api;