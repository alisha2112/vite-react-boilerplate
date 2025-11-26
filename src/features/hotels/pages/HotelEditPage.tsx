import { useEffect, type JSX } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useHotel, useUpdateHotel } from "../api";

const hotelSchema = z.object({
	name: z.string().min(1, "Hotel name is required"),
	location: z.string().min(1, "Location is required"),
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

	if (isLoading) return <div className="p-4">Loading hotel details...</div>;
	if (isError || !hotel)
		return <div className="p-4 text-red-500">Hotel not found.</div>;

	return (
		<div className="p-4 max-w-2xl mx-auto">
			<Link
				className="text-blue-500 hover:underline mb-4 inline-block"
				to="/hotels"
			>
				&larr; Back to List
			</Link>
			<h1 className="text-2xl font-bold mb-6">Edit Hotel: {hotel.name}</h1>

			<form
				className="space-y-4 bg-white p-6 shadow rounded-lg"
				onSubmit={handleSubmit(onSubmit)}
			>
				{/* Name */}
				<div>
					<label className="block font-medium text-gray-700" htmlFor="name">
						Hotel Name
					</label>
					<input
						id="name"
						{...register("name")}
						className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
					)}
				</div>

				{/* Location */}
				<div>
					<label className="block font-medium text-gray-700" htmlFor="location">
						Location
					</label>
					<input
						id="location"
						{...register("location")}
						className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
					/>
					{errors.location && (
						<p className="text-red-500 text-sm mt-1">
							{errors.location.message}
						</p>
					)}
				</div>

				{/* Stars */}
				<div>
					<label className="block font-medium text-gray-700" htmlFor="stars">
						Stars (1-5)
					</label>
					<input
						id="stars"
						max="5"
						min="1"
						type="number"
						{...register("stars")}
						className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
					/>
					{errors.stars && (
						<p className="text-red-500 text-sm mt-1">{errors.stars.message}</p>
					)}
				</div>

				{/* Description */}
				<div>
					<label
						className="block font-medium text-gray-700"
						htmlFor="description"
					>
						Description
					</label>
					<textarea
						id="description"
						{...register("description")}
						className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
						rows={3}
					/>
				</div>

				{/* Policy */}
				<div>
					<label className="block font-medium text-gray-700" htmlFor="policy">
						Policy
					</label>
					<textarea
						id="policy"
						{...register("policy")}
						className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500"
						rows={3}
					/>
				</div>

				<button
					className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
					disabled={updateHotelMutation.isPending}
					type="submit"
				>
					{updateHotelMutation.isPending ? "Saving..." : "Save Changes"}
				</button>
			</form>
		</div>
	);
}
