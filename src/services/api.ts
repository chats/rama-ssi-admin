import { Agent } from "@/types/agent.types";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiService {
    private api: AxiosInstance;

    constructor(agent: Agent) {
 
        this.api = axios.create({
            baseURL: agent.apiUrl,
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": agent.apiKey,
            },
            signal: AbortSignal.timeout(5000),
        });
    }

    get(url: string, config?: AxiosRequestConfig) {
        return this.api.get(url, config);
    }

    post(url: string, data: unknown, config?: AxiosRequestConfig) {
        return this.api.post(url, data, config);
    }

    put(url: string, data: unknown, config?: AxiosRequestConfig) {
        return this.api.put(url, data, config);
    }
    
    delete(url: string, config?: AxiosRequestConfig) {
        return this.api.delete(url, config);
    }
    
}

export { ApiService }