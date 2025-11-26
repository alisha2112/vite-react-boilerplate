import { createFileRoute } from "@tanstack/react-router";
import { HotelsListPage } from "../features/hotels/pages/HotelsListPage";

export const Route = createFileRoute("/hotels/")({
	component: HotelsListPage,
});
