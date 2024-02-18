'use client'

import Link from "next/link";

export function ModalRedirectButton(
		{ to, btnText, title, bodyText }:
		{ to: string, btnText: string, title: string, bodyText: string }) {
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div className="p-8 border w-96 shadow-lg rounded-md bg-white">
				<div className="text-center">
					<h3 className="text-2xl font-bold text-gray-900">{title}</h3>
					<div className="mt-2 px-7 py-3">
						<p className="text-lg text-gray-500">{bodyText}</p>
					</div>
					<div className="flex justify-center mt-4">
						<Link href={to} passHref>
							<button
								className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
							>
								{btnText}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
