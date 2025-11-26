import axios, { type AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";

const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || "";

const apiClient = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error: Error | AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			useAuthStore.getState().logout();
		}
		return Promise.reject(error);
	}
);

export default apiClient;
