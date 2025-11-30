import {
	useQuery,
	useMutation,
	useQueryClient,
	type UseQueryResult,
	type UseMutationResult,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "../../lib/axios";
import type { Client, ApiResponse } from "./types";

// --- API Functions ---

const getClients = async (): Promise<Array<Client>> => {
	const response = await apiClient.get<ApiResponse<Array<Client>>>("/clients");
	return response.data.data;
};

const getClientById = async (id: string | number): Promise<Client> => {
	const response = await apiClient.get<ApiResponse<Client>>(`/clients/${id}`);
	return response.data.data;
};

const createClient = async (newClient: Omit<Client, "id">): Promise<Client> => {
	const response = await apiClient.post<ApiResponse<Client>>("/clients", newClient);
	return response.data.data;
};

const updateClient = async ({
															id,
															data,
														}: {
	id: string | number;
	data: Partial<Client>;
}): Promise<Client> => {
	const response = await apiClient.patch<ApiResponse<Client>>(`/clients/${id}`, data);
	return response.data.data;
};

const deleteClient = async (id: string | number): Promise<void> => {
	await apiClient.delete<ApiResponse<void>>(`/clients/${id}`);
};

// --- Hooks ---

export const useClients = (): UseQueryResult<Array<Client>, Error> =>
	useQuery<Array<Client>, Error>({
		queryKey: ["clients"],
		queryFn: getClients,
	});

export const useClient = (id: string): UseQueryResult<Client, Error> =>
	useQuery<Array<Client>, Error>({ // Note: queryKey depends on id
		queryKey: ["clients", id],
		queryFn: () => getClientById(id),
		enabled: !!id,
	});

export const useCreateClient = (): UseMutationResult<
	Client,
	Error,
	Omit<Client, "id">,
	unknown
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createClient,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["clients"] });
			void navigate({ to: "/clients" });
		},
	});
};

export const useUpdateClient = (): UseMutationResult<
	Client,
	Error,
	{ id: string | number; data: Partial<Client> },
	unknown
> => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: updateClient,
		onSuccess: (updatedClient) => {
			void queryClient.invalidateQueries({ queryKey: ["clients"] });
			queryClient.setQueryData(["clients", updatedClient.id], updatedClient);
			void navigate({ to: "/clients" });
		},
	});
};

export const useDeleteClient = (): UseMutationResult<
	void,
	Error,
	string | number,
	unknown
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteClient,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["clients"] });
		},
	});
};