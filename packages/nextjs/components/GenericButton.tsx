export const GenericButton = ({ text, onClick }: {text: string, onClick?: () => void}) => {
	return (
		<button
			onClick={onClick}
			className="font-custom bg-transparent hover:bg-primary text-white font-bold py-2 px-4 rounded-full shadow-md
			transition duration-300 ease-in-out">
			{ text }
		</button>
	);
};
