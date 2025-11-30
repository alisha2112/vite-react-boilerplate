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

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64 text-gray-400 font-light tracking-wide uppercase text-sm">
				Loading hotel details...
			</div>
		);
	}

	if (isError || !hotel) {
		return (
			<div className="p-6 max-w-3xl mx-auto">
				<div className="bg-red-50 border-l-4 border-red-900 p-4">
					<p className="text-red-800">Hotel not found or error loading data.</p>
				</div>
				<Link
					className="mt-4 inline-block text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
					to="/hotels"
				>
					Return to list
				</Link>
			</div>
		);
	}

	return (
		<div className="p-6 sm:p-8 max-w-4xl mx-auto font-sans">
			{/* --- Breadcrumb / Back Link --- */}
			<div className="mb-6">
				<Link
					className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors flex items-center gap-1 group"
					to="/hotels"
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
					Back to Hotel Registry
				</Link>
			</div>

			{/* --- Header --- */}
			<div className="mb-8 border-b border-gray-200 pb-6">
				<h1 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">
					Edit Property
				</h1>
				<p className="text-gray-500 text-sm mt-1">
					Update information for <span className="font-semibold text-gray-700">{hotel.name}</span>
				</p>
			</div>

			{/* --- Form --- */}
			<form
				className="bg-white shadow-sm border border-gray-200 rounded-sm p-6 sm:p-8 space-y-8"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Name */}
					<div className="col-span-1">
						<label
							className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
							htmlFor="name"
						>
							Property Name
						</label>
						<input
							id="name"
							{...register("name")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
							placeholder="e.g. Grand Hotel"
						/>
						{errors.name && (
							<p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
						)}
					</div>

					{/* Location */}
					<div className="col-span-1">
						<label
							className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
							htmlFor="location"
						>
							Location
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg
									className="h-4 w-4 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									/>
									<path
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									/>
								</svg>
							</div>
							<input
								id="location"
								{...register("location")}
								className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
								placeholder="City, Country"
							/>
						</div>
						{errors.location && (
							<p className="text-red-600 text-xs mt-1">
								{errors.location.message}
							</p>
						)}
					</div>
				</div>

				{/* Stars */}
				<div className="max-w-xs">
					<label
						className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
						htmlFor="stars"
					>
						Star Rating (1-5)
					</label>
					<input
						id="stars"
						max="5"
						min="1"
						type="number"
						{...register("stars")}
						className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
					/>
					{errors.stars && (
						<p className="text-red-600 text-xs mt-1">{errors.stars.message}</p>
					)}
				</div>

				<div className="border-t border-gray-100 pt-6 space-y-8">
					{/* Description */}
					<div>
						<label
							className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
							htmlFor="description"
						>
							Description
						</label>
						<textarea
							id="description"
							{...register("description")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
							placeholder="Enter a detailed description of the property..."
							rows={4}
						/>
					</div>

					{/* Policy */}
					<div>
						<label
							className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
							htmlFor="policy"
						>
							Hotel Policy
						</label>
						<textarea
							id="policy"
							{...register("policy")}
							className="block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors bg-gray-50"
							placeholder="e.g. Check-in after 14:00, No pets allowed..."
							rows={3}
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-200">
					<Link
						className="px-6 py-3 border border-gray-300 shadow-sm text-xs font-bold text-gray-700 uppercase tracking-widest rounded-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
						to="/hotels"
					>
						Cancel
					</Link>
					<button
						className="px-6 py-3 border border-transparent shadow-sm text-xs font-bold text-white uppercase tracking-widest bg-gray-900 rounded-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						disabled={updateHotelMutation.isPending}
						type="submit"
					>
						{updateHotelMutation.isPending ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</form>
		</div>
	);
}