import { useEffect, type JSX } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClient, useUpdateClient } from "../api";

const clientSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email"),
	phoneNumber: z.string().min(1, "Phone is required"),
	address: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

export function ClientEditPage(): JSX.Element {
	const { clientId } = useParams({ from: "/clients/$clientId" });

	const { data: client, isLoading, isError } = useClient(clientId);
	const updateClientMutation = useUpdateClient();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ClientFormData>({
		resolver: zodResolver(clientSchema),
	});

	useEffect(() => {
		if (client) {
			reset({
				firstName: client.firstName,
				lastName: client.lastName,
				email: client.email,
				phoneNumber: client.phone, // Зверни увагу: тут phone, бо ми змінили це в типах на минулому кроці
				address: client.address || "",
			});
		}
	}, [client, reset]);

	const onSubmit = (data: ClientFormData): void => {
		updateClientMutation.mutate({ id: clientId, data });
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64 text-gray-400 font-light tracking-wide uppercase text-sm">
				Loading client details...
			</div>
		);
	}

	if (isError || !client) {
		return (
			<div className="p-6 text-center">
				<div className="bg-red-50 border-l-4 border-red-900 p-4 inline-block text-left">
					<p className="text-red-800">Client not found or error loading data.</p>
				</div>
				<div className="mt-4">
					<Link className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4" to="/clients">
						Return to list
					</Link>
				</div>
			</div>
		);
	}

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
					Edit Client
				</h1>
				<p className="text-gray-500 text-sm mt-1">
					Editing <span className="font-semibold text-gray-700">{client.firstName} {client.lastName}</span>
				</p>
			</div>

			<form
				className="bg-white shadow-sm border border-gray-200 rounded-sm p-6 sm:p-8 space-y-8"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* First Name */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							First Name
						</label>
						<input
							{...register("firstName")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
						/>
						{errors.firstName && (
							<p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>
						)}
					</div>

					{/* Last Name */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							Last Name
						</label>
						<input
							{...register("lastName")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
						/>
						{errors.lastName && (
							<p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>
						)}
					</div>

					{/* Email */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							Email
						</label>
						<input
							{...register("email")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
							type="email"
						/>
						{errors.email && (
							<p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
						)}
					</div>

					{/* Phone */}
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
							Phone
						</label>
						<input
							{...register("phoneNumber")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
						/>
						{errors.phoneNumber && (
							<p className="text-red-600 text-xs mt-1">{errors.phoneNumber.message}</p>
						)}
					</div>
				</div>

				{/* Address */}
				<div>
					<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
						Address
					</label>
					<input
						{...register("address")}
						className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
					/>
				</div>

				{/* Buttons */}
				<div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-200">
					<Link
						className="px-6 py-3 border border-gray-300 shadow-sm text-xs font-bold text-gray-700 uppercase tracking-widest rounded-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
						to="/clients"
					>
						Cancel
					</Link>
					<button
						className="px-6 py-3 border border-transparent shadow-sm text-xs font-bold text-white uppercase tracking-widest bg-gray-900 rounded-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						disabled={updateClientMutation.isPending}
						type="submit"
					>
						{updateClientMutation.isPending ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</form>
		</div>
	);
}