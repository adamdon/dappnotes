// import DappNotes from '../../blockchain/src/artifacts/contracts/DappNotes.sol/DappNotes.json';
import { readFile } from 'fs/promises';


const contractPath = new URL('../../blockchain/src/artifacts/contracts/DappNotes.sol/DappNotes.json', import.meta.url);
const contractFile = await readFile(contractPath, 'utf8');
const contractJson = JSON.parse(contractFile);

const deploymentPath = new URL('../../blockchain/deployment.json', import.meta.url);
const deploymentFile = await readFile(deploymentPath, 'utf8');
const deploymentJson = JSON.parse(deploymentFile);

export default
{
    debugMode: false,
    maxFileSizeKb: 10000,
    maxCompressedFileSizeKb: 20,
    alchemyRinkebyKey: process.env.ALCHEMY_RINKEBY_KEY,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    deploymentAddress: deploymentJson.deploymentAddress,
    ownerAddress: deploymentJson.ownerAddress,
    networkName: deploymentJson.networkName,
    contract: contractJson,
}