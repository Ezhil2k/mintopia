
const {expect} = require("chai")
const { ethers } = require('hardhat');
const {parseEther} = require('ethers');

describe ("mintopia", function() {
  it("should mint and transfer nft to someone who pays", async function() {
    const Mintopia = await ethers.getContractFactory("mintopia");
    const mintopia = await Mintopia.deploy();
    await mintopia.waitForDeployment();

    [owner, addr1, addr2] = await ethers.getSigners();
    const recepient = addr1;
    const metadataUri = "";

    let balance = await mintopia.balanceOf(recepient);
    expect(balance).to.equal(0);

    const minting = await mintopia.payToMint(recepient,metadataUri,{value: parseEther("0.05")})

    await minting.wait();

    balance = await mintopia.balanceOf(recepient);
    expect(balance).to.equal(1);
    expect(await mintopia.isContentOwned(metadataUri)).to.equal(true);

    expect(await mintopia.count()).to.equal(1);
  })
})