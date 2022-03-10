const hre = require("hardhat");
const fs = require('fs');
const { ethers } = require("hardhat");
async function main()
{
    await hre.run('compile');

    const [deployer] = await ethers.getSigners();


    const DappNotes = await hre.ethers.getContractFactory("DappNotes");
    const dappnotes = await DappNotes.deploy();

    await dappnotes.deployed();

    const deployment = {deploymentAddress: dappnotes.address, ownerAddress: deployer.address, networkName: hre.network.name};
    const deploymentString = JSON.stringify(deployment);
    fs.writeFileSync('deployment.json', deploymentString);

    console.log("DappNotes networkName:", deployment.networkName);
    console.log("DappNotes ownerAddress:", deployment.ownerAddress);
    console.log("DappNotes deployed to:", deployment.deploymentAddress);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
