import QRCode from "react-qr-code";
import { FlightInfo } from "../../trackingfee/_components/FlightInformation";

export const LuggageCard = ({ flightInfo, luggageStatus }:
	{ flightInfo: FlightInfo, luggageStatus: string | null }) => {
	return (
        <div className="bg-primary shadow-md rounded-lg p-6 mb-8 w-3/12 m-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Luggage Status</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${luggageStatus === 'Onboard Flight' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>{luggageStatus}</span>
            </div>
            <QRCode value={flightInfo.flightNumber} size={128} className="mb-4" />
            <div className="mb-4">
                <p className="font-semibold">Flight Number:</p>
                <p>{flightInfo.flightNumber}</p>
            </div>
            <div className="mb-4">
                <p className="font-semibold">Departure Airport:</p>
                <p>{flightInfo.airports[0]}</p>
            </div>
            <div className="mb-4">
                <p className="font-semibold">Arrival Airport:</p>
                <p>{flightInfo.airports[flightInfo.airports.length - 1]}</p>
            </div>
            <div className="mb-4">
                <p className="font-semibold">Transfers:</p>
                <p>{flightInfo.airports.slice(1, -1).join(', ')}</p>
            </div>
        </div>
	);

}
