import QRCode from "react-qr-code";

export const LuggageCard = ({ airports, luggageStatus, token }:
	{ airports: readonly string[], luggageStatus: string | null, token: string | null }) => {
	return (
		<div className="bg-primary shadow-md rounded-lg p-6 mb-8 w-full">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold">Luggage Status</h2>
			</div>
			{token && (
				<div className='bg-white '>
				<QRCode value={token} size={250} className="p-3 mb-4" />
				</div>
			)}
			<span className={`px-3 py-1 rounded-full text-sm ${luggageStatus === 'Onboard Flight' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>{luggageStatus}</span>
			<div className="mb-4">
				<p className="font-semibold">Departure Airport:</p>
				<p>{airports[0]}</p>
			</div>
			<div className="mb-4">
				<p className="font-semibold">Arrival Airport:</p>
				<p>{airports[airports.length - 1]}</p>
			</div>
			<div className="mb-4">
				{airports.length > 2 && (
					<>
						<p className="font-semibold">Transfers:</p>
						<p>{airports.slice(1, -1).join(', ')}</p>
					</>
				)}
			</div>
		</div>
	);

}
