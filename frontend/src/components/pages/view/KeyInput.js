import React, {useEffect, useState} from "react";
import Hash from "ipfs-only-hash";
import AnimatedMount from "../../utilities/AnimatedMount";
import {useData} from "../../utilities/DataContextProvider";
import Web3Modal from "web3modal";
import {ethers} from "ethers";




export default function KeyInput(props)
{
    const [data, setData] = useData();

    const [keyInput, setKeyInput] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [complete, setComplete] = useState(false);



    useEffect( () =>
    {
        if(props.keyId)
        {
            setKeyInput(props.keyId);
        }
    }, []);

    async function requestNote()
    {
        setDisabled(true);
        setData({showSpinner: true});

        console.log("requestNote: " + keyInput);



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

            let isContentOwned = await contract.isContentOwned(keyInput);
            if(isContentOwned)
            {
                setData({toastSuccess: "isContentOwned: " + isContentOwned.toString()});

                let getContentByKey = await contract.getContentByKey(keyInput);
                console.log("getContentByKey");
                console.log(deploymentAddress);
                console.log(getContentByKey);
                console.log(typeof getContentByKey);
                console.log("getContentByKey");

            }
            else
            {
                setData({toastError: "isContentOwned: " + isContentOwned.toString()});
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

        setDisabled(false);
        setData({showSpinner: false});
        setComplete(true);
    }


    return (
        <div>
            <div className="alert bg-secondary">

                <p>
                    Enter the node key a click request to load the content.
                </p>

                <div className="input-group mt-3">
                    <span className="input-group-text" >Note Key</span>
                    <input value={keyInput} onChange={e => setKeyInput(e.target.value)} onKeyDown={(event) => event.key === "Enter" ? requestNote() : {}} disabled={disabled} placeholder="Enter Key" type="text" aria-label="keyInput" id="keyInput"  className="form-control w-50"/>
                    <button onClick={requestNote} disabled={disabled} className="btn btn-outline-light" type="button" id="submit">Request Note</button>
                </div>

            </div>


            <AnimatedMount show={complete}>
                <div className="alert bg-secondary">
                    {"Complete"}
                </div>
            </AnimatedMount>

        </div>

    );
}