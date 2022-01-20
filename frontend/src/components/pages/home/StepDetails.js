import React, {useState} from "react";
import {useData} from "../../utilities/DataContextProvider";




export default function StepDetails(props)
{
    const [data, setData] = useData();
    const [isComplete, setIsComplete] = useState(false);


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

            <h5 className="display-10">Confirm Image Details</h5>


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