import axios from "axios"
import { Test } from "../interfaces/tests";

export const getAllQuestions = async (testId:number) => {
    return await axios.get(`${import.meta.env.VITE_API_URL}gettest/question/${testId}`);
}

export const createQuestion = async (data: Test) => {
    return await axios.post(`${import.meta.env.VITE_API_URL}test/question`, data);
}

// export const updateQuestion = async (id: number, data: Test) => {
//     if (!id) { console.warn("Id is missing at updateTest "); return; }
//     return await axios.put(`${import.meta.env.VITE_API_URL}test/${id}`, data);
// }

export const deleteQuestion = async (id: number) => {
    return await axios.delete(`${import.meta.env.VITE_API_URL}gettest/question/${id}`);
}

// export const getSingleQuestion = async (id: number) => {
//     return await axios.get(`${import.meta.env.VITE_API_URL}test/${id}`);
// }

// export default { getAllTests }