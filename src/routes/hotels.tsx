import {
	createFileRoute,
	Outlet,
	redirect,
	useNavigate,
	Link,
} from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";
import { useQueryClient } from "@tanstack/react-query";

function AccessDenied(): JSX.Element {
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = (): void => {
		logout();
		void navigate({ to: "/login" });
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
			<div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
				<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
					<svg
						className="h-10 w-10 text-red-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				</div>

				<h2 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h2>
				<p className="text-gray-500 mb-6">
					Ви не маєте прав доступу до цієї сторінки. Ця зона лише для
					адміністраторів.
				</p>

				<div className="space-y-3">
					<Link
						className="block w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
						to="/"
					>
						Go to Home Page
					</Link>

					<button
						className="block w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

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
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<header className="bg-white shadow-sm border-b sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<span className="text-xl font-bold text-gray-800">
								Admin Panel
							</span>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-500 hidden sm:inline">
								Administrator
							</span>
							<button
								className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-red-200"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>

			<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<Outlet />
			</main>

			<footer className="bg-white border-t py-4 mt-auto">
				<div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
					&copy; {new Date().getFullYear()} Hotel Management System
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
