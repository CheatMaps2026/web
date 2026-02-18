import axios, {AxiosInstance, AxiosError} from "axios";

type options = {
    baseUrl: string
}

export class ApiClientService {
    private axios: AxiosInstance
    private readonly baseUrl: string

    constructor({baseUrl}: options) {
        this.baseUrl = baseUrl
        this.axios = axios.create({
            baseURL: baseUrl,
            timeout: 10000
        })
    }

    getBaseUrl() {
        return this.baseUrl
    }

    async get<T>(url: string, params?: unknown): Promise<T> {
        console.log("GET", url)
        try {
            const res = await this.axios.get<T>(url, {params})
            return res.data;
        } catch (error) {
            const normalizedError = normalizeError(error)
            console.warn("Network error", normalizedError)
            throw normalizedError
        }
    }

    async post<T>(url: string, body?: unknown): Promise<T> {
        console.log("POST", url)
        try {
            const res = await this.axios.post<T>(url, body)
            return res.data;
        } catch (error) {
            const normalizedError = normalizeError(error)
            console.error("Network error", normalizedError)
            throw normalizedError
        }
    }
}

export type NormalizedAxiosError = {
    status: number,
    message: string,
    details: unknown | null
}


function normalizeError(e: unknown): NormalizedAxiosError {
    if (e instanceof AxiosError) {
        console.log("code:", e.code)
        // console.log("message:", e.message)
        // console.log("config:", e.config)
        return {
            status: e.response?.status ?? 0,
            message: e.response?.data?.message ?? e.message,
            details: e.response?.data
        }
    }
    return {status: 0, message: "Unknown error", details: e};
}