import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5500" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Authentication APIs
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const fetchProtected = () => API.get("/protected");
export const resetPassword = (data) => API.post("/auth/reset-password", data);
export const requestPasswordReset = (data) => API.post("/auth/request-password-reset", data);

// Client Manager APIs
export const addClient = (data) => API.post("/api/add", data);
export const getClients = () => API.get("/api/get");
export const getClientById = (id) => API.get(`/api/${id}`);
export const updateClient = (id, data) => API.put(`/api/update/${id}`, data);
export const deleteClient = (id) => API.delete(`/api/delete/${id}`);

// Project Manager APIs
export const addProject = (data) => API.post("/api/projects", data);
export const getProjects = () => API.get("/api/projects");
export const getProjectById = (id) => API.get(`/api/projects/${id}`);
export const updateProject = (id, data) => API.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/api/projects/${id}`);
