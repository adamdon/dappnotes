import React, {useEffect, useState} from "react";

import {useData} from "../../utilities/DataContextProvider";




export default function StepIPFS(props)
{
    const [data, setData] = useData();
    const [isComplete, setIsComplete] = useState(false);





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
        // if(isActive)
        // {
        //     const pinataApiKey = "";
        //     const pinataSecretApiKey = "";
        //     const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);
        //
        //
        //     pinata.testAuthentication().then((result) =>
        //     {
        //         //handle results here
        //         console.log(result);
        //     }).catch((err) =>
        //     {
        //         //handle error here
        //         console.log(err);
        //     });
        //
        //     // console.log('isActiveOnChange: ' + isActive.toString());
        // }
        // else
        // {
        //     // setIsComplete(false)
        // }
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
            setData({toastMessage: "confirm Details"})
        }
    }


    return (
        <div>

            <h5 className="display-10">Publish Data</h5>


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