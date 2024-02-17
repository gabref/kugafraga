"use client";

import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ConnectButton, WalletButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ForwardPageButton } from "~~/components/ForwardPageButton";
import { GenericButton } from "~~/components/GenericButton";
import { Address } from "~~/components/scaffold-eth";
import { FlightInfo } from "./trackingfee/_components/FlightInformation";

const Customer: NextPage = () => {
	const { address: connectedAddress } = useAccount();

	function handleCheckinClick() {
		// Mock flight information
		const flightInfo: FlightInfo = {
			flightNumber: 'XY123',
			departureTime: '12:00 PM',
			arrivalTime: '2:00 PM',
			airports: ['ABC', 'JFK', 'WHATEVER', 'DEF'],
		};
		if (typeof window !== 'undefined')
			window.localStorage.setItem('flightInfoStorage', JSON.stringify(flightInfo));
	}

	// page that will scan the QR code and call the contract to change the state of the contract
	return (
		<div>
			{/* if customer is not connected, that ask to connect
			if customer is connected, than forward to next page */}
			<div className="flex items-center flex-col flex-grow pt-10">
				<div className="px-5">
					<h1 className="text-center">
						<span className="block text-2xl mb-2">Welcome to</span>
						<span className="block text-4xl font-bold">KUGAFRAGA</span>
					</h1>
					<div className="flex justify-center items-center space-x-2">
						<p className="my-2 font-medium">Connected Address:</p>
						<Address address={connectedAddress} />
					</div>
				</div>

				<div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
					{connectedAddress ?
						<div>
							<GenericButton text={'Online Checking'} onClick={handleCheckinClick} />
							<ForwardPageButton innerText={'Subscribe to Tracking'} to={'customer/trackingfee'} />
						</div> : <ConnectButton />}
				</div>
			</div>
		</div>
	)
}

export default Customer;
