// import DappNotes from '../../blockchain/src/artifacts/contracts/DappNotes.sol/DappNotes.json';
import { readFile } from 'fs/promises';


const path = new URL('../../blockchain/src/artifacts/contracts/DappNotes.sol/DappNotes.json', import.meta.url);
const file = await readFile(path, 'utf8');
const contractJson = JSON.parse(file);
// const contractJson = JSON.parse(await readFile(new URL('../../blockchain/src/artifacts/contracts/DappNotes.sol/DappNotes.json', import.meta.url)));


export default
{
    maxFileSizeKb: 1000,
    alchemyRopstenKey: process.env.ALCHEMY_ROPSTEN_KEY,
    contract: contractJson,
    contractAddress: ""
}