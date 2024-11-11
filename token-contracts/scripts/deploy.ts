import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ChargeContract = await ethers.getContractFactory("ChargeContract");
  const contract = await ChargeContract.deploy(1000000); // 1 millón de Wicoins
  const dataInfo = await contract.getAddress();

  console.log("Contract deployed at:", dataInfo);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
