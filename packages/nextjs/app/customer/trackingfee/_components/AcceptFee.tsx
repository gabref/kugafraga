"use client"

import { useState } from "react";
import { useAccount } from "wagmi";
import { ModalRedirectButton } from "~~/components/ModalRedirectButton";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const AcceptFee = ({ airports }: { airports: string[]}) => {
	const { address: connectedAddress } = useAccount();
	const [showThanks, setShowThanks] = useState(false);

	function deleteFlightInfoFromStorage() {
		if (typeof window !== 'undefined') {
			window.localStorage.removeItem('flightInfoStorage');
		}
	}

	const { writeAsync, isLoading } = useScaffoldContractWrite({
		contractName: "KGFGTokenFactory",
		functionName: "createToken",
		args: [connectedAddress, airports],
		onBlockConfirmation: txnReceipt => {
			console.log("📦 Transaction blockHash", txnReceipt.blockHash);
			// once the transaction has confirmed, show the thank you message after a delay
			deleteFlightInfoFromStorage();
			setShowThanks(true);
		},
	});

	return (
		<>
			{!showThanks ? (
				<div className='mt-8'>
					<button className="btn btn-primary" onClick={() => writeAsync()} disabled={isLoading}>
						{isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
					</button>
				</div>
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
