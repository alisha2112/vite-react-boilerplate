import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateClient } from "../api";
import { Link } from "@tanstack/react-router";

const clientSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	middleName: z.string().min(1, "Middle name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().min(1, "Phone is required"),
});

type ClientFormData = z.infer<typeof clientSchema>;

export function ClientCreatePage(): JSX.Element {
	const createClientMutation = useCreateClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ClientFormData>({
		resolver: zodResolver(clientSchema),
	});

	const onSubmit = (data: ClientFormData): void => {
		createClientMutation.mutate(data);
	};

	return (
		<div className="p-6 sm:p-8 max-w-4xl mx-auto font-sans">
			<div className="mb-6">
				<Link
					className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors flex items-center gap-1 group"
					to="/clients"
				>
					<svg
						className="w-4 h-4 transition-transform group-hover:-translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M15 19l-7-7 7-7"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
					Back to Clients
				</Link>
			</div>

			<div className="mb-8 border-b border-gray-200 pb-6">
				<h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
					New Client
				</h1>
				<p className="text-gray-500 text-sm mt-1">
					Add a new guest to the database
				</p>
			</div>

			<form
				className="bg-white shadow-sm border border-gray-200 rounded-sm p-6 sm:p-8 space-y-8"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* First Name */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							First Name
						</label>
						<input
							{...register("firstName")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
							placeholder="Ivan"
						/>
						{errors.firstName && (
							<p className="text-red-600 text-xs mt-1">
								{errors.firstName.message}
							</p>
						)}
					</div>

					{/* Middle Name (НОВЕ ПОЛЕ) */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							Middle Name
						</label>
						<input
							{...register("middleName")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
							placeholder="Ivanovich"
						/>
						{errors.middleName && (
							<p className="text-red-600 text-xs mt-1">
								{errors.middleName.message}
							</p>
						)}
					</div>

					{/* Last Name */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							Last Name
						</label>
						<input
							{...register("lastName")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
							placeholder="Petrov"
						/>
						{errors.lastName && (
							<p className="text-red-600 text-xs mt-1">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Email */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							Email
						</label>
						<input
							{...register("email")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
							placeholder="ivan@example.com"
							type="email"
						/>
						{errors.email && (
							<p className="text-red-600 text-xs mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Phone */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							Phone
						</label>
						<input
							{...register("phone")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
							placeholder="+380..."
						/>
						{errors.phone && (
							<p className="text-red-600 text-xs mt-1">
								{errors.phone.message}
							</p>
						)}
					</div>
				</div>

				<div className="pt-6 flex justify-end gap-4 border-t border-gray-200">
					<Link
						className="px-6 py-3 border border-gray-300 shadow-sm text-xs font-bold text-gray-700 uppercase tracking-widest rounded-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
						to="/clients"
					>
						Cancel
					</Link>
					<button
						className="px-6 py-3 bg-green-600 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-green-700 shadow-sm disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
						disabled={createClientMutation.isPending}
						type="submit"
					>
						{createClientMutation.isPending ? "Creating..." : "Create Client"}
					</button>
				</div>
			</form>
		</div>
	);
}