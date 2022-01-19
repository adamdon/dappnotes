import React, {useEffect, useState} from "react";
import {useData} from "../../utilities/DataContextProvider";




export default function StepIntro(props)
{
    const [data, setData] = useData();
    const [disabled, setDisabled] = useState(true);



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
            setDisabled(false);
        }
        // console.log('isActiveOnChange: ' + isActive.toString());
    }










    function nextOnClick()
    {
        // setDisabled(true);
        props.nextStep();
        // props.goToNamedStep("StepImageSelect");
    }


    return (
        <div>

            <div className="container-fluid bg-primary text-light p-3 rounded">
                <div className="container bg-secondary p-3 rounded">
                    <h3 className="display-4">Dappnotes</h3>
                    <p>Permanent on-chain persistence</p>

                </div>
            </div>



            <div className="mt-3 text-center fixed-bottom">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <div className="btn-group" role="group">
                        <button onClick={() => nextOnClick()} disabled={disabled} type="button" className="btn btn-success">Get Started</button>
                    </div>
                </div>
            </div>

        </div>
    );
}