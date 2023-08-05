import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ZeroAddress } from "ethers";

describe("Certificado NFT", () => {
  const deployNFT = async (): Promise<any> => {
    try {
      const [owner, otherAccount] = await ethers.getSigners()
      const NFT = await ethers.getContractFactory("InklusivaEstudologia")
      //@ts-ignore
      const nft = await NFT.deploy("MyNFT", "NFT", owner.address)
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
      const balance = await nft.balanceOf(owner.address)
      expect(balance).to.equal(BigInt(1))
    })
  })

  describe("Balance after second mint", async (): Promise<void> => {
    it("Should return the balance of the owner as 1n", async () => {
      const { nft, owner } = await loadFixture(deployNFT)
      const [ tx0, tx1 ] = await Promise.all([nft.mint(owner.address), nft.mint(owner.address)])
      const balance = await nft.balanceOf(owner)
      expect(balance).to.equal(BigInt(2))
    })
  })

  describe("Token owner", async (): Promise<void> => {
    it("Should confirm ownership of token 0 and token 1", async () => {
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

  describe("Token transfer", async (): Promise<void> => {
    it("Should confirm the transfer of ownership of tokenID 0 from owner to otherAccount", async () => {
      const { nft, owner, otherAccount } = await loadFixture(deployNFT)
      const tx0 = await nft.mint(owner);
      tx0.wait()
      const tx1 = await nft.transferFrom(owner.address, otherAccount.address, BigInt(0))
      tx1.wait()
      const balanceOther = await nft.balanceOf(otherAccount.address)
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
