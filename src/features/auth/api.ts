import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import apiClient from "../../lib/axios";
import { useAuthStore } from "../../store/authStore";
import type { LoginRequest, AuthApiResponse } from "./types";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
	id: number;
	email: string;
	role: string;
	exp: number;
}

const login = async (credentials: LoginRequest): Promise<string> => {
	const response = await apiClient.post<AuthApiResponse<string>>(
		"/auth/login",
		credentials
	);
	const tokenWithBearer = response.data.data;
	return tokenWithBearer.replace("Bearer ", "");
};

export const useLogin = (): UseMutationResult<
	string,
	Error,
	LoginRequest,
	unknown
> => {
	const loginAction = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	return useMutation({
		mutationFn: login,
		onSuccess: (token) => {
			try {
				// 1. Декодуємо токен
				const decoded = jwtDecode<JwtPayload>(token);
				const userRole = decoded.role;

				console.log("User Role:", userRole);

				loginAction(token, userRole);

				if (userRole === "ADMINISTRATOR") {
					void navigate({ to: "/hotels" });
				} else {
					void navigate({ to: "/" });
				}
			} catch (error) {
				console.error("Failed to decode token:", error);
				void navigate({ to: "/" });
			}
		},
		onError: (error) => {
			console.error("Login failed:", error);
		},
	});
};
