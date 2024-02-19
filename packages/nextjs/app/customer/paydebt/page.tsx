"use client";

import { ethers } from "ethers";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { parseEther } from "viem";
import { GenericButton } from "~~/components/GenericButton";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CheckPoint: NextPage = () => {
	const [scanning, setScanning] = useState(false);
	const [etherDebt, setEtherDebt] = useState<string | null>(null);
	const [qrData, setQrData] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	if (error) {
		return <div>{error}</div>;
	}

	const { writeAsync, isLoading } = useScaffoldContractWrite({
		contractName: "AirportsManager",
		functionName: "payBackDebt",
		args: [qrData?.trim()],
		value: parseEther(etherDebt || "0"),
		onBlockConfirmation: txnReceipt => {
			console.log("📦 Transaction blockHash", txnReceipt.blockHash);
			// once the transaction has confirmed, show the thank you message after a delay
			// setTimeout(() => {
			// 	setShowThanks(true);
			// }, 2000); // 2 seconds
		},
	});

	const { data: debtData, isLoading: isLoadingDebt } = useScaffoldContractRead({
		contractName: "AirportsManager",
		functionName: "calculateTotalDebt",
		args: [qrData?.trim()],
		watch: true,
	});


	const handleApiCall = async () => {
		try {
			console.log('qrData', qrData);
			if (debtData)
			{
				if (debtData.total > 0)
				{
					const debtInEther = ethers.formatEther(debtData.total * (10n ** 9n));
					setEtherDebt(debtInEther);
				}
			}
			setQrData(null);
		} catch (error) {
			console.error("Error:", error);
			setError("Failed to make API call");
		}
	};

	useEffect(() => {
		if (qrData) {
			handleApiCall();
		}
		if (etherDebt) {
			writeAsync();
		}
	}, [qrData, etherDebt]);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold mb-4">Check Point</h1>
			{scanning && (
				<div className="w-80 mb-8">
					<QrReader
						className="lg:h-[400px] lg:w-[400px] h-[300px] w-[300px]"
						onResult={(result, error) => {
							if (!!result && scanning) {
								console.log('result', result?.toString());
								setQrData(result?.toString());
								setScanning(false);
							}
							if (!!error)
								console.log('error', error);
						}}
						constraints={{ facingMode: "environment" }}
					/>
				</div>
			)}
			{(isLoading && qrData && !scanning) ? (
				<>
					<p>Info Read: {qrData}</p>
					<p>Loading....</p>
				</>
			) : (
				<GenericButton onClick={() => setScanning(!scanning)} text={scanning ? 'Stop Scan' : 'Start Scan'} />
			)}
			{isLoadingDebt && <p>Loading Debt...</p>}
			{etherDebt && <p>Debt: {etherDebt} ETH</p>}
			{error && <p className="text-red-500 m-10">{error}</p>}
		</div>
	);
};

export default CheckPoint;
