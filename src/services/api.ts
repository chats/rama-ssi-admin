import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError, ApiResponse, PaginatedResponse } from '@/types/common.types';

class ApiService {
  private api: AxiosInstance;

  constructor(
    baseURL: string,
    apiKey?: string,
) {
    // Create axios instance
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
    });

    // Set up request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (apiKey) {
            config.headers['x-api-key'] = apiKey;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Set up response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login page if unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Generic request handler
  private async request<T>(
    method: string, 
    url: string, 
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.api.request<T>({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      
      const errorData: ApiError = {
        success: false,
        message: axiosError.response?.data?.message || 'An error occurred',
        errors: axiosError.response?.data?.errors,
        status: axiosError.response?.status,
      };
      
      throw errorData;
    }
  }

  // API methods
  get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>('GET', url, undefined, config);
  }

  getPaginated<T>(url: string, config?: AxiosRequestConfig): Promise<PaginatedResponse<T>> {
    return this.request<PaginatedResponse<T>>('GET', url, undefined, config);
  }

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>('POST', url, data, config);
  }

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>('PUT', url, data, config);
  }

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>('PATCH', url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<ApiResponse<T>>('DELETE', url, undefined, config);
  }

  // Special method for file uploads
  upload<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const uploadConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    };
    return this.request<ApiResponse<T>>('POST', url, formData, uploadConfig);
  }
}

export { ApiService };