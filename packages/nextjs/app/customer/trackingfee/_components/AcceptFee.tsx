"use client"

import { useState } from "react";
import { useAccount } from "wagmi";
import { ModalRedirectButton } from "~~/components/ModalRedirectButton";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const AcceptFee = ({ airports }: { airports: string[]}) => {
	const { address: connectedAddress } = useAccount();
	const [showThanks, setShowThanks] = useState(false);

	const { writeAsync, isLoading } = useScaffoldContractWrite({
		contractName: "KGFGTokenFactory",
		functionName: "createToken",
		args: [connectedAddress, airports],
		onBlockConfirmation: txnReceipt => {
			console.log("📦 Transaction blockHash", txnReceipt.blockHash);
			// once the transaction has confirmed, show the thank you message after a delay
			setShowThanks(true);
		},
	});

	return (
		<>
			{!showThanks ? (
				<>
					<button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
						{isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
					</button>
				</>
			) : (
				<>
					{showThanks &&
						<ModalRedirectButton
							to='/customer/luggages'
							btnText='Go to Tracking Luggages Page'
							bodyText='Thank you for choosing us!'
							title='Thank you for choosing us!'
						/>
					}
				</>
			)}
		</>
	);
};
