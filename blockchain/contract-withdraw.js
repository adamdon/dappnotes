const hre = require("hardhat");
const fs = require('fs');

async function main()
{

    const DappNotes = await hre.ethers.getContractFactory("DappNotes");
    const deploymentText = fs.readFileSync("deployment.json", 'utf8' )
    const deploymentObject = JSON.parse(deploymentText.toString());
    console.log("deploymentText", deploymentText);
    console.log("deploymentObject", deploymentObject);

    const dappnotes = await DappNotes.attach(deploymentObject.address);




    const result = await dappnotes.withdraw();

    console.log("DappNotes withdraw method ran ", result);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
