import { AcceptFee } from "./AcceptFee";

export const FlightInformation = () => {
	// Mock flight information
	const flightInfo = {
		flightNumber: 'XY123',
		departureTime: '12:00 PM',
		arrivalTime: '2:00 PM',
		departureAirport: 'ABC',
		arrivalAirport: 'DEF',
	};

	// Mock fee expectations
	const feeExpectations = [
		{ description: 'Luggage Fee', amount: '$20' },
		{ description: 'Seat Selection Fee', amount: '$10' },
		{ description: 'In-flight Meal Fee', amount: '$15' },
	];

	// Calculate total fee
	const totalFee = feeExpectations.reduce((total, fee) => total + parseFloat(fee.amount.slice(1)), 0);

	return (
		<div className="flex justify-center items-start mt-8">
			<div className="w-1/2 pr-8">
				<h2 className="text-2xl font-bold mb-4">Flight Information</h2>
				<div className="mb-2">
					<p><span className="font-semibold">Flight Number:</span> {flightInfo.flightNumber}</p>
					<p><span className="font-semibold">Departure Time:</span> {flightInfo.departureTime}</p>
					<p><span className="font-semibold">Arrival Time:</span> {flightInfo.arrivalTime}</p>
					<p><span className="font-semibold">Departure Airport:</span> {flightInfo.departureAirport}</p>
					<p><span className="font-semibold">Arrival Airport:</span> {flightInfo.arrivalAirport}</p>
				</div>
			</div>
			<div className="w-1/2 pl-8 border-l-2 border-gray-200">
				<h2 className="text-2xl font-bold mb-4">Fee Expectations</h2>
				<ul className="mb-2">
					{feeExpectations.map((fee, index) => (
						<li key={index}>
							<span className="font-semibold">{fee.description}:</span> {fee.amount}
						</li>
					))}
				</ul>
				<p className="font-semibold">Total Fee: ${totalFee.toFixed(2)}</p>
				<AcceptFee />
			</div>
		</div>
	);
}
