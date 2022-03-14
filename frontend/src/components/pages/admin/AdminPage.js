import NavTop from "../NavTop";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import React, {useEffect, useState} from "react";
import BasicComponent from "./BasicComponent";
import {useData} from "../../utilities/DataContextProvider";
import InfoComponent from "./InfoComponent";
import AnimatedMount from "../../utilities/AnimatedMount";
import Web3Modal from "web3modal";
import {ethers} from "ethers";

export default function AdminPage()
{
    const [data, setData] = useData();
    const [show, setShow] = useState(false);


    useEffect(() => {
        console.log("AdminPage")
    }, []) ;


    useEffect(() => {
        if(data.letter4 === "x")
        {
            setShow(true);
        }
        else if(data.letter4 === "y")
        {
            setShow(false);
        }
    }, [data.letter4]) ;





    async function withdraw()
    {
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

            let withdrawResults = await contract.withdraw();

            console.log(withdrawResults);
            setData({toastSuccess: "Withdraw request completed"});

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
                    }
                    else
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
        setData({showSpinner: false});

    }

    return (
        <span>
            <ContainerLayout>

                <ContainerContentRow>
                    <ContainerContent size="12" icon="bitcoin" title="Withdraw balance to contact owner">
                    Click to withdraw to owner of contract: {data.config.deploymentAddress}
                    <div className="mt-3 text-center">
                        <div className="d-grid gap-2" role="group" aria-label="Submit">
                            <div className="btn-group" role="group">
                                <button onClick={() => withdraw()}  type="button" className={`btn btn-success`}>Withdraw</button>
                            </div>
                        </div>
                    </div>

                    </ContainerContent>
                </ContainerContentRow>

                <ContainerContentRow>
                    <ContainerContent size="12" icon="home" title="home">
                        <BasicComponent/>
                    </ContainerContent>
                </ContainerContentRow>




                <ContainerContentRow>
                    <ContainerContent size="6" icon="bitcoin" title="other">
                        {data.letter}
                    </ContainerContent>

                    <ContainerContent size="6" icon="clipboard" title="info">
                        <InfoComponent/>
                    </ContainerContent>

                </ContainerContentRow>

                <AnimatedMount show={show}>
                    <ContainerContentRow>
                        <ContainerContent size="12" icon="bitcoin" title="AnimatedMount Test">
                            {data.letter4}
                        </ContainerContent>
                    </ContainerContentRow>
                </AnimatedMount>



            </ContainerLayout>
        </span>
    );

}