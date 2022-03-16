import React, {useEffect, useState} from "react";
import FadeIn from 'react-fade-in';
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
            <FadeIn transitionDuration={500} delay={250}>
                <div className="bg-primary text-light px-3 py-1 rounded">
                    <h3 className="display-4">DappNotes</h3>
                    <p className={'mb-3'}>Decentralised App Notes</p>
                </div>
            </FadeIn>


            <ul className="list-group my-3 rounded">
                    <FadeIn transitionDuration={500} delay={250}>
                        <li className="list-group-item bg-primary text-light lead">&bull; Create Notes for a digital time capsule or to secure your data 📝 📷 ⏳️</li>
                        <li className="list-group-item bg-primary text-light lead">&bull; Utilize the blockchain for permanent on-chain storage 🧊 ⛓️ 💾</li>
                        <li className="list-group-item bg-primary text-light lead">&bull; Provides additional cloud and InterPlanetary File System storage ☁️ 🌐 🗃</li>
                        <li className="list-group-item bg-primary text-light lead">&bull; Easy to use, step by step instructions with link sharing 😀 📖 📨</li>
                    </FadeIn>
            </ul>


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