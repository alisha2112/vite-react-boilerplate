import type { JSX } from "react";
import { Link } from "@tanstack/react-router";
import { useHotels, useDeleteHotel } from "../api";

export function HotelsListPage(): JSX.Element {
	const { data: hotels, isLoading, isError, error } = useHotels();
	const deleteHotelMutation = useDeleteHotel();

	const handleDelete = (id: number): void => {
		if (window.confirm("Are you sure you want to delete this hotel?")) {
			deleteHotelMutation.mutate(id);
		}
	};

	if (isLoading) return <div className="p-4">Loading hotels...</div>;

	if (isError)
		return (
			<div className="p-4 text-red-500">
				Error loading hotels: {error?.message}
			</div>
		);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Hotels</h1>
				<Link
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
					to="/hotels/new"
				>
					Add New Hotel
				</Link>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
					<thead className="bg-gray-50">
						<tr>
							<th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">
								Name
							</th>
							<th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">
								Location
							</th>
							<th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">
								Stars
							</th>
							<th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{hotels?.length === 0 && (
							<tr>
								<td className="py-4 text-center text-gray-500" colSpan={4}>
									No hotels found.
								</td>
							</tr>
						)}
						{hotels?.map((hotel) => (
							<tr key={hotel.id} className="hover:bg-gray-50 transition-colors">
								<td className="py-2 px-4 border-b">{hotel.name}</td>
								<td className="py-2 px-4 border-b">{hotel.location}</td>
								<td className="py-2 px-4 border-b text-center">
									<span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
										{hotel.stars} ★
									</span>
								</td>
								<td className="py-2 px-4 border-b text-center">
									<Link
										className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
										params={{ hotelId: String(hotel.id) }}
										to="/hotels/$hotelId"
									>
										Edit
									</Link>
									<button
										className="text-red-600 hover:text-red-900 disabled:opacity-50 font-medium"
										disabled={deleteHotelMutation.isPending}
										onClick={() => {
											handleDelete(hotel.id);
										}}
									>
										{deleteHotelMutation.isPending ? "Deleting..." : "Delete"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
