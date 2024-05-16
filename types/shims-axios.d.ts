import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        retry?: number
        retryCount?: number,
        tips?: boolean,
        loading?: boolean
    }
}
