import axios from "axios"
import { Test } from "../interfaces/tests";

export const getAllTestSeries = async () => {
    return await axios.get(`${import.meta.env.VITE_API_URL}testSeries`);
}

export const createTestSeries = async (data: Test) => {
    return await axios.post(`${import.meta.env.VITE_API_URL}testSeries`, data);
}

export const updateTestSeries = async (id: number, data: Test) => {
    if (!id) { console.warn("Id is missing at updateTest "); return; }
    return await axios.put(`${import.meta.env.VITE_API_URL}testSeries/${id}`, data);
}

export const deleteTestSeries = async (id: number) => {
    return await axios.delete(`${import.meta.env.VITE_API_URL}testSeries/${id}`);
}

export const getSingleTestSeries = async (id: number) => {
    return await axios.get(`${import.meta.env.VITE_API_URL}testSeries/${id}`);
}

// export default { getAllTests }