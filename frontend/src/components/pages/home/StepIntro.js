import React from "react";
import {useData} from "../../utilities/DataContextProvider";




export default function StepIntro(props)
{
    const [data, setData] = useData();


    return (
        <div>

            <div className="container-fluid bg-primary text-light p-3 rounded">
                <div className="container bg-secondary p-3 rounded">
                    <h1 className="display-4">Dappnotes</h1>
                    <p>Permanent on-chain persistence</p>
                    <p>
                        StepIntro, Active: {props.currentStep}
                    </p>
                    <button onClick={props.nextStep}>Next Step</button>
                    <button onClick={() => props.goToNamedStep("StepImageCompress")}>StepImageCompress</button>
                </div>
            </div>



        </div>
    );
}