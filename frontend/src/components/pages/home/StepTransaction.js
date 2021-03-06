import React, {useState} from "react";
import {useData} from "../../utilities/DataContextProvider";
import FadeIn from 'react-fade-in';
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import AnimatedMount from "../../utilities/AnimatedMount";
import ProgressBar from "@ramonak/react-progress-bar";




export default function StepTransaction(props)
{
    const [data, setData] = useData();
    const [isComplete, setIsComplete] = useState(false);
    const [isAlreadyMinted, setIsAlreadyMinted] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [showProgressBar, setShowProgress] = useState(false);
    const [progressPercentage, setProgressPercentage] = useState(0);

    const [gasCostEth, setGasCostEth] = useState("");
    const [feeCostEth, setFeeCostEth] = useState("");
    const [totalCostEth, setTotalCostEth] = useState("");
    const [gasCostUsd, setGasCostUsd] = useState("");
    const [feeCostUsd, setFeeCostUsd] = useState("");
    const [totalCostUsd, setTotalCostUsd] = useState("");
    const [etherscanUrl, setEtherscanUrl] = useState("");














    async function performTransaction()
    {
        let progressUpdaterInterval = null;
        try
        {
            setData({toastMessage: "Transaction starting"});
            setDisabled(true);
            setShowProgress(true);
            setProgressPercentage(prevState => prevState + 5);
            // let detectProvider = await detectEthereumProvider()

            console.log("data.note");
            console.log(data.note);
            console.log(JSON.stringify(data.note));
            console.log("data.note");


            let providerOptions = {};
            let web3Modal = new Web3Modal({providerOptions});
            let instance = await web3Modal.connect();

            let provider = new ethers.providers.Web3Provider(instance);
            let signer = provider.getSigner();
            let addressSigner = await signer.getAddress();
            let accounts = await provider.send("eth_requestAccounts", []);
            let account = accounts[0];
            let balance = await provider.getBalance(account);
            let balanceFormatted = ethers.utils.formatEther(balance);


            let deploymentAddress = data.config.deploymentAddress;
            let contract = new ethers.Contract(deploymentAddress, data.config.contract.abi, signer);
            setProgressPercentage(prevState => prevState + 5);

            let isContentOwned = await contract.isContentOwned(data.ipfsHash);
            setProgressPercentage(prevState => prevState + 5);
            if(!isContentOwned)
            {
                setProgressPercentage(prevState => prevState + 5);

                progressUpdaterInterval = setInterval(() => {
                    setProgressPercentage(prevState => prevState < 95 ? prevState + 1 : prevState);
                }, 1250);

                const connection = contract.connect(signer);
                const connectionAddress = connection.address;
                const result = await contract.mintNote(connectionAddress, data.ipfsHash, JSON.stringify(data.note), {value: ethers.utils.parseEther('0.001'),});
                const receipt = await result.wait();


                const gasUsed = (receipt.cumulativeGasUsed) * (receipt.effectiveGasPrice);
                const gasUsedBigNumber = ethers.BigNumber.from(gasUsed.toString());
                const gasUsedEther = ethers.utils.formatEther(gasUsedBigNumber);
                const value = result.value;
                const valueEther = ethers.utils.formatEther(value);
                const totalCostNumber = Number(gasUsedEther) + Number(valueEther);
                const transactionHash = receipt.transactionHash;
                const etherscanUrl = `${data.config.networkName === "rinkeby" ? "https://rinkeby." : "https://" }etherscan.io/tx/${transactionHash}`;

                setGasCostEth(gasUsedEther);
                setFeeCostEth(valueEther);
                setTotalCostEth(String(totalCostNumber));
                setEtherscanUrl(etherscanUrl);


                try
                {
                    const requestUrl = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
                    const response = await fetch(requestUrl, {method: "GET", headers: {"Content-Type": "application/json"},});
                    const jsonData = await response.json();
                    setProgressPercentage(80);

                    if(jsonData.ethereum.usd)
                    {
                        let ethUsdCost = Number(jsonData.ethereum.usd);
                        let prefixText = "(USD $"

                        let currentGasCostUsd = (ethUsdCost * gasUsedEther);
                        let currentFeeCostUsd = (ethUsdCost * valueEther);
                        let currentTotalCostUsd = (Number(ethUsdCost) * (Number(gasUsedEther) + Number(valueEther)));

                        setGasCostUsd(prefixText + String(currentGasCostUsd.toFixed(2)) + ")");
                        setFeeCostUsd(prefixText + String(currentFeeCostUsd.toFixed(2)) + ")");
                        setTotalCostUsd(prefixText + String(currentTotalCostUsd.toFixed(2)) + ")");
                    }
                    else
                    {
                        clearInterval(progressUpdaterInterval);
                        setData({toastError: "Could not load ETH/USD conversion rate. Error: " + JSON.stringify(jsonData)});
                    }
                }
                catch (error)
                {
                    clearInterval(progressUpdaterInterval);
                    console.error(error);
                    setData({toastError: "Could not load ETH/USD conversion rate. Error: " + error.message});
                }

                clearInterval(progressUpdaterInterval);
                setProgressPercentage(100);
                setIsComplete(true);
            }
            else
            {
                clearInterval(progressUpdaterInterval);
                setData({toastError: "Content Already Minted"});
                setProgressPercentage(100);
                setIsAlreadyMinted(true);
            }
        }
        catch (error)
        {
            if(progressUpdaterInterval) clearInterval(progressUpdaterInterval);
            if(error.data)
            {
                if(error.data.code && error.data.code === -32603)
                {
                    const contractError = error.data.message.split("reverted with reason string ").pop().slice(1,-1);

                    if(contractError === "Note Already Minted")
                    {
                        setData({toastError: contractError});
                    }
                    else
                    {
                        console.error(contractError);
                        setData({toastError: error.data.message});
                    }
                }
                else
                {
                    console.error(error);
                    setData({toastError: error.message});
                }
            }
            else
            {
                console.error(error);
                setData({toastError: error.message});
            }
        }
    }


    async function copyLinkOnClick()
    {
        await navigator.clipboard.writeText(("/view/" + data.ipfsHash));
        setData({toastMessage: "Link copied to clipboard"});
    }




    function previousOnClick()
    {
        props.previousStep();
    }

    async function nextOnClick()
    {
        if(isComplete)
        {
            props.nextStep();
        }
        else
        {
            setData({toastMessage: "Perform Transaction"})
        }
    }

    return (
        <div>
            <h5 className="display-10">Perform Transaction</h5>



            <div className={!showProgressBar ? "visible" : "d-none"} >
                <div className="my-3 text-center" >
                    <div className="d-grid gap-2" role="group" aria-label="Submit">
                        <button onClick={performTransaction} disabled={disabled} type="button" className="btn btn-dark">
                            <span><i className="fa fa-plug"></i> Perform Transaction</span>
                        </button>
                    </div>
                </div>
            </div>



            <div className={" m-0"}>
                <ProgressBar className={showProgressBar ? "visible" : "invisible"} completed={progressPercentage} bgColor={"green"} baseBgColor={'#3a4b6d'} borderRadius={'5px'}/>
            </div>



            <AnimatedMount show={isComplete}>

                <div className="text-center rounded-3 py-3 my-3" style={{backgroundSize: "cover", backgroundImage: `url('${data.imageDataUri}')`}}>
                    <FadeIn transitionDuration={500} delay={250}>

                        <table className="table table-sm table-hover bg-primary table-borderless table-fit d-inline-block m-0 pb-1 rounded-3">
                            <thead>
                                <tr className="table-active">
                                    <th className="text-center text-light" colSpan={2}>Successful Transaction Details</th>
                                </tr>
                            </thead>
                            <tbody className="">

                                <tr className="table-active">
                                    <td className="text-end text-light px-3">Gas Cost <i className="fa fa-car"></i> :</td>
                                    <td className="text-start text-light px-3">{`ETH ${Number(gasCostEth).toFixed(4)} ${gasCostUsd}`}</td>
                                </tr>

                                <tr className="table-active">
                                    <td className="text-end text-light px-3">Fee Cost <i className="fa fa-ticket"></i> :</td>
                                    <td className="text-start text-light px-3">{`ETH ${Number(feeCostEth).toFixed(4)} ${feeCostUsd}`}</td>
                                </tr>

                                <tr className="table-active">
                                    <td className="text-end text-light px-3">Total Cost <i className="fa fa-flag-checkered"></i> :</td>
                                    <td className="text-start  text-light font-weight-bold px-3">{`ETH ${Number(totalCostEth).toFixed(4)} ${totalCostUsd}`}</td>
                                </tr>


                            </tbody>
                        </table>
                    </FadeIn>

                </div>

                <FadeIn transitionDuration={500} delay={250}>
                    <div className="my-3 text-center">
                        <div className="d-grid gap-2" role="group" aria-label="Submit">
                            <a href={"/view/" + data.ipfsHash} target="_blank" rel="noopener noreferrer" type="button" className="btn btn-success">
                                <span><i className="fa fa-external-link"></i> View Note Content</span>
                            </a>
                            <a href={etherscanUrl} target="_blank" rel="noopener noreferrer" type="button" className="btn btn-success">
                                <span><i className="fa fa-external-link"></i> View Transaction on Block Explorer</span>
                            </a>
                        </div>
                    </div>
                </FadeIn>



            </AnimatedMount>


            <AnimatedMount show={isAlreadyMinted}>
                <div className="my-3 text-center">
                    <div className="d-grid gap-2" role="group" aria-label="Submit">
                        <a href={"/view/" + data.ipfsHash} target="_blank" rel="noopener noreferrer" type="button" className="btn btn-success">
                            <span><i className="fa fa-external-link"></i> View Note Content</span>
                        </a>
                    </div>
                </div>
            </AnimatedMount>


            {/*<div className="mt-3 text-center fixed-bottom">*/}
            {/*    <div className="d-grid gap-2" role="group" aria-label="Submit">*/}
            {/*        <div className="btn-group" role="group">*/}
            {/*            /!*<button onClick={previousOnClick} disabled={false} type="button" className="btn btn-danger">Previous</button>*!/*/}
            {/*            <button onClick={nextOnClick} disabled={false} type="button" className={`btn btn-success ${isComplete ? "" : "opacity-25"}`}>Next</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    );
}