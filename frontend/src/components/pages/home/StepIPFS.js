import React, {useEffect, useState} from "react";
import {useData} from "../../utilities/DataContextProvider";
import ProgressBar from "@ramonak/react-progress-bar";
import AnimatedMount from "../../utilities/AnimatedMount";




export default function StepIPFS(props)
{
    const [data, setData] = useData();
    const [isComplete, setIsComplete] = useState(false);
    const [disabled, setDisabled] = useState(false);




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

    }

    async function fetchPublishOnClick()
    {
        setData({showSpinner: true});

        let note = {name: data.name, dataUri: data.imageDataUri};

        let requestBody = {note: note};
        let methodType = "POST"
        let requestUrl = (data.backendUrl + "pinNote/");
        let requestHeaders = {"Content-Type": "application/json"};

        try
        {
            const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});
            const jsonData = await response.json();

            if(Number(response.status.toString().substring(0, 1)) === 2) //if response code stats with 2
            {
                if(jsonData.note)
                {
                    // const metaResponse = await fetch("https://gateway.pinata.cloud/ipfs/" + jsonData.result.IpfsHash, {method: "GET", headers: requestHeaders});
                    // const metaJsonData = await metaResponse.json();


                    setData({ipfsHash: jsonData.note.imageIpfsHash})
                    setData({metaNote: jsonData.note})
                    setData({toastSuccess: "Published: " + jsonData.note.imageIpfsHash});
                    setIsComplete(true);
                    setDisabled(true);
                }

            }
            else
            {
                if(jsonData.errors)
                {
                    for(let error of jsonData.errors)
                    {
                        await new Promise(resolve => setTimeout(resolve, 250));
                        setData({toastError: "Error: " + response.status + " - " + jsonData.errors[0].message});
                    }
                }
                else
                {
                    setData({toastError: "Error: " + response.status + " - Could not load"});
                }
            }
        }
        catch (exception)
        {
            setData({toastError: "Error: " + exception.message + " " + requestUrl});
        }

        setData({showSpinner: false});
    }








    async function copyLinkOnClick()
    {
        await navigator.clipboard.writeText(("https://cloudflare-ipfs.com/ipfs/" + data.ipfsHash));
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
            setData({toastMessage: "Publish image to IPFS"})
        }
    }

    return (
        <div>

            <h5 className="display-10">Publish to IPFS</h5>



            <div className="my-3 text-center">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <button onClick={fetchPublishOnClick} disabled={disabled} type="button" className="btn btn-dark">
                        <span><i className="fa fa-cloud"></i> Publish</span>
                    </button>
                </div>
            </div>




            <AnimatedMount show={isComplete}>
                <div className="my-3 text-center">
                    <div className="d-grid gap-2" role="group" aria-label="Submit">
                        <a href={"https://gateway.pinata.cloud/ipfs/" + data.ipfsHash} target="_blank" rel="noopener noreferrer" type="button" className="btn btn-success">
                            <span><i className="fa fa-external-link"></i> View on IPFS Gateway</span>
                        </a>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <div className="d-grid gap-2" role="group" aria-label="Submit">
                        <div className="btn-group" role="group">
                            <button onClick={copyLinkOnClick} disabled={false} type="button" className="btn btn-success"><i className="fa fa-clipboard"></i> Copy Gateway Link</button>
                        </div>
                    </div>
                </div>
            </AnimatedMount>




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