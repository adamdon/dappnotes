import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ContainerLayout from "../../containers/ContainerLayout";
import ContainerContentRow from "../../containers/ContainerContentRow";
import ContainerContent from "../../containers/ContainerContent";
import {useData} from "../../utilities/DataContextProvider";
import KeyInput from "./KeyInput";
import AnimatedMount from "../../utilities/AnimatedMount";
import ProgressiveImage from "react-progressive-graceful-image";
import {FallingLines} from "react-loader-spinner";
import Lightbox from "react-image-lightbox";
import FadeIn from 'react-fade-in';

export default function ViewPage()
{
    const [data, setData] = useData();

    const [gatewayList, setGatewayList] = useState([
        "https://jorropo.net/ipfs/",
        "https://ipfs.2read.net/ipfs/",
        "https://ipfs.adatools.io/ipfs/",
        "https://ipfs.zod.tv/ipfs/",
        "https://hardbin.com/ipfs/",
        "https://ipfs.fleek.co/ipfs/",
        "https://ipfs.eternum.io/ipfs/",
        "https://gateway.ipfs.io/ipfs/",
        "https://cloudflare-ipfs.com/ipfs/"
        ]);

    const [complete, setComplete] = useState(false);

    const [ipfsHash, setIpfsHash] = useState("");
    const [noteName, setNoteName] = useState("");
    const [blockchainImageUri, setBlockchainImageUri] = useState("");
    const [cloudImageUri, setCloudImageUri] = useState("");
    const [ipfsImageUri, setIpfsImageUri] = useState("");


    const [showBlockchainBox, setShowBlockchainBox] = useState(false);
    const [showIpfsBox, setShowIpfsBox] = useState(false);
    const [showCloudBox, setShowCloudBox] = useState(false);



    function handleIpfsErrorEvent(event)
    {
        if(gatewayList.length !== 0)
        {
            const newGatewayList = [...gatewayList];
            const newGateway = [...newGatewayList].pop();
            newGatewayList.pop();
            console.log(event);
            console.log("Alternative IPFS gateway used: " + newGateway)
            setGatewayList(newGatewayList);
            setIpfsImageUri(newGateway + ipfsHash);
        }
        else
        {
            setData({toastError: "Could not access IPFS content on any gateway."});
        }
    }



    return (
        <span>
            <ContainerLayout>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="eye" title="View Note">

                        <KeyInput
                            keyId={useParams().keyId}
                            setComplete={(value) => setComplete(value)}
                            setIpfsHash={(value) => setIpfsHash(value)}
                            setNoteName={(value) => setNoteName(value)}
                            setBlockchainImageUri={(value) => setBlockchainImageUri(value)}
                            setCloudImageUri={(value) => setCloudImageUri(value)}
                            setIpfsImageUri={(value) => setIpfsImageUri(value)}
                        />

                    </ContainerContent>
                </ContainerContentRow>


                <AnimatedMount show={complete}>
                <ContainerContentRow>
                    <ContainerContent size="12" icon="save" title="Note Contents">

                    <FadeIn transitionDuration={500} delay={250}>


                    <table className="table table-sm table-hover bg-primary table-borderless table-responsive m-0  pb-3 rounded" >
                        <thead>
                            <tr className="table-active">
                                <th className="text-center text-light" colSpan={3}>{noteName + " "}</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className="table-active"  >
                                <td className="text-center text-light px-3" style={{}}>Blockchain Stored Image <i className="fa fa-save"></i> :</td>
                                <td className="text-center text-light px-3">Cloud Stored image <i className="fa fa-save"></i> :</td>
                                <td className="text-center text-light px-3">IPFS Stored Image <i className="fa fa-save"></i> :</td>
                            </tr>
                            <tr className="table-active">
                                <td className="text-center text-light px-3" style={{width: 300}} >
                                    <ProgressiveImage delay={1000}  src={blockchainImageUri} placeholder="" style={{Height: 200}} onError={(error) =>  console.error(error)}>
                                        {(src, loading) => loading ?
                                            <div ><FallingLines height="200" width="200" color='white' ariaLabel='loading'/></div>
                                            :
                                            <img className={'img-fluid rounded'} onClick={() => setShowBlockchainBox(true)} src={src} alt="Blockchain Stored" style={{maxHeight: 200}} />
                                        }
                                    </ProgressiveImage>

                                </td>

                                <td className="text-center text-light px-3" style={{width: 300}}  >
                                    <ProgressiveImage delay={1250}  src={cloudImageUri} placeholder="" style={{Height: 200}} onError={(error) =>  console.error(error)}>
                                        {(src, loading) => loading ?
                                            <div><FallingLines  height="200" width="200" color='white' ariaLabel='loading'/></div>
                                            :
                                            <img className={'img-fluid rounded'} onClick={() => setShowCloudBox(true)} src={src} alt="Cloud Stored" style={{maxHeight: 200}} />
                                        }
                                    </ProgressiveImage>
                                </td>

                                <td className="text-center text-light px-3" style={{width: 300}} >
                                    <ProgressiveImage delay={1750}  src={ipfsImageUri} placeholder="" style={{Height: 200}} onError={(error) => handleIpfsErrorEvent(error)} >
                                        {(src, loading) => loading ?
                                            <div><FallingLines height="200" width="200" color='white' ariaLabel='loading'/></div>
                                            :
                                            <img className={'img-fluid rounded'} onClick={() => setShowIpfsBox(true)} src={src} alt="IPFS Stored" style={{maxHeight: 200}} />
                                        }
                                    </ProgressiveImage>
                                </td>
                            </tr>

                            <tr className="table-active"  >
                                <td className="text-center text-light px-3" style={{}}> </td>
                                <td className="text-center text-light px-3"> </td>
                                <td className="text-center text-light px-3"> </td>
                            </tr>

                        </tbody>
                    </table>

                    {showIpfsBox ?
                        <Lightbox
                            mainSrc={ipfsImageUri}
                            onCloseRequest={() => setShowIpfsBox(false)}
                            imageTitle={"IPFS Stored Image"}
                        />
                        : <></>
                    }
                    {showBlockchainBox ?
                        <Lightbox
                            mainSrc={blockchainImageUri}
                            onCloseRequest={() => setShowBlockchainBox(false)}
                            imageTitle={"Blockchain Stored Image"}
                        />
                        : <></>
                    }
                    {showCloudBox ?
                        <Lightbox
                            mainSrc={cloudImageUri}
                            onCloseRequest={() => setShowCloudBox(false)}
                            imageTitle={"Cloud Stored image"}
                        />
                        : <></>
                    }

                    </FadeIn>
                    </ContainerContent>
                </ContainerContentRow>
            </AnimatedMount>



            </ContainerLayout>
        </span>
    );

}