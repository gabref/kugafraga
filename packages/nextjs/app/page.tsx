"use client";

import type { NextPage } from "next";
import { ForwardPageButton } from "~~/components/ForwardPageButton";

const Home: NextPage = () => {
	return (
		<div className="font-custom container mx-auto px-4 py-8">
			<h1 className="font-custom text-3xl font-bold mb-8 text-center">START TRACKING</h1>
			<div className="font-custom flex flex-col space-y-4 items-center">
				<ForwardPageButton to="/customer" innerText="Customer" />
				<ForwardPageButton to="/checkpoint" innerText="Check Point" />
				<ForwardPageButton to="/admin" innerText="Admin" />
			</div>
		</div>
	);
};

export default Home;
