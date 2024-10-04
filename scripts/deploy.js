const hre = require("hardhat");

async function main() {
  const StudentPortal = await hre.ethers.getContractFactory("StudentPortal");

  console.log("Deploying StudentPortal...");
  const studentPortal = await StudentPortal.deploy();

  await studentPortal.waitForDeployment();

  const studentPortalAddress = await studentPortal.getAddress();

  console.log("StudentPortal deployed to:", studentPortalAddress);

  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await studentPortal.deploymentTransaction().wait(5);
    
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address: studentPortalAddress,
      constructorArguments: [],
    });
  }
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });