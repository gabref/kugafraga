"use client";

import { useState } from "react";

export const FormNewCheckPoint = () => {
	const [checkpointName, setCheckpointName] = useState("");
	const [location, setLocation] = useState("");
	const [selectedAirport, setSelectedAirport] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isFormValid = () => {
		return checkpointName !== '' && location !== '' && selectedAirport !== '';
	};

	const airports = queryPartersAirports();

	function queryPartersAirports(): string[] {
		// Query the partners airports
		const airportsCodes = ["LAX", "JFK", "SFO", "MIA", "ORD"];
		return airportsCodes;
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitting checkpoint:", { checkpointName, location, selectedAirport });
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setCheckpointName('');
			setLocation('');
			setSelectedAirport('');
		}, 2000);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="selectedAirport" className="block font-semibold">
					Select Airport:
				</label>
				<select
					id="selectedAirport"
					value={selectedAirport}
					onChange={(e) => setSelectedAirport(e.target.value)}
					className="input"
				>
					<option value="">Select Airport</option>
					{airports.map((airport) => (
						<option key={airport} value={airport}>
							{airport}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor="checkpointName" className="block font-semibold">Checkpoint Name:</label>
				<input
					type="text"
					id="checkpointName"
					value={checkpointName}
					onChange={(e) => setCheckpointName(e.target.value)}
					className="input"
					placeholder="Enter checkpoint name"
				/>
			</div>
			<div>
				<label htmlFor="location" className="block font-semibold">Location:</label>
				<input
					type="text"
					id="location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					className="input"
					placeholder="Enter location"
				/>
			</div>
			<button type="submit" className={`btn btn-primary relative ${isSubmitting && 'animate-pulse'}`} disabled={!isFormValid() || isSubmitting}>
				{isSubmitting ? 'Submitting...' : 'Register Checkpoint'}
			</button>
		</form>
	);
}
