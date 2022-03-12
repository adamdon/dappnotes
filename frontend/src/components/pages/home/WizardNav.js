import React from "react";
import {useData} from "../../utilities/DataContextProvider";




export default function WizardNav(props)
{

    const [data, setData] = useData();

    function dotOnClick(value)
    {
        if(data.config.debugMode)
        {
            props.goToStep(value + 1);
        }
    }


    return (
        <div className={'text-center'}>
            <div className={'mb-0 pt-0 pb-1 alert bg-secondary'}>

                <div className={'text-center'}>
                    {Array.from(Array(props.totalSteps).keys()).map((value, key) => (
                        <a
                            key={key}
                            className={`${"dot text-decoration-none"} ${(props.currentStep === (value + 1)) ? "active" : (props.currentStep > (value + 1)) ? "complete" :''}`}
                            onClick={() => dotOnClick(value)}
                        >
                        &bull;
                    </a>
                    ))}
                </div>

            </div>
        </div>

    );
}