import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async () => {
  return await axios.get(API_URL);
};

export const createTask = async (task) => {
  return await axios.post(API_URL, task);
};

export const editTask = async (id, updatedTask) => {
  return await axios.put(`${API_URL}/${id}`, updatedTask);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
