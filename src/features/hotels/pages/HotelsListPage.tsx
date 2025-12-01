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

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64 text-gray-400 font-light tracking-wide uppercase text-sm">
				Loading hotel registry...
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
						Hotels
					</h1>
					<p className="text-gray-500 text-sm mt-1">
						Manage properties and view statistics
					</p>
				</div>
				<Link
					className="bg-gray-900 text-white px-5 py-2.5 rounded-sm hover:bg-gray-800 transition-all uppercase text-xs tracking-widest font-semibold shadow-sm flex items-center gap-2"
					to="/hotels/new"
				>
					Add Hotel
				</Link>
			</div>

			<div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
						<tr>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
								Property
							</th>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
								Location
							</th>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
								Stats
							</th>
							<th className="py-4 px-6 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
								Rating
							</th>
							<th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-100">
						{hotels?.map((hotel) => (
							<tr
								key={hotel.id}
								className="hover:bg-gray-50 transition-colors group"
							>
								<td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">
									{hotel.name}
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-gray-500 text-sm">
									{hotel.location}
								</td>
								<td className="py-4 px-6 whitespace-nowrap">
									<div className="flex gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        {hotel.rooms?.length || 0} Rooms
                      </span>
										<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        {hotel.employees?.length || 0} Staff
                      </span>
									</div>
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-center">
									<div className="flex items-center justify-center gap-1">
										{/* ВИПРАВЛЕНО: додано fill-current та збільшено розмір до w-4 h-4 */}
										{Array.from({ length: 5 }).map((_, index) => (
											<svg
												key={index}
												viewBox="0 0 24 24"
												className={`w-4 h-4 fill-current ${
													index < (hotel.stars || 0)
														? "text-gray-900"
														: "text-gray-200"
												}`}
											>
												<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
											</svg>
										))}
									</div>
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
									<div className="flex justify-end gap-3">
										<Link
											className="text-gray-500 hover:text-gray-900 text-xs uppercase tracking-wider"
											params={{ hotelId: String(hotel.id) }}
											to="/hotels/$hotelId"
										>
											Edit
										</Link>
										<span className="text-gray-300">|</span>
										<button
											className="text-gray-400 hover:text-red-700 text-xs uppercase tracking-wider"
											onClick={() => {
												handleDelete(hotel.id);
											}}
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