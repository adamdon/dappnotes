import React, {useEffect, useState} from "react";
import {useData} from "../../utilities/DataContextProvider";




export default function StepImageCompress(props)
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
        if(isActive)
        {
            // console.log('isActiveOnChange: ' + isActive.toString());
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
            //Save compressed image

        }
        else
        {
            setData({toastMessage: "Compress image file to continue"})
        }

    }



    return (
        <div>
            <h5 className="display-10">Compress Image</h5>



            <div className="mt-3 text-center fixed-bottom">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <div className="btn-group" role="group">
                        <button onClick={previousOnClick} disabled={false} type="button" className="btn btn-danger">Previous</button>
                        <button onClick={nextOnClick} disabled={false} type="button" className="btn btn-success">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}