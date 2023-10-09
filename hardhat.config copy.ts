import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
require('dotenv').config(); // To load environment variables from a .env file

const { PRIVATE_KEY, MATIC_RPC_URL, SEPOLIA_RPC_URL } = process.env;

module.exports = {
  networks: {
    mumbai: {
      url: MATIC_RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY], // Add your private key here
    },
    sepolia: {
      url: SEPOLIA_RPC_URL || "https://rpc2.sepolia.org",
      accounts: [PRIVATE_KEY], // Add your private key here
    }
  },
  etherscan: {
    apiKey: "IUFVXWPB8RN7NCJ1QTTYZCXX1755WV4V2D",
  },
  solidity: {
    version: "0.8.9", // Your desired Solidity compiler version
  },
};

//https://eth-sepolia.g.alchemy.com/v2/nNguqH9FvZx6tnBYErtZ-v4FjMBV4Lsc
//sepolia IUFVXWPB8RN7NCJ1QTTYZCXX1755WV4V2D
// mumbai HWRGSZR32UM5BT42X1IIJN5YPCT7EYWREN







