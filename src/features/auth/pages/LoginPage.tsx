import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../api";
import { Link } from "@tanstack/react-router";

// Схема валідації
const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage(): JSX.Element {
	const loginMutation = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData): void => {
		loginMutation.mutate(data);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
			<div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
					Sign In
				</h2>

				{loginMutation.isError && (
					<div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
						Login failed. Please check your credentials.
					</div>
				)}

				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					{/* Email */}
					<div>
						<label
							className="block text-sm font-medium text-gray-700"
							htmlFor="email"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							{...register("email")}
							className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
							placeholder="admin@example.com"
						/>
						{errors.email && (
							<p className="text-red-500 text-xs mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password */}
					<div>
						<label
							className="block text-sm font-medium text-gray-700"
							htmlFor="password"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							{...register("password")}
							className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
							placeholder="••••••"
						/>
						{errors.password && (
							<p className="text-red-500 text-xs mt-1">
								{errors.password.message}
							</p>
						)}
					</div>

					<button
						className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
						disabled={loginMutation.isPending}
						type="submit"
					>
						{loginMutation.isPending ? "Signing in..." : "Sign In"}
					</button>
				</form>

				<div className="mt-4 text-center text-sm text-gray-600">
					<Link className="hover:underline" to="/">
						Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}
