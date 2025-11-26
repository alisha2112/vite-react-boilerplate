import {
	useQuery,
	useMutation,
	useQueryClient,
	type UseQueryResult,
	type UseMutationResult,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "../../lib/axios";
import type { Hotel } from "./types";

const getHotels = async (): Promise<Array<Hotel>> => {
	const response = await apiClient.get<Array<Hotel>>("/hotels");
	return response.data;
};

const getHotelById = async (id: string | number): Promise<Hotel> => {
	const response = await apiClient.get<Hotel>(`/hotels/${id}`);
	return response.data;
};

const createHotel = async (newHotel: Omit<Hotel, "id">): Promise<Hotel> => {
	const response = await apiClient.post<Hotel>("/hotels", newHotel);
	return response.data;
};

const updateHotel = async ({
	id,
	data,
}: {
	id: string | number;
	data: Partial<Hotel>;
}): Promise<Hotel> => {
	const response = await apiClient.patch<Hotel>(`/hotels/${id}`, data);
	return response.data;
};

const deleteHotel = async (id: string | number): Promise<void> => {
	await apiClient.delete(`/hotels/${id}`);
};

export const useHotels = (): UseQueryResult<Array<Hotel>, Error> => {
	return useQuery({
		queryKey: ["hotels"],
		queryFn: getHotels,
	});
};

export const useHotel = (id: string): UseQueryResult<Hotel, Error> => {
	return useQuery({
		queryKey: ["hotels", id],
		queryFn: () => getHotelById(id),
		enabled: !!id,
	});
};

export const useCreateHotel = (): UseMutationResult<
	Hotel,
	Error,
	Omit<Hotel, "id">
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createHotel,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["hotels"] });
			await navigate({ to: "/hotels" });
		},
	});
};

export const useUpdateHotel = (): UseMutationResult<
	Hotel,
	Error,
	{ id: string | number; data: Partial<Hotel> }
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: updateHotel,
		onSuccess: async (updatedHotel) => {
			await queryClient.invalidateQueries({ queryKey: ["hotels"] });
			queryClient.setQueryData(["hotels", updatedHotel.id], updatedHotel);
			await navigate({ to: "/hotels" });
		},
	});
};

export const useDeleteHotel = (): UseMutationResult<
	void,
	Error,
	string | number
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteHotel,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["hotels"] });
		},
	});
};
