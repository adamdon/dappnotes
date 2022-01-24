import React, {useEffect, useState} from "react";
import {useData} from "../../utilities/DataContextProvider";
import ProgressBar from "@ramonak/react-progress-bar";
import AnimatedMount from "../../utilities/AnimatedMount";




export default function StepFinal(props)
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

            <h5 className="display-10">Complete Process</h5>






            <div className="mt-3 text-center fixed-bottom">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <div className="btn-group" role="group">
                        {/*<button onClick={previousOnClick} disabled={false} type="button" className="btn btn-danger">Previous</button>*/}
                    </div>
                </div>
            </div>

        </div>
    );
}