import React, {useEffect, useState} from "react";
import {BallTriangle, FallingLines} from "react-loader-spinner";
import Lightbox from 'react-image-lightbox';
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import AnimatedMount from "../../utilities/AnimatedMount";
import {useData} from "../../utilities/DataContextProvider";
import ProgressiveImage from "react-progressive-graceful-image";





export default function KeyInput(props)
{
    const [data, setData] = useData();

    const [keyInput, setKeyInput] = useState("");
    const [disabled, setDisabled] = useState(false);





    useEffect( () =>
    {
        if(props.keyId)
        {
            setKeyInput(props.keyId);
        }
    }, [props]);


    async function requestNoteOnClick()
    {
        if(keyInput !== "" && keyInput !== " ")
        {
            setDisabled(true);
            setData({showSpinner: true});

            await requestIpfsNote();
            await requestCloudNote();
            await requestBlockchainNote();


            setDisabled(false);
            setData({showSpinner: false});
        }
        else
        {
            setData({toastMessage: "Input key for note first note:"});
        }


    }




    async function requestIpfsNote()
    {
        props.setIpfsImageUri("https://gateway.pinata.cloud/ipfs/" + keyInput)
    }

    async function requestCloudNote()
    {
        try
        {
            //requesting cloud data
            const requestBody = {imageIpfsHash: keyInput};
            const requestUrl = (data.backendUrl + "downloadNote/");
            const response = await fetch(requestUrl, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(requestBody)});
            const jsonData = await response.json();
            if(jsonData.errors)
            {
                setData({toastError: "Loading Cloud Note Failed - " + jsonData.errors[0].message});
            }
            else
            {
                // setData({toastSuccess: "Retrieved Cloud Note"});
                props.setCloudImageUri(jsonData.imageUri);

            }

        }
        catch (error)
        {
            setData({toastError: "Error could not load cloud data, " + error.message});
        }
    }


    async function requestBlockchainNote()
    {

        let provider = null;
        let currentNetwork = data.config.networkName;
        if(currentNetwork === "localhost")
        {
            console.log("Requesting note from localhost network")
            let web3Modal = new Web3Modal({});
            let instance = await web3Modal.connect();
            provider = new ethers.providers.Web3Provider(instance);
        }
        else if(currentNetwork === "rinkeby")
        {
            console.log("Requesting note from rinkeby network")
            provider = new ethers.providers.AlchemyProvider("rinkeby", data.config.alchemyRinkebyKey);
        }
        else
        {
            setData({toastError: "Network unknown"});
        }

        if(provider)
        {
            try
            {
                let deploymentAddress = data.config.deploymentAddress;
                let contract = new ethers.Contract(deploymentAddress, data.config.contract.abi, provider);

                let isContentOwned = await contract.isContentOwned(keyInput);
                if (isContentOwned)
                {
                    let noteContentString = await contract.getContentByKey(keyInput);

                    if (typeof noteContentString === "string")
                    {
                        let noteContentObject;

                        try
                        {
                            noteContentObject = JSON.parse(noteContentString);
                        }
                        catch (error)
                        {
                            setData({toastError: "Error in Note format, " + error.message});
                        }

                        if (noteContentObject.imageUri)
                        {
                            //
                            //note loaded from blockchain
                            //
                            console.log(noteContentObject);

                            // setNoteOutput(noteContentObject);
                            props.setNoteName(noteContentObject.name);
                            props.setBlockchainImageUri(noteContentObject.imageUri);


                            setKeyInput("");
                            props.setComplete(true);

                            setData({toastSuccess: "Retrieved Blockchain Note"});
                        }
                        else
                        {
                            setData({toastError: "Note missing data"});
                        }
                    }
                    else
                    {
                        setData({toastError: "Error:  " + noteContentString.toString()});
                    }
                }
                else
                {
                    setData({toastError: "Note does not exist"});
                }

            }
            catch (error)
            {
                if (error.data)
                {
                    if (error.data.code && error.data.code === -32603)
                    {
                        const contractError = error.data.message.split("reverted with reason string ").pop().slice(1, -1);

                        if (contractError === "Note Already Minted")
                        {
                            setData({toastError: contractError});
                        } else
                        {
                            console.error(contractError);
                            setData({toastError: error.data.message});
                        }
                    } else
                    {
                        setData({toastError: error.message});
                    }
                } else
                {
                    setData({toastError: error.message});
                }

            }

        }
        else
        {
            setData({toastError: "Provider null, unknown network config: " + currentNetwork})
        }


    }






    return (
            <div className="alert bg-secondary mb-0">
                <p>
                    Enter a Note key and click the request the to load the content.
                </p>

                <div className="input-group mt-3">
                    <span className="input-group-text" >Note Key</span>
                    <input value={keyInput} onChange={e => setKeyInput(e.target.value)} onKeyDown={(event) => event.key === "Enter" ? requestNoteOnClick() : {}} disabled={disabled} placeholder="Enter Key" type="text" aria-label="keyInput" id="keyInput"  className="form-control w-50"/>
                    <button onClick={requestNoteOnClick} disabled={disabled} className="btn btn-outline-light" type="button" id="submit">Request Note</button>
                </div>
            </div>
    );
}