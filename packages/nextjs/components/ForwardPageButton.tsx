import Link from "next/link";

// this component will be used to navigate to the page referred in the props
export const ForwardPageButton = ({ to, innerText }: { to: string, innerText: string }) => {
	return (
		<Link href={to} passHref>
			<button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
				{innerText}
			</button>
		</Link>
	)
}
