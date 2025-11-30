import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateClient } from "../api";
import { Link } from "@tanstack/react-router";

const clientSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email"),
	phoneNumber: z.string().min(1, "Phone is required"),
	address: z.string().optional(),
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
		createClientMutation.mutate({
			...data,
			address: data.address || "",
		});
	};

	return (
		<div className="p-6 sm:p-8 max-w-4xl mx-auto font-sans">
			<div className="mb-6">
				<Link className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors" to="/clients">
					&larr; Back to Clients
				</Link>
			</div>

			<div className="mb-8 border-b border-gray-200 pb-6">
				<h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">New Client</h1>
			</div>

			<form className="bg-white shadow-sm border border-gray-200 rounded-sm p-6 sm:p-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
						<input {...register("firstName")} className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
						{errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>}
					</div>
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
						<input {...register("lastName")} className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
						{errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>}
					</div>
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
						<input {...register("email")} className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm" type="email" />
						{errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
					</div>
					<div>
						<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
						<input {...register("phoneNumber")} className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
						{errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber.message}</p>}
					</div>
				</div>

				<div>
					<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Address</label>
					<input {...register("address")} className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm" />
				</div>

				<div className="pt-6 flex justify-end gap-4 border-t border-gray-200">
					<Link className="px-6 py-3 border border-gray-300 shadow-sm text-xs font-bold text-gray-700 uppercase tracking-widest rounded-sm hover:bg-gray-50" to="/clients">Cancel</Link>
					<button className="px-6 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-black shadow-sm disabled:opacity-50" disabled={createClientMutation.isPending} type="submit">
						{createClientMutation.isPending ? "Creating..." : "Create Client"}
					</button>
				</div>
			</form>
		</div>
	);
}