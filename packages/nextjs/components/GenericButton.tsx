export const GenericButton = ({ text, onClick }: {text: string, onClick?: () => void}) => {
	return (
		<button
			onClick={onClick}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
		>
			{ text }
		</button>
	);
};
