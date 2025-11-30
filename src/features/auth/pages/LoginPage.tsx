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
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="mx-auto h-12 w-12 bg-gray-900 flex items-center justify-center rounded-sm shadow-lg">
					<span className="text-white font-serif font-bold text-xl">H</span>
				</div>
				<h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900 tracking-wide">
					Hotel
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Sign in to access the management panel
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow-xl sm:rounded-sm sm:px-10 border-t-4 border-gray-900">
					{loginMutation.isError && (
						<div className="mb-6 bg-gray-50 border-l-4 border-red-900 p-4">
							<div className="flex">
								<div className="flex-shrink-0">
									<svg
										className="h-5 w-5 text-red-900"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											clipRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											fillRule="evenodd"
										/>
									</svg>
								</div>
								<div className="ml-3">
									<p className="text-sm text-gray-700">
										Login failed. Please check your credentials.
									</p>
								</div>
							</div>
						</div>
					)}

					<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
						{/* Email */}
						<div>
							<label
								className="block text-xs font-semibold text-gray-500 uppercase tracking-wider"
								htmlFor="email"
							>
								Email Address
							</label>
							<div className="mt-1">
								<input
									autoComplete="email"
									id="email"
									type="email"
									{...register("email")}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-colors"
									placeholder="admin@example.com"
								/>
								{errors.email && (
									<p className="mt-2 text-xs text-red-600">
										{errors.email.message}
									</p>
								)}
							</div>
						</div>

						{/* Password */}
						<div>
							<label
								className="block text-xs font-semibold text-gray-500 uppercase tracking-wider"
								htmlFor="password"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									autoComplete="current-password"
									id="password"
									type="password"
									{...register("password")}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-colors"
									placeholder="••••••"
								/>
								{errors.password && (
									<p className="mt-2 text-xs text-red-600">
										{errors.password.message}
									</p>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<div>
							<button
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 transition-all uppercase tracking-widest"
								disabled={loginMutation.isPending}
								type="submit"
							>
								{loginMutation.isPending ? "Authenticating..." : "Sign In"}
							</button>
						</div>
					</form>

					{/* Footer Link */}
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or return to website
                </span>
							</div>
						</div>

						<div className="mt-6 text-center">
							<Link
								className="font-medium text-gray-600 hover:text-gray-900 text-sm transition-colors hover:underline decoration-gray-400 underline-offset-4"
								to="/"
							>
								Back to Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}