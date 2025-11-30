import type { JSX } from "react";
import { Link } from "@tanstack/react-router";

export function Home(): JSX.Element {
	return (
		<div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gray-900 selection:text-white">
			{/* --- Navigation --- */}
			<nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-20">
						{/* Logo */}
						<div className="flex items-center gap-3">
							<div className="h-10 w-10 bg-gray-900 flex items-center justify-center rounded-sm">
                <span className="text-white font-serif font-bold text-xl">
                  H
                </span>
							</div>
							<span className="text-xl font-serif font-bold tracking-wide">
                Hotel<span className="font-light text-gray-500">Group</span>
              </span>
						</div>

						{/* Login Button */}
						<Link
							className="px-6 py-2.5 border border-gray-900 text-gray-900 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-gray-900 hover:text-white transition-all duration-300"
							to="/login"
						>
							Portal Login
						</Link>
					</div>
				</div>
			</nav>

			{/* --- Hero Section --- */}
			<header className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 block">
            Established 2024
          </span>
					<h1 className="text-5xl sm:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">
						The Art of <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-900">
              Modern Hospitality
            </span>
					</h1>
					<p className="max-w-2xl mx-auto text-lg text-gray-500 font-light leading-relaxed mb-10">
						Ми об'єднуємо елегантність традиційного сервісу з передовими
						технологіями управління. Наша мережа — це більше, ніж просто
						готелі. Це екосистема комфорту, створена для вибагливих гостей.
					</p>
					<div className="flex justify-center gap-4">
						<Link
							className="px-8 py-4 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest rounded-sm shadow-lg hover:bg-black hover:shadow-xl transition-all transform hover:-translate-y-1"
							to="/login"
						>
							Manage Properties
						</Link>
					</div>
				</div>

				{/* Decorative background element */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-5 pointer-events-none">
					<div className="absolute top-20 left-10 w-72 h-72 bg-gray-400 rounded-full blur-3xl mix-blend-multiply filter" />
					<div className="absolute bottom-20 right-10 w-72 h-72 bg-gray-300 rounded-full blur-3xl mix-blend-multiply filter" />
				</div>
			</header>

			{/* --- Story / About Section --- */}
			<section className="py-20 bg-gray-50 border-t border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
								Redefining the Standard
							</h2>
							<div className="space-y-4 text-gray-600 leading-relaxed">
								<p>
									Наша мережа почалася з однієї ідеї: створити простір, де
									кожна деталь має значення. Від архітектури до обслуговування —
									ми прагнемо досконалості.
								</p>
								<p>
									Сьогодні ми управляємо портфоліо ексклюзивних локацій, кожна з
									яких має свій унікальний характер, але об'єднана єдиним
									стандартом якості. Наша централізована система дозволяє
									забезпечити безшовний досвід для кожного гостя, незалежно від
									того, в якій частині світу він знаходиться.
								</p>
							</div>

							<div className="mt-8 flex gap-8">
								<div>
									<span className="block text-3xl font-serif font-bold text-gray-900">5+</span>
									<span className="text-xs text-gray-500 uppercase tracking-wider">Locations</span>
								</div>
								<div>
									<span className="block text-3xl font-serif font-bold text-gray-900">1k+</span>
									<span className="text-xs text-gray-500 uppercase tracking-wider">Premium Rooms</span>
								</div>
								<div>
									<span className="block text-3xl font-serif font-bold text-gray-900">24/7</span>
									<span className="text-xs text-gray-500 uppercase tracking-wider">Concierge</span>
								</div>
							</div>
						</div>

						{/* Cards Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="h-10 w-10 bg-gray-100 rounded-sm flex items-center justify-center mb-4 text-gray-800">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
									</svg>
								</div>
								<h3 className="font-serif font-bold text-lg mb-2">Global Reach</h3>
								<p className="text-sm text-gray-500">Присутність у ключових туристичних та бізнес-центрах країни.</p>
							</div>

							<div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow mt-0 sm:mt-8">
								<div className="h-10 w-10 bg-gray-100 rounded-sm flex items-center justify-center mb-4 text-gray-800">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
									</svg>
								</div>
								<h3 className="font-serif font-bold text-lg mb-2">Secure & Private</h3>
								<p className="text-sm text-gray-500">Найвищі стандарти безпеки даних та конфіденційності гостей.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* --- Footer --- */}
			<footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 bg-gray-700 flex items-center justify-center rounded-sm">
							<span className="text-white font-serif font-bold">H</span>
						</div>
						<span className="text-lg font-serif tracking-wide">HotelGroup</span>
					</div>
					<div className="text-gray-400 text-sm">
						&copy; {new Date().getFullYear()} Hotel Management System. All rights reserved.
					</div>
				</div>
			</footer>
		</div>
	);
}
