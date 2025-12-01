import {
	createFileRoute,
	Outlet,
	redirect,
	useNavigate,
	Link,
} from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import type { JSX } from "react";

function AccessDenied(): JSX.Element {
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = (): void => {
		logout();
		void navigate({ to: "/login" });
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 font-sans">
			<div className="bg-white p-10 rounded-sm shadow-xl max-w-md w-full text-center border-t-4 border-gray-800">
				<div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-6">
					<svg
						className="h-10 w-10 text-gray-700"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.5"
						/>
					</svg>
				</div>

				<h2 className="text-2xl font-serif font-bold text-gray-900 mb-2 tracking-wide uppercase">
					Restricted Area
				</h2>
				<p className="text-gray-500 mb-8 font-light">
					Вибачте, у вас немає прав доступу до панелі управління готелем. Ця зона
					лише для адміністраторів.
				</p>

				<div className="space-y-4">
					<Link
						className="block w-full bg-gray-900 text-white py-3 px-4 rounded-sm hover:bg-gray-800 transition-colors uppercase text-xs tracking-wider font-semibold shadow-md"
						to="/"
					>
						Повернутися на головну
					</Link>

					<button
						className="block w-full bg-white text-gray-600 border border-gray-300 py-3 px-4 rounded-sm hover:bg-gray-50 transition-colors uppercase text-xs tracking-wider font-semibold"
						onClick={handleLogout}
					>
						Вийти з системи
					</button>
				</div>
			</div>
			<div className="mt-8 text-gray-400 text-xs tracking-widest uppercase">
				Hotel Management System
			</div>
		</div>
	);
}

// --- Layout (Стиль: Premium Admin Dashboard) ---
function HotelsLayout(): JSX.Element {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const logout = useAuthStore((state) => state.logout);
	const role = useAuthStore((state) => state.role);

	if (role !== "ADMINISTRATOR") {
		return <AccessDenied />;
	}

	const handleLogout = (): void => {
		logout();
		queryClient.clear();
		void navigate({ to: "/login" });
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col font-sans">
			{/* Header */}
			<header className="bg-gray-900 shadow-lg sticky top-0 z-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">

						{/* ЛІВА ЧАСТИНА: Логотип + Навігація */}
						<div className="flex items-center gap-8">
							{/* Логотип */}
							<div className="flex items-center gap-2">
								<div className="h-8 w-8 bg-gray-700 flex items-center justify-center rounded-sm">
									<span className="text-white font-serif font-bold">H</span>
								</div>
								<span className="text-gray-100 font-serif font-bold text-lg hidden sm:inline-block">
                  AdminPanel
                </span>
							</div>

							{/* Навігація (Меню) */}
							<nav className="hidden md:flex gap-2">
								<Link
									activeProps={{ className: "text-white bg-gray-800" }}
									className="text-gray-400 hover:text-white px-3 py-2 rounded-sm text-sm font-medium transition-colors"
									to="/hotels"
								>
									Hotels
								</Link>
								<Link
									activeProps={{ className: "text-white bg-gray-800" }}
									className="text-gray-400 hover:text-white px-3 py-2 rounded-sm text-sm font-medium transition-colors"
									to="/clients"
								>
									Clients
								</Link>
							</nav>
						</div>

						{/* ПРАВА ЧАСТИНА: Юзер інфо + Logout */}
						<div className="flex items-center gap-6">
							<div className="hidden sm:flex flex-col items-end">
                <span className="text-sm text-gray-200 font-medium leading-none">
                  Administrator
                </span>
								<span className="text-xs text-gray-500 mt-1">Logged in</span>
							</div>

							<div className="h-8 w-px bg-gray-700 hidden sm:block"></div>

							<button
								className="text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
								onClick={handleLogout}
							>
								<span>Logout</span>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-white rounded-sm shadow-sm border border-gray-200 min-h-[500px]">
					<Outlet />
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-white border-t border-gray-200 py-6 mt-auto">
				<div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
					<div>&copy; {new Date().getFullYear()} Hotel Management System</div>
					<div className="mt-2 sm:mt-0 flex gap-4">
            <span className="hover:text-gray-800 cursor-pointer transition-colors">
              Support
            </span>
						<span className="hover:text-gray-800 cursor-pointer transition-colors">
              Privacy Policy
            </span>
					</div>
				</div>
			</footer>
		</div>
	);
}

export const Route = createFileRoute("/hotels")({
	beforeLoad: ({ location }) => {
		const isAuth = useAuthStore.getState().isAuthenticated;
		if (!isAuth) {
			// eslint-disable-next-line @typescript-eslint/only-throw-error
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: HotelsLayout,
});