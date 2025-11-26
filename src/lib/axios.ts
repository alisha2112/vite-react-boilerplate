import type { AxiosError } from "axios";
// eslint-disable-next-line no-duplicate-imports
import axios from "axios";

// Створення окремого інстансу Axios
const apiClient = axios.create({
	baseURL: import.meta.env["VITE_API_BASE_URL"] as string,
	headers: {
		"Content-Type": "application/json",
	},
});

// Якщо токен доступний у змінній середовища -- додаємо в Authorization
const token = import.meta.env["VITE_API_AUTH_TOKEN"] as string;
if (token) {
	apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Інтерцептор для відповіді (обробка помилок)
apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		// Тут можна додати глобальну обробку помилок
		const errorData = error.response?.data || error.message;
		console.error("API Error:", errorData);

		return Promise.reject(error);
	}
);

export default apiClient;
