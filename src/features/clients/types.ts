export interface Client {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string; // Змінили з phoneNumber на phone (якщо бекенд віддає phone)
	address: string;
}

export interface ApiResponse<T> {
	data: T;
	message?: string;
	status?: number;
}