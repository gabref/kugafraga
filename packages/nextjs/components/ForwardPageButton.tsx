import Link from "next/link";

// this component will be used to navigate to the page referred in the props
export const ForwardPageButton = ({ to, innerText }: { to: string, innerText: string }) => {
	return (
		<Link href={to} passHref>
			<button className="bg-transparent border-grey-200 text-white font-semibold py-2 px-4 rounded-full hover:bg-base-300 transition duration-300 ease-in-out">
				{innerText}
			</button>
		</Link>
	)
}
