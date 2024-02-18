"use client";

import { NextPage } from "next";
import { LuggageCard } from "./_components/LuggageCard";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

const LuggagesListPage: NextPage = () => {
	const { address: connectedAddress } = useAccount();

	const { data: tokensInfo, isLoading: isLoadingTokens } = useScaffoldContractRead({
		contractName: "AirportsManager",
		functionName: "retrieveSendersTokens",
		args: [connectedAddress],
		watch: true,
	})

	return (
		<div className="container mx-auto">
			{isLoadingTokens ? <p className="text-center text-blue-500 font-bold mt-4">Loading...</p> : (
				<div className="flex flex-col items-center">
					<h1 className="text-3xl font-bold text-center mt-4">Your Luggage</h1>
					<div className="flex flex-wrap justify-center">
						{tokensInfo ? tokensInfo?.map((token, index) => (
							<LuggageCard
								key={index}
								token={token.owner}
								luggageStatus={token.tokenAddress}
								airports={token.route} />
						)) : (
							<p className="text-center text-blue-500 font-bold mt-4">No luggage found</p>
						)}
					</div>
				</div>
			)}
		</div >
	);
}

export default LuggagesListPage;
