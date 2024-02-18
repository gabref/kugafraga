"use client"

import { useEffect, useState } from "react";
import { AcceptFee } from "./AcceptFee";
import { GenericButton } from "~~/components/GenericButton";

export type FlightInfo = {
	flightNumber: string;
	departureTime: string;
	arrivalTime: string;
	airports: string[];
};

export const FlightInformation = () => {
	const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);

	function getFlightInfoFromStorage(): FlightInfo | null {
		if (typeof window !== 'undefined') {
			const fromLocalStorage = window.localStorage.getItem('flightInfoStorage')
			if (fromLocalStorage === null || fromLocalStorage === undefined)
				return null;
			return JSON.parse(fromLocalStorage) as FlightInfo;
		}
		return null;
	}

	function deleteFlightInfoFromStorage() {
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem('flightInfoStorage');
		}
	}

	useEffect(() => {
		const flightInfo = getFlightInfoFromStorage();
		if (!flightInfo) return;
		setFlightInfo(flightInfo);
	}, [])

	// Mock fee expectations
	const feeExpectations = [
		{ description: 'Luggage Fee', amount: '$20' },
		{ description: 'Seat Selection Fee', amount: '$10' },
		{ description: 'In-flight Meal Fee', amount: '$15' },
	];


	// Calculate total fee
	const totalFee = feeExpectations.reduce((total, fee) => total + parseFloat(fee.amount.slice(1)), 0);

	return (
		<div key='main-trackingfee'>
			{flightInfo ? (
				<div className="flex justify-center items-start mt-8" key='key-page'>
					<div className="w-1/2 pr-8" key='flight-booking'>
						<h2 className="text-2xl font-bold mb-4" key='flight-info'>Flight Information</h2>
						<div className="mb-2" key='info'>
							<p><span className="font-semibold" key='fligh'>Flight Number:</span> {flightInfo.flightNumber}</p>
							<p><span className="font-semibold" key='departure-time'>Departure Time:</span> {flightInfo.departureTime}</p>
							<p><span className="font-semibold" key='arrival-time'>Arrival Time:</span> {flightInfo.arrivalTime}</p>
							<p><span className="font-semibold" key='departure-air'>Departure Airport:</span> {flightInfo.airports[0]}</p>
							{(flightInfo.airports.length > 2) && (
								<div key='transfer-airports'>
									{flightInfo.airports.slice(1, -1).map((airport, idx) => (
										<p><span className="font-semibold" key={`trasfer-air${idx}`}>Transfer Airport:</span> {airport}</p>
									))}
								</div>
							)}
							<p><span className="font-semibold" key='arrival-air'>Arrival Airport:</span> {flightInfo.airports[flightInfo.airports.length - 1]}</p>
						</div>
					</div>
					<div className="w-1/2 pl-8 border-l-2 border-gray-200" key='left-side'>
						<h2 className="text-2xl font-bold mb-4" key='key-exp'>Fee Expectations</h2>
						<ul className="mb-2">
							{feeExpectations.map((fee, index) => (
								<li key={`fee-desc-li-${index}`}>
									<span className="font-semibold" key={`fee-desc-${index}`}>{fee.description}:</span> {fee.amount}
								</li>
							))}
						</ul>
						<p className="font-semibold" key='total-fee'>Total Fee: ${totalFee.toFixed(2)}</p>
						<AcceptFee airports={flightInfo.airports} />
						<GenericButton
							text="Delete Flight Info - This is just for debug purposes, delete later"
							onClick={deleteFlightInfoFromStorage} />
					</div>
				</div>
			) : (<p key='no-info'>No flight information found</p>)}
		</div>
	);
}
