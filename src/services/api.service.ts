import axios from "axios";
import {ILoginData} from "../models/ILoginData.ts";
import {IAuthResponseWithTokens} from "../models/IAuthResponseWithTokens.ts";
import {urlEndpoints} from "../router/constans/urlEndpoints.ts";
import {IRefreshTokensPair} from "../models/IRefreshTokensPair.ts";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(requestObj => {
    if (requestObj.method?.toUpperCase() === 'GET') {
        requestObj.headers.Authorization = 'Bearer ' + localStorage.getItem('dummyAccessToken');
    }

    return requestObj;
});

axiosInstance.interceptors.response.use(respondeObj => {
    return respondeObj;
}, async (error) => {
    if (error.response.status === 401) {
        await refreshAuth();
    }

    return error;
});

export const getLoginData = async (loginData: ILoginData): Promise<IAuthResponseWithTokens> => {
    const { data: userWithTokens } = await axiosInstance.post<IAuthResponseWithTokens>(urlEndpoints.login, loginData);

    localStorage.setItem('dummyAccessToken', userWithTokens.accessToken);
    localStorage.setItem('dummyRefreshToken', userWithTokens.refreshToken);

    return userWithTokens;
};

export const refreshAuth = async (): Promise<IRefreshTokensPair> => {
    const { data: newTokens } = await axiosInstance.post<IRefreshTokensPair>(urlEndpoints.refresh, {
        refreshToken: localStorage.getItem('dummyRefreshToken'),
        expiresInMins: 30
    });

    localStorage.setItem('dummyAccessToken', newTokens.accessToken);
    localStorage.setItem('dummyRefreshToken', newTokens.refreshToken);

    return newTokens;
};

export type urlParamsType = {
    endpoint: string;
    search: string
    page: number;
    limit: number;
}

export const getEntitiesByUrlParams = async <T>(urlParams: urlParamsType) => {
    const { endpoint, search, page, limit } = urlParams;
    const skip = (page - 1) * limit;
    const response = await axiosInstance.get<T>(`${endpoint + search}?skip=${skip}&limit=${limit}`);
    return response.data as T;
};

export const getEntityById = async <T>(endpoint: string, id: string) => {
    const response = await axiosInstance.get<T>(`${endpoint}/${id}`);
    return response.data as T;
};


