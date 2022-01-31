const hre = require("hardhat");
const fs = require('fs');

async function main()
{
    await hre.run('compile');

    const DappNotes = await hre.ethers.getContractFactory("DappNotes");
    const dappnotes = await DappNotes.deploy();

    await dappnotes.deployed();

    const deployment = {address: dappnotes.address};
    const deploymentString = JSON.stringify(deployment);
    fs.writeFileSync('deployment.json', deploymentString);

    console.log("DappNotes deployed to:", dappnotes.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
