import React, {useEffect, useState} from "react";
// import detectEthereumProvider from '@metamask/detect-provider'
import FadeIn from 'react-fade-in';
import { ethers } from 'ethers';
import Web3Modal from "web3modal";

import {useData} from "../../utilities/DataContextProvider";
import AnimatedMount from "../../utilities/AnimatedMount";





export default function StepWallet(props)
{
    const [data, setData] = useData();
    const [isComplete, setIsComplete] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [isInstalled, setIsInstalled] = useState(false);
    const [isConnected, setConnected] = useState(false);

    const [balance, setBalance] = useState("");
    const [address, setAddress] = useState("");





    useEffect( () =>
    {
        async function effectOnChange()
        {
            await isActiveOnChange(props.isActive);
        }
        effectOnChange().then();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isActive]);



    async function isActiveOnChange(isActive)
    {
        // console.log(window.ethereum.isConnected());
        if(window.ethereum)
        {
            setIsInstalled(true);
        }
        else
        {
            setIsInstalled(false);
        }

    }

    async function connectOnClick()
    {
        try
        {
            setData({toastMessage: "Connect only one account"});
            // let detectProvider = await detectEthereumProvider()


            let providerOptions = {};
            let web3Modal = new Web3Modal({providerOptions});
            let instance = await web3Modal.connect();

            let provider = new ethers.providers.Web3Provider(instance);
            let accounts = await provider.send("eth_requestAccounts", []);
            let balance = await provider.getBalance(accounts[0]);
            let balanceFormatted = ethers.utils.formatEther(balance);
            let signer = provider.getSigner();
            let addressSigner = await signer.getAddress()


            setBalance(balanceFormatted);
            setAddress(addressSigner);
            setConnected(true);
            setIsComplete(true);
        }
        catch (error)
        {
            console.log(error);
            setData({toastError: error.message});
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
            setData({toastMessage: "Select Wallet"})
        }
    }

    return (
        <div>

            <h5 className="display-10">Select Wallet</h5>



            {isInstalled ?
                <div>
                    <div className="my-3 text-center">
                        <div className="d-grid gap-2" role="group" aria-label="Submit">
                            <button onClick={connectOnClick} disabled={disabled} type="button" className="btn btn-dark">
                                <span><i className="fa fa-plug"></i> Connect to wallet (Select one wallet only)</span>
                            </button>
                        </div>
                    </div>


                    <AnimatedMount show={isConnected}>
                            <div className="text-center rounded-3 py-3 my-3" style={{backgroundSize: "cover", backgroundImage: `url('${data.imageDataUri}')`}}>
                                <FadeIn transitionDuration={500} delay={250}>
                                    <table className="table table-sm table-hover bg-primary table-borderless table-fit d-inline-block m-0 pb-1 rounded-3">
                                        <thead>
                                            <tr className="table-active">
                                                <th className="text-center text-light" colSpan={2}>Wallet Details</th>
                                            </tr>
                                        </thead>


                                        <tbody className="">
                                            <tr className="table-active">
                                                <td className="text-end text-light px-3">Address <i className="fa fa-at"></i> :</td>
                                                <td className="text-start text-light px-3">{address}</td>
                                            </tr>

                                            <tr className="table-active">
                                                <td className="text-end text-light px-3">Balance <i className="fa fa-university"></i> :</td>
                                                <td className="text-start text-light px-3">{balance}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </FadeIn>


                            </div>
                    </AnimatedMount>

                </div>
                :
                <div>
                    <p>
                        Meta Mask is required to be installed and enabled. Get it here: <a href="https://metamask.io/download/" className="text-decoration-none text-light" target="_blank" rel="noopener noreferrer">metamask.io</a>
                    </p>
                </div>
            }












            <div className="mt-3 text-center fixed-bottom">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <div className="btn-group" role="group">
                        {/*<button onClick={previousOnClick} disabled={false} type="button" className="btn btn-danger">Previous</button>*/}
                        <button onClick={nextOnClick} disabled={false} type="button" className={`btn btn-success ${isComplete ? "" : "opacity-25"}`}>Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}