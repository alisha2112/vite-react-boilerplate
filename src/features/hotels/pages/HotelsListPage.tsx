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

	// --- Loading State ---
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64 text-gray-400 font-light tracking-wide uppercase text-sm">
				Loading hotel registry...
			</div>
		);
	}

	// --- Error State ---
	if (isError) {
		return (
			<div className="p-6">
				<div className="bg-red-50 border-l-4 border-red-900 p-4 shadow-sm">
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
							<p className="text-sm text-red-800">
								Error loading hotels: {error?.message}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 sm:p-8 font-sans">
			{/* --- Page Header --- */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
				<div>
					<h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
						Hotels
					</h1>
					<p className="text-gray-500 text-sm mt-1">
						Manage your properties and locations
					</p>
				</div>
				<Link
					className="bg-gray-900 text-white px-5 py-2.5 rounded-sm hover:bg-gray-800 transition-all uppercase text-xs tracking-widest font-semibold shadow-sm flex items-center gap-2"
					to="/hotels/new"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 4v16m8-8H4"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
					Add Hotel
				</Link>
			</div>

			{/* --- Table Container --- */}
			<div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
						<tr>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
								Property Name
							</th>
							<th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
								Location
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
						{hotels?.length === 0 && (
							<tr>
								<td className="py-12 text-center" colSpan={4}>
									<div className="flex flex-col items-center justify-center text-gray-400">
										<svg
											className="w-12 h-12 mb-3 text-gray-300"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1"
											/>
										</svg>
										<span className="text-sm font-medium">
                        No hotels found in the database.
                      </span>
									</div>
								</td>
							</tr>
						)}

						{hotels?.map((hotel) => (
							<tr
								key={hotel.id}
								className="hover:bg-gray-50 transition-colors group"
							>
								<td className="py-4 px-6 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-900 group-hover:text-black">
										{hotel.name}
									</div>
								</td>
								<td className="py-4 px-6 whitespace-nowrap">
									<div className="flex items-center text-sm text-gray-500">
										<svg
											className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1.5"
											/>
											<path
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="1.5"
											/>
										</svg>
										{hotel.location}
									</div>
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-center">
									<div className="flex items-center justify-center gap-1">
										{/* Рендеримо зірочки відповідно до рейтингу */}
										{Array.from({ length: 5 }).map((_, index) => (
											<svg
												key={index}
												stroke="currentColor"
												strokeWidth="1"
												viewBox="0 0 24 24"
												className={`w-4 h-4 ${
													index < hotel.stars
														? "text-gray-900 fill-current"
														: "text-gray-300"
												}`}
											>
												<path
													d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										))}
									</div>
								</td>
								<td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
									<div className="flex justify-end gap-3">
										<Link
											className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
											params={{ hotelId: String(hotel.id) }}
											to="/hotels/$hotelId"
										>
                        <span className="text-xs uppercase tracking-wider">
                          Edit
                        </span>
										</Link>
										<span className="text-gray-300">|</span>
										<button
											className="text-gray-400 hover:text-red-700 disabled:opacity-50 transition-colors flex items-center gap-1"
											disabled={deleteHotelMutation.isPending}
											onClick={() => {
												handleDelete(hotel.id);
											}}
										>
                        <span className="text-xs uppercase tracking-wider">
                          {deleteHotelMutation.isPending ? "..." : "Delete"}
                        </span>
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