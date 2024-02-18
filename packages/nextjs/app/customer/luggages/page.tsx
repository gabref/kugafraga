"use client";

import { NextPage } from "next";
import { FlightInfo } from "../trackingfee/_components/FlightInformation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { LuggageCard } from "./_components/LuggageCard";

const StatusPage: NextPage = () => {
	const [isLoadingStatus, setIsLoadingStatus] = useState(true);
	const [flightInfo, setFlightInfo] = useState<FlightInfo[]>([]);
	const [luggageStatus, setLuggageStatus] = useState<string[]>([]);

	// THIS SHOULD DO THE QUERY TO SUBGRAPH TO GET THE LUGGAGE STATUS
	const getLuggageStatus = async (): Promise<string[]> => {
		// Simulate a delay and then return a random status
		// if the status is null, it means that the luggage was not found
		await new Promise(resolve => setTimeout(resolve, 2000));
		return ['Onboard Flight', 'Luggage Lost'];
	};

	// gets the flight info from local storage
	// should take this also from the subgraph
	function getFlightInfoFromStorage(): FlightInfo | null {
		if (typeof window !== 'undefined') {
			const fromLocalStorage = window.localStorage.getItem('flightInfoStorage')
			if (fromLocalStorage === null || fromLocalStorage === undefined)
				return null;
			return JSON.parse(fromLocalStorage) as FlightInfo;
		}
		return null;
	}

	useEffect(() => {
		getLuggageStatus()
			.then(status => {
				if (status === null) return;
				setLuggageStatus(prev => [...prev, ...status]);
				setIsLoadingStatus(false);
			})
			.catch(error => {
				console.error("Error fetching luggage status:", error);
				setIsLoadingStatus(false);
			});

		const flightInfo = getFlightInfoFromStorage();
		if (!flightInfo) return;
		setFlightInfo(prev => [...prev, flightInfo]);
	}, []);

	return (
		<div className="container mx-auto">
			{isLoadingStatus ? <p className="text-center text-blue-500 font-bold mt-4">Loading...</p> : (
				<>
					{flightInfo.map((info, index) => (
						<LuggageCard key={index} flightInfo={info} luggageStatus={luggageStatus[index]} />
					))}
				</>
			)}
		</div>
	);
}

export default StatusPage;
