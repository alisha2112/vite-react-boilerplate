import { useEffect, type JSX } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useHotel, useUpdateHotel } from "../api";

const hotelSchema = z.object({
	name: z.string().min(1, "Required"),
	location: z.string().min(1, "Required"),
	stars: z.coerce.number().min(1).max(5),
	description: z.string().optional(),
	policy: z.string().optional(),
});

type HotelFormData = z.infer<typeof hotelSchema>;

export function HotelEditPage(): JSX.Element {
	const { hotelId } = useParams({ from: "/hotels/$hotelId" });
	const { data: hotel, isLoading, isError } = useHotel(hotelId);
	const updateHotelMutation = useUpdateHotel();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<HotelFormData>({
		resolver: zodResolver(hotelSchema),
	});

	useEffect(() => {
		if (hotel) {
			reset({
				name: hotel.name,
				location: hotel.location,
				stars: hotel.stars,
				description: hotel.description || "",
				policy: hotel.policy || "",
			});
		}
	}, [hotel, reset]);

	const onSubmit = (data: HotelFormData): void => {
		updateHotelMutation.mutate({ id: hotelId, data });
	};

	if (isLoading)
		return (
			<div className="flex justify-center items-center h-64 text-gray-400 font-light tracking-wide uppercase text-sm">
				Loading hotel details...
			</div>
		);
	if (isError || !hotel)
		return <div className="p-8 text-center text-red-500">Not found.</div>;

	return (
		<div className="p-6 sm:p-8 max-w-5xl mx-auto font-sans">
			<div className="mb-6">
				<Link
					className="text-gray-500 hover:text-gray-900 text-sm font-medium flex items-center gap-1"
					to="/hotels"
				>
					&larr; Back to Registry
				</Link>
			</div>

			<div className="mb-8 border-b border-gray-200 pb-6">
				<h1 className="text-3xl font-serif font-bold text-gray-900">
					Edit Property
				</h1>
				<p className="text-gray-500 text-sm mt-1">
					Detailed configuration for {hotel.name}
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* --- LEFT COLUMN: Main Form --- */}
				<div className="lg:col-span-2 space-y-8">
					<form
						className="bg-white shadow-sm border border-gray-200 rounded-sm p-6 space-y-6"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
									Property Name
								</label>
								<input
									{...register("name")}
									className="block w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-900 sm:text-sm"
								/>
								{errors.name && (
									<p className="text-red-500 text-xs mt-1">
										{errors.name.message}
									</p>
								)}
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
									Location
								</label>
								<input
									{...register("location")}
									className="block w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-900 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
								Description
							</label>
							<textarea
								{...register("description")}
								className="block w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-1 focus:ring-gray-900 sm:text-sm"
								rows={3}
							/>
						</div>

						<div className="flex justify-end pt-4 border-t border-gray-100">
							<button
								className="px-6 py-2 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-black"
								disabled={updateHotelMutation.isPending}
								type="submit"
							>
								{updateHotelMutation.isPending ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</form>

					{/* --- ROOMS SECTION --- */}
					<div className="bg-white shadow-sm border border-gray-200 rounded-sm p-6">
						<h3 className="text-lg font-serif font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
							Room Inventory ({hotel.rooms?.length || 0})
						</h3>
						{!hotel.rooms || hotel.rooms.length === 0 ? (
							<p className="text-sm text-gray-400 italic">
								No rooms configured.
							</p>
						) : (
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm text-left">
									<thead className="bg-gray-50 text-gray-500 font-medium">
									<tr>
										<th className="px-4 py-2">Room #</th>
										<th className="px-4 py-2">Comfort</th>
										<th className="px-4 py-2 text-right">Price</th>
									</tr>
									</thead>
									<tbody className="divide-y divide-gray-100">
									{hotel.rooms.map((room) => (
										<tr key={room.id}>
											<td className="px-4 py-2 font-medium text-gray-900">
												#{room.room_number}
											</td>
											<td className="px-4 py-2 text-gray-500 capitalize">
												{room.comfort_level}
											</td>
											<td className="px-4 py-2 text-right font-mono">
												{room.price_per_night}
											</td>
										</tr>
									))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>

				{/* --- RIGHT COLUMN: Side Data --- */}
				<div className="space-y-6">
					{/* Staff List */}
					<div className="bg-white shadow-sm border border-gray-200 rounded-sm p-6">
						<h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
							Assigned Staff
						</h3>
						{!hotel.employees || hotel.employees.length === 0 ? (
							<p className="text-sm text-gray-400 italic">No staff assigned.</p>
						) : (
							<ul className="space-y-3">
								{hotel.employees.map((emp) => (
									<li
										key={emp.id}
										className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0"
									>
                    <span className="font-medium text-gray-800">
                      {emp.first_name} {emp.last_name}
                    </span>
										<span className="text-xs text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded-sm">
                      {emp.position}
                    </span>
									</li>
								))}
							</ul>
						)}
					</div>

					{/* Services List */}
					<div className="bg-white shadow-sm border border-gray-200 rounded-sm p-6">
						<h3 className="text-lg font-serif font-bold text-gray-900 mb-4">
							Services
						</h3>
						<div className="flex flex-wrap gap-2">
							{!hotel.services || hotel.services.length === 0 ? (
								<span className="text-sm text-gray-400 italic">
                  None available
                </span>
							) : (
								hotel.services.map((srv) => (
									<span
										key={srv.service_id}
										className="inline-block bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-sm font-medium tracking-wide"
									>
                    {srv.service_name} ({srv.service_price})
                  </span>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}