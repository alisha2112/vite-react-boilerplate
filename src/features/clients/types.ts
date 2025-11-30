// Оновлюємо Booking відповідно до Entity
export interface Booking {
	booking_id: number; // Було id, стало booking_id
	check_in: string;   // Було checkInDate, стало check_in
	check_out: string;  // Було checkOutDate, стало check_out
	guests_count: number;
	payment_method: string;
	status: string;
}

export interface Client {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	email: string;
	phone: string;
	address: string;
	isRegistered: boolean;
	bookings?: Array<Booking>;
}

export interface ApiResponse<T> {
	data: T;
	message?: string;
	status?: number;
}