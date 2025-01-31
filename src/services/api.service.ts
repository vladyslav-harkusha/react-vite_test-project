import axios from "axios";
import {ILoginData} from "../models/ILoginData.ts";
import {IAuthResponseWithTokens} from "../models/IAuthResponseWithTokens.ts";
import {urlEndpoints} from "../router/urlEndpoints.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const getAllEntities = async <T>(endpoint: string) => {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data as T;
};

export const getAuthData = async (loginData: ILoginData): Promise<IAuthResponseWithTokens> => {
    const response = await axiosInstance.post<IAuthResponseWithTokens>(urlEndpoints.auth, loginData);

    return response.data;
};