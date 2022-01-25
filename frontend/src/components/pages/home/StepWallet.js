import React, {useEffect, useState} from "react";
import { ethers } from 'ethers';

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
        console.log(window.ethereum.isConnected());
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
            const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(account);
            setBalance(ethers.utils.formatEther(balance));
            setConnected(true);
        }
        catch (error)
        {
            console.error(error);
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
                                <span><i className="fa fa-plug"></i> Connect to wallet</span>
                            </button>
                        </div>
                    </div>


                    <AnimatedMount show={isConnected}>
                        <div className={''}>
                            {balance}
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
                        <button onClick={previousOnClick} disabled={false} type="button" className="btn btn-danger">Previous</button>
                        <button onClick={nextOnClick} disabled={false} type="button" className={`btn btn-success ${isComplete ? "" : "opacity-25"}`}>Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}