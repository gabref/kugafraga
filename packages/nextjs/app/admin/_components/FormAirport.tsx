"use client";

import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const FormNewAirport = () => {
	const [airportAddress, setAirportAddress] = useState("");
	const [airportCode, setAirportCode] = useState("");
	const [amount, setAmount] = useState<bigint | undefined>(undefined);
	const [percentage, setPercentage] = useState<bigint | undefined>(undefined);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isFormValid = () => {
		return airportCode !== '' && airportAddress !== '';
	};

	const { writeAsync, isLoading } = useScaffoldContractWrite({
		contractName: "AirportsManager",
		functionName: "addAirport",
		args: [airportCode, airportAddress, amount, percentage],
		onBlockConfirmation: txnReceipt => {
			console.log("📦 Transaction blockHash", txnReceipt.blockHash);
			// once the transaction has confirmed, show the thank you message after a delay
			// setTimeout(() => {
			// 	setShowThanks(true);
			// }, 2000); // 2 seconds
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission here

		console.log("Submitting airport:", { airportName: airportCode, country: airportAddress });
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setAirportCode('');
			setAirportAddress('');
		}, 2000);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="airportName" className="block font-semibold">Airport Code:</label>
				<input
					type="text"
					id="airportName"
					value={airportCode}
					onChange={(e) => setAirportCode(e.target.value)}
					className="input"
					placeholder="Enter airport name"
				/>
			</div>
			<div>
				<label htmlFor="address" className="block font-semibold">Airport Wallet Address:</label>
				<input
					type="text"
					id="address"
					value={airportAddress}
					onChange={(e) => setAirportAddress(e.target.value)}
					className="input"
					placeholder="Enter country"
				/>
			</div>
			<div>
				<label htmlFor="amount" className="block font-semibold">Airport Initial Amount:</label>
				<input
					type="number"
					id="amount"
					value={amount == null ? '' : amount.toString()}
					onChange={(e) => setAmount(BigInt(e.target.value))}
					className="input"
					placeholder="Enter initial amount"
				/>
			</div>
			<div>
				<label htmlFor="percentage" className="block font-semibold">Airport Percentage:</label>
				<input
					type="number"
					id="percentage"
					value={percentage == null ? '' : percentage.toString()}
					onChange={(e) => setPercentage(BigInt(e.target.value))}
					className="input"
					placeholder="Enter percentage on contract"
				/>
			</div>
			<button
				className={`btn btn-primary relative ${isSubmitting && 'animate-pulse'}`}
				onClick={() => writeAsync()}
				disabled={!isFormValid() || isSubmitting}>
				{isLoading ? <span className="loading loading-spinner loading-sm">'Submitting...' </span> : 'Register Airport Partner'}
			</button>
		</form>
	);
}
