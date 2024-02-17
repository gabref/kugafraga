"use client"

import { NextPage } from "next";
import { FlightInformation } from "./_components/FlightInformation";

const TrackingFee: NextPage = () => {
	return (
		<div className="container mx-auto" key='tracking-fee'>
			<h1 className="text-3xl font-bold text-center mt-8 mb-4" key='flight-booking-title'>Flight Booking</h1>
			<FlightInformation />
		</div>
	)
}

export default TrackingFee;
