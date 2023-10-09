import hre, { run } from "hardhat";
import Table from "cli-table3";

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const { ethers } = hre
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const InklusivaEstudologiaFactory = await ethers.getContractFactory("InklusivaEstudologiaFactory");
  const inklusivaEstudologia = await InklusivaEstudologiaFactory.deploy();

  await inklusivaEstudologia.waitForDeployment();

  console.log("InklusivaEstudologia contract deployed to:", inklusivaEstudologia.target);

  const table = new Table();
  table.push(
    { "Owner": deployer.address },
    { "Contract": inklusivaEstudologia.target }
  )

  console.log(table.toString());

  console.log('Waiting for 2 minutes before verifying contract...');

  // Wait for 2 minutes (120000 milliseconds) before proceeding
  await wait(120000);

  console.log('Verifying contract...');

  await run(`verify:verify`, {
    address: inklusivaEstudologia.target,
    constructorArguments: []
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);

  });
