const hre = require("hardhat");

async function main() {

  const Mintopia = await hre.ethers.getContractFactory("mintopia");
  const mintopia = await Mintopia.deploy();

  await mintopia.waitForDeployment();


  console.log("Mintopia contract deployed to:", mintopia.target);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });