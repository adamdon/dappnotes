import React from "react";




export default function WizardNav(props)
{




    return (
        <div className={'text-center'}>
            <div className={'mb-3 pt-0 pb-1 alert bg-secondary d-inline-block'}>

                <div className={'text-center'}>
                    {Array.from(Array(props.totalSteps).keys()).map((value, key) => (
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
        </div>

    );
}