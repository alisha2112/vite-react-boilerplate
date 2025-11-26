export interface Hotel {
	id: number;
	name: string;
	location: string;
	description: string;
	policy: string;
	stars: number;
}

export interface ApiResponse<T> {
	data: T;
	message?: string;
	status?: number;
}
