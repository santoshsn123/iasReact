import axios from "axios"
import { Test } from "../interfaces/tests";

export const getAllTests = async () => {
    return await axios.get(`${import.meta.env.VITE_API_URL}test`);
}

export const createTest = async (data: Test) => {
    return await axios.post(`${import.meta.env.VITE_API_URL}test`, data);
}

export const updateTest = async (id: number, data: Test) => {
    if (!id) { console.warn("Id is missing at updateTest "); return; }
    return await axios.put(`${import.meta.env.VITE_API_URL}test/${id}`, data);
}

export const deleteTest = async (id: number) => {
    return await axios.delete(`${import.meta.env.VITE_API_URL}test/${id}`);
}

export const getSingleTest = async (id: number) => {
    return await axios.get(`${import.meta.env.VITE_API_URL}test/${id}`);
}

// export default { getAllTests }