import {
	useQuery,
	useMutation,
	useQueryClient,
	type UseQueryResult,
	type UseMutationResult,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "../../lib/axios";
import type { Hotel, ApiResponse } from "./types";

const getHotels = async (): Promise<Array<Hotel>> => {
	const response = await apiClient.get<ApiResponse<Array<Hotel>>>("/hotels");
	return response.data.data;
};

const getHotelById = async (id: string | number): Promise<Hotel> => {
	const response = await apiClient.get<ApiResponse<Hotel>>(`/hotels/${id}`);
	return response.data.data;
};

const createHotel = async (newHotel: Omit<Hotel, "id">): Promise<Hotel> => {
	const response = await apiClient.post<ApiResponse<Hotel>>(
		"/hotels",
		newHotel
	);
	return response.data.data;
};

const updateHotel = async ({
	id,
	data,
}: {
	id: string | number;
	data: Partial<Hotel>;
}): Promise<Hotel> => {
	const response = await apiClient.patch<ApiResponse<Hotel>>(
		`/hotels/${id}`,
		data
	);
	return response.data.data;
};

const deleteHotel = async (id: string | number): Promise<void> => {
	await apiClient.delete<ApiResponse<void>>(`/hotels/${id}`);
};

export const useHotels = (): UseQueryResult<Array<Hotel>, Error> =>
	useQuery<Array<Hotel>, Error>({
		queryKey: ["hotels"],
		queryFn: getHotels,
	});

export const useHotel = (id: string): UseQueryResult<Hotel, Error> =>
	useQuery<Hotel, Error>({
		queryKey: ["hotels", id],
		queryFn: () => getHotelById(id),
		enabled: !!id,
	});

export const useCreateHotel = (): UseMutationResult<
	Hotel,
	Error,
	Omit<Hotel, "id">,
	unknown
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createHotel,
		onSuccess: () => {
			// Використовуємо void, щоб задовольнити правило no-floating-promises
			void queryClient.invalidateQueries({ queryKey: ["hotels"] });
			void navigate({ to: "/hotels" });
		},
	});
};

export const useUpdateHotel = (): UseMutationResult<
	Hotel,
	Error,
	{ id: string | number; data: Partial<Hotel> },
	unknown
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: updateHotel,
		onSuccess: (updatedHotel) => {
			void queryClient.invalidateQueries({ queryKey: ["hotels"] });
			queryClient.setQueryData(["hotels", updatedHotel.id], updatedHotel);
			void navigate({ to: "/hotels" });
		},
	});
};

export const useDeleteHotel = (): UseMutationResult<
	void,
	Error,
	string | number,
	unknown
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteHotel,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["hotels"] });
		},
	});
};
