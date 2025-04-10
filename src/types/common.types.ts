export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface BasicComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}
