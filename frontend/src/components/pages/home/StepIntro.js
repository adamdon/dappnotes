import React from "react";
import {useData} from "../../utilities/DataContextProvider";




export default function StepIntro(props)
{
    const [data, setData] = useData();


    return (
        <div>
            <p>
                StepIntro, Active: {props.currentStep}
            </p>
            <button onClick={props.nextStep}>Next Step</button>
            <button onClick={() => props.goToNamedStep("StepImageCompress")}>StepImageCompress</button>

        </div>
    );
}