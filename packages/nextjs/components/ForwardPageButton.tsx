import Link from "next/link";

// this component will be used to navigate to the page referred in the props
export const ForwardPageButton = ({ to, innerText }: { to: string, innerText: string }) => {
	return (
		<Link href={to} passHref>
			<button className="bg-primary text-white font-bold py-2 px-4 rounded-full">
				{innerText}
			</button>
		</Link>
	)
}
