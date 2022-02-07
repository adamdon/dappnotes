import React, {useState} from "react";
import {useData} from "../../utilities/DataContextProvider";
import Web3Modal from "web3modal";
import {ethers} from "ethers";




export default function StepTransaction(props)
{
    const [data, setData] = useData();
    const [isComplete, setIsComplete] = useState(false);
    const [disabled, setDisabled] = useState(false);












    async function performTransaction()
    {
        try
        {
            setData({toastMessage: "Test transaction"});
            // let detectProvider = await detectEthereumProvider()


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

            let isContentOwned = await contract.isContentOwned(data.ipfsHash);
            if(!isContentOwned)
            {
                const connection = contract.connect(signer);
                const addr = connection.address;
                const result = await contract.payToMint(addr, data.ipfsHash, {value: ethers.utils.parseEther('0.05'),});
                await result.wait();
                console.log(result);

            }
            else
            {
                // console.log("error");
                setData({toastError: "Content Already Minted"});
            }
        }
        catch (error)
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



            <div className="my-3 text-center">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <button onClick={performTransaction} disabled={disabled} type="button" className="btn btn-dark">
                        <span><i className="fa fa-plug"></i> Perform Transaction</span>
                    </button>
                </div>
            </div>

            <div className="mt-3 text-center fixed-bottom">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <div className="btn-group" role="group">
                        <button onClick={previousOnClick} disabled={false} type="button" className="btn btn-danger">Previous</button>
                        <button onClick={nextOnClick} disabled={false} type="button" className={`btn btn-success ${isComplete ? "" : "opacity-25"}`}>Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}