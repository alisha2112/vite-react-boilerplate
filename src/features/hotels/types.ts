export interface Room {
	id: number;
	room_number: number;
	price_per_night: string;
	comfort_level: string;
}

export interface Employee {
	id: number;
	first_name: string;
	last_name: string;
	position: string;
}

export interface Service {
	service_id: number;
	service_name: string;
	service_price: string;
	service_description?: string;
}

export interface Booking {
	id: number;
	check_in_date: string;
	check_out_date: string;
	status: string;
}

export interface Hotel {
	id: number;
	name: string;
	location: string;
	description: string;
	policy: string;
	stars: number;
	rooms?: Array<Room>;
	employees?: Array<Employee>;
	services?: Array<Service>;
	bookings?: Array<Booking>;
}

export interface ApiResponse<T> {
	data: T;
	message?: string;
	status?: number;
}
