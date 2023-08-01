import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Certificado NFT", () => {
  const deployNFT = async (): Promise<any> => {
    try {
      const [owner, otherAccount] = await ethers.getSigners()
      const NFT = await ethers.getContractFactory("InklusivaEstudologia")
      const nft = await NFT.deploy("MyNFT", "NFT")
      const nftAddress = await nft.getAddress()
      return { nft, nftAddress, owner, otherAccount }
    } catch (error: any) {
      console.log(error.message, 'for deplotNFT')
    }
  }

  describe("Deployment", async (): Promise<void> => {
    it("Should return three addressses as string with regex according to an ethereum address", async () => {
      const { nft, nftAddress } = await loadFixture(deployNFT)
      const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/
      expect(ethereumAddressRegex.test(nftAddress)).to.equal(true)
    })
  })

  describe("Balance before mint", async (): Promise<void> => {
    it("Should return the balance of the owner as equal to 0n", async () => {
      const { nft, owner } = await loadFixture(deployNFT)
      const balance = await nft.balanceOf(owner)
      expect(balance).to.equal(BigInt(0))
    })
  })

  describe("Balance after first mint", async (): Promise<void> => {
    it("Should return the balance of the owner as 1n", async () => {
      const { nft, owner } = await loadFixture(deployNFT)
      const tx = await nft.mint(owner)
      tx.wait()
      const balance = await nft.balanceOf(owner)
      expect(balance).to.equal(BigInt(1))
    })
  })

  describe("Balance after second mint", async (): Promise<void> => {
    it("Should return the balance of the owner as 2n", async () => {
      const { nft, owner } = await loadFixture(deployNFT)
      const [ tx0, tx1 ] = await Promise.all([nft.mint(owner), nft.mint(owner)])
      const balance = await nft.balanceOf(owner)
      expect(balance).to.equal(BigInt(2))
    })
  })

  describe("Token owner", async (): Promise<void> => {
    it("Should return the balance of the owner as 2n", async () => {
      const { nft, owner } = await loadFixture(deployNFT)
      const [ tx0, tx1 ] = await Promise.all([nft.mint(owner), nft.mint(owner)])
      const balance = await nft.balanceOf(owner)
      let arr = []
      for(let i = 0; i < balance; i++){
        const tokenOwned = await nft.tokenOfOwnerByIndex(owner, i)
        arr.push(tokenOwned)
      }
      expect(arr.length).to.equal(2)
      expect(arr.includes(BigInt(0) && BigInt(1))).to.equal(true)
    })
  })

  describe("Token owner", async (): Promise<void> => {
    it("Should return the balance of the owner as 2n", async () => {
      const { nft, owner, otherAccount } = await loadFixture(deployNFT)
      const tx = await nft.transferFrom(owner, otherAccount)
      tx.wait()
      const balanceOther = await nft.balanceOf(otherAccount)
      expect(balanceOther).to.equal(BigInt(1))
    })
  })

  describe("Should return differents tokenURI independent of the the tokenID", async (): Promise<void> => {
    it("Should set correctly the tokenURI for each token", async () => {
      const tokenURI0 = 'abc'
      const tokenURI1 = 'def'
      const { nft, owner } = await loadFixture(deployNFT)
      const [
        tx0,
        tx1,
        tx2,
        tx3
      ] = await Promise.all([
        nft.mint(owner),
        nft.mint(owner),
        nft.setTokenURI(tokenURI0, 0),
        nft.setTokenURI(tokenURI1, 1),
      ])

      const [
        _tokenURI0,
        _tokenURI1
      ] = await Promise.all([
        nft.tokenURI(BigInt(0)),
        nft.tokenURI(BigInt(1))
      ])
      // const balance = await nft.balanceOf(owner)
      expect(tokenURI0).to.equal(_tokenURI0)
      expect(tokenURI1).to.equal(_tokenURI1)
    })
    })
  })
// describe("Lock", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;

//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await ethers.getSigners();

//     const Lock = await ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }

//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//       );

//       expect(await ethers.provider.getBalance(lock.target)).to.equal(
//         lockedAmount
//       );
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });
