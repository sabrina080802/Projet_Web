export const API_URL = 'https://projet-web-3xcx.onrender.com:4000/api';

export interface ApiResponse<T> {
    success: boolean,
    error: string,
    data: T
}