import React, {useEffect, useState} from "react";
import Hash from "ipfs-only-hash";
import AnimatedMount from "../../utilities/AnimatedMount";
import {useData} from "../../utilities/DataContextProvider";




export default function KeyInput(props)
{
    const [data, setData] = useData();

    const [keyInput, setKeyInput] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [complete, setComplete] = useState(false);



    useEffect( () =>
    {
        if(props.keyId)
        {
            setKeyInput(props.keyId);
        }
    }, []);

    async function requestNote()
    {
        setDisabled(true);
        setData({showSpinner: true});

        console.log("requestNote: " + keyInput);

        setDisabled(false);
        setData({showSpinner: false});
        setComplete(true);
    }


    return (
        <div>
            <div className="alert bg-secondary">

                <p>
                    Enter the node key a click request to load the content.
                </p>

                <div className="input-group mt-3">
                    <span className="input-group-text" >Note Key</span>
                    <input value={keyInput} onChange={e => setKeyInput(e.target.value)} onKeyDown={(event) => event.key === "Enter" ? requestNote() : {}} disabled={disabled} placeholder="Enter Key" type="text" aria-label="keyInput" id="keyInput"  className="form-control w-50"/>
                    <button onClick={requestNote} disabled={disabled} className="btn btn-outline-light" type="button" id="submit">Request Note</button>
                </div>

            </div>


            <AnimatedMount show={complete}>
                <div className="alert bg-secondary">
                    {"Complete"}
                </div>
            </AnimatedMount>

        </div>

    );
}