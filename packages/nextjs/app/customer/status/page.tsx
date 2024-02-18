"use client";

import { NextPage } from "next";
import { FlightInfo } from "../trackingfee/_components/FlightInformation";
import { useEffect, useState } from "react";

const StatusPage: NextPage = () => {
	const [isLoadingStatus, setIsLoadingStatus] = useState(true);
	const [luggageStatus, setLuggageStatus] = useState<string | null>(null);

	// Example flight and luggage status data
	const flightInfo: FlightInfo = {
		flightNumber: 'XY123',
		departureTime: '12:00 PM',
		arrivalTime: '2:00 PM',
		airports: ['JFK', 'LAX']
	};

  const getLuggageStatus = async (): Promise<string | null> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const random = Math.random() * 10;
	console.log('random:', random)
    return random > 5 ? 'Onboard Flight' : null;
  };
 
  useEffect(() => {
    getLuggageStatus()
      .then(status => {
        setLuggageStatus(status);
        setIsLoadingStatus(false);
      })
      .catch(error => {
        console.error("Error fetching luggage status:", error);
        setIsLoadingStatus(false);
      });
  }, []);

	return (
		<div className="container mx-auto">
			{isLoadingStatus ? <p className="text-center text-blue-500 font-bold mt-4">Loading...</p> : (
				<>
					{luggageStatus === null ?
						<p className="text-center text-red-500 font-bold mt-4">No luggage found</p> :
						(
							<>
								<h1 className="text-3xl font-bold text-center mt-8 mb-4">Track Luggage Status</h1>
								<div className="shadow-md rounded-md p-6">
									<h2 className="text-xl font-bold mb-4">Flight Information</h2>
									<p><span className="font-semibold">Flight Number:</span> {flightInfo.flightNumber}</p>
									<p><span className="font-semibold">Departure Time:</span> {flightInfo.departureTime}</p>
									<p><span className="font-semibold">Arrival Time:</span> {flightInfo.arrivalTime}</p>
									<p><span className="font-semibold">Airports:</span> {flightInfo.airports.join(' - ')}</p>
								</div>
								<div className="shadow-md rounded-md p-6 mt-4">
									<h2 className="text-xl font-bold mb-4">Luggage Status</h2>
									<p>{luggageStatus}</p>
								</div>
							</>
						)}
				</>
			)}
		</div>
	);
}

export default StatusPage;
