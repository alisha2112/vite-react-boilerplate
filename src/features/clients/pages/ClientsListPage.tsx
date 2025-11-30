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
		return <div className="p-6 text-red-500">Error: {error?.message}</div>;
	}

	return (
		<div className="p-6 sm:p-8 font-sans">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
				<div>
					<h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
						Clients
					</h1>
					<p className="text-gray-500 text-sm mt-1">Manage your guest database</p>
				</div>
				<Link
					className="bg-gray-900 text-white px-5 py-2.5 rounded-sm hover:bg-gray-800 transition-all uppercase text-xs tracking-widest font-semibold shadow-sm flex items-center gap-2"
					to="/clients/new"
				>
					Add Client
				</Link>
			</div>

			<div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
						<tr>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
							<th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
						</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-100">
						{clients?.map((client) => (
							<tr key={client.id} className="hover:bg-gray-50 transition-colors group">
								<td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">
									{client.firstName} {client.lastName}
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-gray-500">{client.email}</td>
								<td className="py-4 px-6 whitespace-nowrap text-gray-500">{client.phone}</td>
								<td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
									<div className="flex justify-end gap-3">
										<Link
											className="text-gray-500 hover:text-gray-900 transition-colors uppercase text-xs tracking-wider"
											params={{ clientId: String(client.id) }}
											to="/clients/$clientId"
										>
											Edit
										</Link>
										<span className="text-gray-300">|</span>
										<button
											className="text-gray-400 hover:text-red-700 uppercase text-xs tracking-wider"
											disabled={deleteClientMutation.isPending}
											onClick={() => { handleDelete(client.id); }}
										>
											Delete
										</button>
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