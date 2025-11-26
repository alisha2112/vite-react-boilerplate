import { createFileRoute } from "@tanstack/react-router";
import { HotelEditPage } from "../features/hotels/pages/HotelEditPage";

export const Route = createFileRoute("/hotels/$hotelId")({
	component: HotelEditPage,
});
