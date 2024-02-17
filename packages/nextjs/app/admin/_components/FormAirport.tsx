"use client";

import { useState } from "react";

export const FormNewAirport = () => {
	const [airportName, setAirportName] = useState("");
	const [country, setCountry] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isFormValid = () => {
		return airportName !== '' && country !== '';
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission here
		console.log("Submitting airport:", { airportName, country });
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setAirportName('');
			setCountry('');
		}, 2000);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="airportName" className="block font-semibold">Airport Name:</label>
				<input
					type="text"
					id="airportName"
					value={airportName}
					onChange={(e) => setAirportName(e.target.value)}
					className="input"
					placeholder="Enter airport name"
				/>
			</div>
			<div>
				<label htmlFor="country" className="block font-semibold">Country:</label>
				<input
					type="text"
					id="country"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					className="input"
					placeholder="Enter country"

				/>
			</div>
			<button type="submit" className={`btn btn-primary relative ${isSubmitting && 'animate-pulse'}`} disabled={!isFormValid() || isSubmitting}>
				{isSubmitting ? 'Submitting...' : 'Register Airport Partner'}
			</button>
		</form>
	);
}
