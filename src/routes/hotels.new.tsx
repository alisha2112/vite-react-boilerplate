import { createFileRoute } from "@tanstack/react-router";
import { HotelCreatePage } from "../features/hotels/pages/HotelCreatePage";

export const Route = createFileRoute("/hotels/new")({
	component: HotelCreatePage,
});
