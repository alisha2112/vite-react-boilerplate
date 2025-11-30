import { useEffect, type JSX } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useClient, useUpdateClient } from "../api";

const clientSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	middleName: z.string().min(1, "Middle name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().min(1, "Phone is required"),
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
				middleName: client.middleName || "",
				lastName: client.lastName,
				email: client.email,
				phone: client.phone,
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
					<p className="text-red-800">
						Client not found or error loading data.
					</p>
				</div>
				<div className="mt-4">
					<Link
						className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
						to="/clients"
					>
						Return to list
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 sm:p-8 max-w-5xl mx-auto font-sans">
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
					Edit Client Profile
				</h1>
				<p className="text-gray-500 text-sm mt-1">
					Managing data for{" "}
					<span className="font-semibold text-gray-700">
            {client.firstName} {client.lastName}
          </span>
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* --- LEFT: Main Form --- */}
				<div className="lg:col-span-2">
					<form
						className="bg-white shadow-sm border border-gray-200 rounded-sm p-6 space-y-6"
						onSubmit={handleSubmit(onSubmit)}
					>
						{/* Name Fields: 3 Columns */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div>
								<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
									First Name
								</label>
								<input
									{...register("firstName")}
									className="block w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-900 sm:text-sm transition-colors"
								/>
								{errors.firstName && (
									<p className="text-red-600 text-xs mt-1">
										{errors.firstName.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
									Middle Name
								</label>
								<input
									{...register("middleName")}
									className="block w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-900 sm:text-sm transition-colors"
								/>
								{errors.middleName && (
									<p className="text-red-600 text-xs mt-1">
										{errors.middleName.message}
									</p>
								)}
							</div>

							<div>
								<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
									Last Name
								</label>
								<input
									{...register("lastName")}
									className="block w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-900 sm:text-sm transition-colors"
								/>
								{errors.lastName && (
									<p className="text-red-600 text-xs mt-1">
										{errors.lastName.message}
									</p>
								)}
							</div>
						</div>

						{/* Contact Fields: 2 Columns */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
									Email
								</label>
								<input
									{...register("email")}
									className="block w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-900 sm:text-sm transition-colors"
									type="email"
								/>
								{errors.email && (
									<p className="text-red-600 text-xs mt-1">
										{errors.email.message}
									</p>
								)}
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
									Phone
								</label>
								<input
									{...register("phone")}
									className="block w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-900 sm:text-sm transition-colors"
								/>
								{errors.phone && (
									<p className="text-red-600 text-xs mt-1">
										{errors.phone.message}
									</p>
								)}
							</div>
						</div>

						<div className="flex justify-end pt-4 border-t border-gray-100">
							<button
								className="px-6 py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-colors disabled:opacity-50"
								disabled={updateClientMutation.isPending}
								type="submit"
							>
								{updateClientMutation.isPending ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</form>
				</div>

				{/* --- RIGHT: Booking History --- */}
				<div className="lg:col-span-1">
					<div className="bg-white shadow-sm border border-gray-200 rounded-sm p-6">
						<h3 className="text-lg font-serif font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
							Booking History ({client.bookings?.length || 0})
						</h3>

						{(!client.bookings || client.bookings.length === 0) ? (
							<p className="text-sm text-gray-400 italic">
								No bookings found for this client.
							</p>
						) : (
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm text-left">
									<thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase">
									<tr>
										<th className="px-3 py-2">Dates</th>
										<th className="px-3 py-2">Info</th>
										<th className="px-3 py-2 text-right">Status</th>
									</tr>
									</thead>
									<tbody className="divide-y divide-gray-100">
									{client.bookings.map((booking) => (
										<tr key={booking.booking_id}>
											<td className="px-3 py-2 text-gray-600 text-xs">
												<div>
													In:{" "}
													{new Date(booking.check_in).toLocaleDateString()}
												</div>
												<div>
													Out:{" "}
													{new Date(booking.check_out).toLocaleDateString()}
												</div>
											</td>
											<td className="px-3 py-2 text-xs">
												<div className="text-gray-900 font-medium">
													{booking.guests_count} Guests
												</div>
												<div className="text-gray-500 lowercase">
													{booking.payment_method}
												</div>
											</td>
											<td className="px-3 py-2 text-right">
                          <span
														className={`px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold uppercase ${
															booking.status === "confirmed"
																? "bg-green-100 text-green-800"
																: booking.status === "cancelled"
																	? "bg-red-100 text-red-800"
																	: "bg-yellow-100 text-yellow-800"
														}`}
													>
                            {booking.status}
                          </span>
											</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}