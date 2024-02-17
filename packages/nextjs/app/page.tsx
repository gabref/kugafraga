"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { ForwardPageButton } from "~~/components/ForwardPageButton";

const Home: NextPage = () => {
  return (
    <>
		<ForwardPageButton to="/customer" innerText="Customer" />
		<ForwardPageButton to="/checkpoint" innerText="Check Point" />
    </>
  );
};

export default Home;
