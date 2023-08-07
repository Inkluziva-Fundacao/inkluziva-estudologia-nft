import hre from "hardhat";
import Table from "cli-table3"; // Import Table directly

async function main() {
  const { ethers } = hre
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Import the contract factory with TypeScript typings
  const InklusivaEstudologiaFactory = await ethers.getContractFactory("InklusivaEstudologia");
  const inklusivaEstudologia = await InklusivaEstudologiaFactory.deploy("Inklusiva Estudologia NFT", "INK-EST", deployer.address);

  const deployed = await inklusivaEstudologia.deployed();

  console.log("InklusivaEstudologia contract deployed to:", inklusivaEstudologia.address);

  const table = new Table();
  table.push(
    { "Owner": deployer.address },
    { "Contract": inklusivaEstudologia.address }
  );

  console.log(table.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
