import axios from "axios";
import {IUsersResponse} from "../models/IUsersResponse.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const getAllEntities = async <T>(endpoint: string) => {
    const response = await axiosInstance.get<IUsersResponse>(endpoint);
    return response.data as T;
};