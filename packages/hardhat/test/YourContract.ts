import { expect } from "chai";
import { ethers } from "hardhat";
import { AirportsManager, KGFGTokenFactory } from "../typechain-types";

describe("AirportsManager", function () {
  // We define a fixture to reuse the same setup in every test.


  let tokenFactory: KGFGTokenFactory;
  before(async () => {
    const tokenFactoryFactory = await ethers.getContractFactory("KGFGTokenFactory");
    tokenFactory = (await tokenFactoryFactory.deploy()) as KGFGTokenFactory;
    await tokenFactory.waitForDeployment();
  });
  
  let airportsManager: AirportsManager;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const airportsManagerFactory = await ethers.getContractFactory("AirportsManager");
    airportsManager = (await airportsManagerFactory.deploy(owner.address, tokenFactory.getAddress())) as AirportsManager;
    await airportsManager.waitForDeployment();
  });

  describe("Airports Manager", function () {
    it("Should set the factory address", async function () {
      expect(await airportsManager.retrieveFactoryAddress()).to.equal(await tokenFactory.getAddress());
    });

    // it("Should create a new token", async function () {
		
    // });
  });
});
