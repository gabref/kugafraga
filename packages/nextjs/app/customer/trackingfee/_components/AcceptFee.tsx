"use client"

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { ForwardPageButton } from "~~/components/ForwardPageButton";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const AcceptFee = () => {
	const [newGreeting, setNewGreeting] = useState("");
	const [showThanks, setShowThanks] = useState(false);

	const { writeAsync, isLoading } = useScaffoldContractWrite({
		contractName: "YourContract",
		functionName: "setGreeting",
		args: [newGreeting],
		value: parseEther("0.01"),
		onBlockConfirmation: txnReceipt => {
			console.log("📦 Transaction blockHash", txnReceipt.blockHash);
			// once the transaction has confirmed, show the thank you message after a delay
			setTimeout(() => {
				setShowThanks(true);
			}, 2000); // 2 seconds
		},
	});

	return (
		<>
			{!showThanks ? (
				<>
					<input
						type="text"
						placeholder="Write your greeting"
						className="input border border-primary"
						onChange={e => setNewGreeting(e.target.value)}
					/>
					<button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
						{isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
					</button>
				</>
			) : (
				<>
					<p>Thank you for choosing us!</p>
					<ForwardPageButton to={'/customer/status'} innerText={'Go to Status Page'} />
				</>
			)}
		</>
	);
};
