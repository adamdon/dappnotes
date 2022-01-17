import React from "react";




export default function WizardNav(props)
{




    return (
        <div>

            <p>
                <span>
                    <button onClick={props.previousStep}>Previous Step</button>
                    <button onClick={props.nextStep}>Next Step</button>
                </span>
            </p>

            <p>Step {props.currentStep}, Total Steps: {props.totalSteps}, Is Active: {props.isActive.toString()}</p>

            {/*<p><button onClick={()=>props.goToStep(2)}>Step 2</button></p>*/}
            {/*<p><button onClick={props.firstStep}>First Step</button></p>*/}
            {/*<p><button onClick={props.lastStep}>Last Step</button></p>*/}


            <div className={'text-center'}>
                {Array.from(Array(3).keys()).map((value, key) => (
                    <span
                        key={key}
                        className={`${"dot"} ${(props.currentStep === (value + 1)) ? "active" : (props.currentStep > (value + 1)) ? "complete" :''}`}
                        onClick={() => props.goToStep((value + 1))}
                    >
                        &bull;
                    </span>
                ))}
            </div>




        </div>
    );
}