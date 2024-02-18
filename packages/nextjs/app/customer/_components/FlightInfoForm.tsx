import { useState } from 'react';
import { FlightInfo } from '../trackingfee/_components/FlightInformation';
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';

export function ModalFlightForm({ closeModal }: { closeModal: () => void }) {
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div className="p-8 border w-96 shadow-lg rounded-md bg-base-100">
				<button
					className="fg-red bg-red top-2 right-2 text-gray-500 hover:text-gray-700 z-100"
					onClick={closeModal}
					aria-label="Close Modal"
				>
					<svg
						className="h-6 w-6"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
				<div className="text-center overflow-y-auto">
					<FlightForm closeModal={closeModal} />
				</div>
			</div>
		</div>
	);
}

const FlightForm = ({ closeModal }: { closeModal: () => void }) => {
	const [flightNumber, setFlightNumber] = useState('');
	const [departureTime, setDepartureTime] = useState('');
	const [arrivalTime, setArrivalTime] = useState('');
	const [departureAirport, setDepartureAirport] = useState('');
	const [arrivalAirport, setArrivalAirport] = useState('');
	const [transferAirports, setTransferAirports] = useState<string[]>([]);
	const [newTransferAirport, setNewTransferAirport] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isFormValid = () => {
		return flightNumber !== '' && departureTime !== '' && arrivalTime !== '';
	};

	const handleAddTransferAirport = () => {
		if (newTransferAirport !== '') {
			setTransferAirports([...transferAirports, newTransferAirport]);
			setNewTransferAirport('');
		}
	};

	const { data: airports } = useScaffoldContractRead({
		contractName: 'AirportsManager',
		functionName: 'retrieveAirports',
		watch: true,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const flightInfo: FlightInfo = {
			flightNumber,
			departureTime,
			arrivalTime,
			airports: [departureAirport, ...transferAirports, arrivalAirport],
		};
		if (typeof window !== 'undefined')
			window.localStorage.setItem('flightInfoStorage', JSON.stringify(flightInfo));
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setFlightNumber('');
			setDepartureTime('');
			setArrivalTime('');
			setDepartureAirport('');
			setArrivalAirport('');
			setTransferAirports([]);
			setNewTransferAirport('');
			closeModal();
		}, 2000); // Simulate a 2-second delay
	};

	return (
		<form onSubmit={handleSubmit} className="bg-base-200 shadow-md rounded-md p-6">
			<h2 className="text-xl font-bold mb-4">Enter Flight Information</h2>
			<div className="mb-4">
				<label htmlFor="flightNumber" className="block text-sm font-semibold mb-1">Flight Number</label>
				<input
					type="text"
					id="flightNumber"
					value={flightNumber}
					onChange={(e) => setFlightNumber(e.target.value)}
					className="input border border-gray-300 rounded-md p-2 w-full"
					placeholder="Enter flight number"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="departureTime" className="block text-sm font-semibold mb-1">Departure Time</label>
				<input
					type="text"
					id="departureTime"
					value={departureTime}
					onChange={(e) => setDepartureTime(e.target.value)}
					className="input border border-gray-300 rounded-md p-2 w-full"
					placeholder="Enter departure time"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="arrivalTime" className="block text-sm font-semibold mb-1">Arrival Time</label>
				<input
					type="text"
					id="arrivalTime"
					value={arrivalTime}
					onChange={(e) => setArrivalTime(e.target.value)}
					className="input border border-gray-300 rounded-md p-2 w-full"
					placeholder="Enter arrival time"
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="departureAirport" className="block text-sm font-semibold mb-1">Departure Airport</label>
				<select
					id="departureAirport"
					value={departureAirport}
					onChange={(e) => setDepartureAirport(e.target.value)}
					className="input border border-gray-300 rounded-md p-2 w-full"
					placeholder="Enter departure airport"
				>
					<option value="" disabled>
						Select departure airport
					</option>
					{airports?.map((airport, index) => (
						<option key={index} value={airport}>
							{airport}
						</option>
					))}
				</select>
			</div>
			<div className="mb-4">
				<label htmlFor="arrivalAirport" className="block text-sm font-semibold mb-1">Arrival Airport</label>
				<select
					id="Airport"
					value={arrivalAirport}
					onChange={(e) => setArrivalAirport(e.target.value)}
					className="input border border-gray-300 rounded-md p-2 w-full"
					placeholder="Enter arrival aiport"
				>
					<option value="" disabled>
						Select arrival airport
					</option>
					{airports?.map((airport, index) => (
						<option key={index} value={airport}>
							{airport}
						</option>
					))}
				</select>
			</div>

			<div className="mb-4">
				<label htmlFor="transferAirports" className="block text-sm font-semibold mb-1">Transfer Airports</label>
				<div className="flex items-center">
					<select
						id="transferAirports"
						value={newTransferAirport}
						onChange={(e) => setNewTransferAirport(e.target.value)}
						className="input border border-gray-300 rounded-md p-2 w-full"
						placeholder="Enter transfer airport"
					>
						<option value="" disabled>
							Select additional airport
						</option>
						{airports?.map((airport, index) => (
							<option key={index} value={airport}>
								{airport}
							</option>
						))}
					</select>
					<button
						type="button"
						onClick={handleAddTransferAirport}
						className="btn btn-primary ml-2"
					>
						Add Transfer Airport
					</button>
				</div>
				{transferAirports.map((airport, index) => (
					<div key={index} className="mt-2 flex items-center">
						<span className="mr-2">{index + 1}.</span>
						<span>{airport}</span>
					</div>
				))}
			</div>
			<button type="submit" className={`btn btn-primary w-full relative ${isSubmitting && 'animate-pulse'}`} disabled={!isFormValid() || isSubmitting}>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</button>
		</form>
	);
};

export default FlightForm;
