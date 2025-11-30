import type { JSX } from "react";
import { Link } from "@tanstack/react-router";
import { useClients, useDeleteClient } from "../api";

export function ClientsListPage(): JSX.Element {
	const { data: clients, isLoading, isError, error } = useClients();
	const deleteClientMutation = useDeleteClient();

	const handleDelete = (id: number): void => {
		if (window.confirm("Are you sure you want to delete this client?")) {
			deleteClientMutation.mutate(id);
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64 text-gray-400 font-light tracking-wide uppercase text-sm">
				Loading client registry...
			</div>
		);
	}

	if (isError) {
		return (
			<div className="p-6">
				<div className="bg-red-50 border-l-4 border-red-900 p-4 shadow-sm">
					<p className="text-sm text-red-800">Error: {error?.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 sm:p-8 font-sans">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
				<div>
					<h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
						Clients
					</h1>
					<p className="text-gray-500 text-sm mt-1">
						Manage guest database and profiles
					</p>
				</div>
				<Link
					className="bg-gray-900 text-white px-5 py-2.5 rounded-sm hover:bg-gray-800 transition-all uppercase text-xs tracking-widest font-semibold shadow-sm flex items-center gap-2"
					to="/clients/new"
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
					</svg>
					Add Client
				</Link>
			</div>

			<div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
						<tr>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Guest Name</th>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Info</th>
							<th className="py-4 px-6 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Bookings</th>
							<th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
						</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-100">
						{clients?.length === 0 && (
							<tr>
								<td className="py-12 text-center text-gray-400" colSpan={4}>No clients found.</td>
							</tr>
						)}
						{clients?.map((client) => (
							<tr key={client.id} className="hover:bg-gray-50 transition-colors group">
								<td className="py-4 px-6 whitespace-nowrap">
									<div className="font-medium text-gray-900">{client.firstName} {client.lastName}</div>
									{client.isRegistered && (
										<span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200 mt-1">REGISTERED</span>
									)}
								</td>
								<td className="py-4 px-6 whitespace-nowrap">
									<div className="text-sm text-gray-900">{client.email}</div>
									<div className="text-sm text-gray-500 font-mono mt-0.5">{client.phone}</div>
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${(client.bookings?.length || 0) > 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {client.bookings?.length || 0}
                    </span>
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
									<div className="flex justify-end gap-3">
										<Link className="text-gray-500 hover:text-gray-900 text-xs uppercase tracking-wider" params={{ clientId: String(client.id) }} to="/clients/$clientId">Edit</Link>
										<span className="text-gray-300">|</span>
										<button className="text-gray-400 hover:text-red-700 text-xs uppercase tracking-wider" disabled={deleteClientMutation.isPending} onClick={() => { handleDelete(client.id); }}>Delete</button>
									</div>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}