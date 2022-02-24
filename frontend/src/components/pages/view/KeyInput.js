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
    const [noteOutput, setNoteOutput] = useState("");
    const [cloudImageIpfsHash, setCloudImageIpfsHash] = useState("");
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

        if(keyInput !== "" && keyInput !== " ")
        {
            // setComplete(false);
            setDisabled(true);
            setData({showSpinner: true});

            try
            {
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
                    let noteContentString = await contract.getContentByKey(keyInput);

                    if(typeof noteContentString === "string")
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

                        if(noteContentObject.imageIpfsHash)
                        {

                            try
                            {
                                //requesting cloud data
                                const requestBody = {imageIpfsHash: noteContentObject.imageIpfsHash};
                                const requestUrl = (data.backendUrl + "downloadNote/");
                                const response = await fetch(requestUrl, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(requestBody)});
                                const jsonData = await response.json();
                                setCloudImageIpfsHash(jsonData.imageUri);
                            }
                            catch (error)
                            {
                                setData({toastError: "Error could not load cloud data, " + error.message});
                            }



                            //note loaded from blockchain
                            console.log(noteContentObject);
                            setNoteOutput(noteContentObject);
                            setKeyInput("");
                            setComplete(true);
                            setData({toastSuccess: "Retrieved Note"});
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
                        setData({toastError: error.message});
                    }
                }
                else
                {
                    setData({toastError: error.message});
                }

            }

            setDisabled(false);
            setData({showSpinner: false});
        }
        else
        {
            setData({toastMessage: "Input key for note first note:"});
        }

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

                <div className="text-center rounded-3 py-3 my-3">
                    <table className="table table-sm table-hover bg-primary table-borderless table-fit d-inline-block m-0 pb-1 rounded-3">
                        <thead>
                            <tr className="table-active">
                                <th className="text-center text-light" colSpan={2}>Note Contents</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr className="table-active">
                                <td className="text-center text-light px-3">Blockchain Stored Image <i className="fa fa-save"></i> :</td>
                                <td className="text-start text-light px-3">
                                    <a href={noteOutput.imageUri} target="_blank"> <img className={'img-fluid rounded'} style={{maxHeight: 200}} src={noteOutput.imageUri} alt={"image"}/> </a>
                                </td>
                            </tr>
                            <tr className="table-active">
                                <td className="text-center text-light px-3">IPFS Stored Image <i className="fa fa-save"></i> :</td>
                                <td className="text-start text-light px-3">
                                    <a href={"https://gateway.pinata.cloud/ipfs/" + noteOutput.imageIpfsHash} target="_blank"> <img className={'img-fluid rounded'} style={{maxHeight: 200}} src={"https://gateway.pinata.cloud/ipfs/" + noteOutput.imageIpfsHash} alt={"image"}/> </a>
                                </td>
                            </tr>

                            <tr className="table-active">
                                <td className="text-center text-light px-3">Cloud Stored image <i className="fa fa-save"></i> :</td>
                                <td className="text-start text-light px-3">
                                    <a href={cloudImageIpfsHash} target="_blank"> <img className={'img-fluid rounded'} style={{maxHeight: 200}} src={cloudImageIpfsHash} alt={"image"}/> </a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {/*<div className="alert bg-secondary text-center">*/}
                {/*    <a href={"https://gateway.pinata.cloud/ipfs/" + noteOutput.imageIpfsHash} target="_blank"> <img className={'img-fluid rounded'} style={{maxHeight: 200}} src={"https://gateway.pinata.cloud/ipfs/" + noteOutput.imageIpfsHash} alt={"image"}/> </a>*/}
                {/*</div>*/}
            </AnimatedMount>

        </div>

    );
}