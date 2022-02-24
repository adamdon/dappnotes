import React, {useEffect, useState} from "react";
import {useData} from "../../utilities/DataContextProvider";
import ProgressBar from "@ramonak/react-progress-bar";
import AnimatedMount from "../../utilities/AnimatedMount";




export default function StepCloud(props)
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

    async function fetchUploadOnClick()
    {
        setData({showSpinner: true});


        let requestBody = {note: data.note};
        let methodType = "POST"
        let requestUrl = (data.backendUrl + "uploadNote/");
        let requestHeaders = {"Content-Type": "application/json"};

        try
        {
            const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});
            const jsonData = await response.json();

            if(Number(response.status.toString().substring(0, 1)) === 2) //if response code stats with 2
            {
                if(jsonData.note._id)
                {
                    setData({toastSuccess: "" + jsonData.message});
                    setIsComplete(true);
                    setDisabled(true);
                }
                else
                {
                    setData({toastError: "Error wrong data: " + response.status + " - " + jsonData.errors[0].message});
                }

            }
            else
            {
                if(jsonData.errors)
                {
                    setData({toastError: "Error: " + response.status + " - " + jsonData.errors[0].message});
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
            setData({toastMessage: "Upload image to Cloud"})
        }
    }

    return (
        <div>

            <h5 className="display-10">Upload to Cloud</h5>



            <div className="my-3 text-center">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <button onClick={fetchUploadOnClick} disabled={disabled} type="button" className="btn btn-dark">
                        <span><i className="fa fa-cloud"></i> Upload</span>
                    </button>
                </div>
            </div>




            <AnimatedMount show={isComplete}>
                <div className={'text-center'}>
                    {data.imageDataUri === "" ? <div> </div> : <a href={data.imageDataUri} download={"compressed_file"}> <img className={'img-fluid rounded'} style={{maxHeight: 200}} src={data.imageDataUri} alt={"image"}/> </a> }
                </div>
            </AnimatedMount>




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