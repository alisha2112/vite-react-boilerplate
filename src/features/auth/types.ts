export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
}

export interface AuthApiResponse<T> {
	data: T;
	message?: string;
	status?: number;
}
