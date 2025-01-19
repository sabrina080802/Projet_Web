export const API_URL = 'http://localhost:9534/api';

export interface ApiResponse<T> {
    success: boolean,
    error: string,
    data: T
}