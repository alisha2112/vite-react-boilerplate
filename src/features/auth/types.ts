export interface LoginRequest {
	email: string; // Або username, залежно від вашого бекенду
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
