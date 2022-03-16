import React, {useEffect, useState} from "react";
import FadeIn from 'react-fade-in';
import Hash from "ipfs-only-hash"
import {useData} from "../../utilities/DataContextProvider";




export default function StepDetails(props)
{
    const [data, setData] = useData();
    const [isComplete, setIsComplete] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState("");



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
            let filename = String(data.selectedFileName);
            let filenameArray = filename.split('.');
            filenameArray.pop()

            let filenameWithoutExtension = String(filenameArray);
            setName(filenameWithoutExtension.replace(/[^a-zA-Z0-9]/g,' '));

            const predictedIpfsHash = await Hash.of(Uint8Array.from(data.selectedFile), {cidVersion: 1});
            setData({predictedIpfsHash: predictedIpfsHash});

        }

    }




    async function confirmNameOnKeyDown(event)
    {
        if(event.key === "Enter")
        {
            await confirmNameOnClick();
        }
    }


    async function confirmNameOnClick()
    {
        if(name === "")
        {
            setData({toastMessage: "Input 'name' before submitting"});
        }
        else if(!name.match(/^[0-9a-zA-Z\s]+$/))
        {
            setName(name.replace(/[^a-zA-Z0-9\s]/g,''));
            setData({toastMessage: "'name' can only contain letters, numbers and spaces"});
        }
        else
        {
            setData({toastSuccess: "Confirmed details for: " + name});
            setData({name: String(name)})
            setIsComplete(true);
            setDisabled(true);
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
            props.nextStep();
        }
        else
        {
            // console.log(data.imageDataUri);
            setData({toastMessage: "Confirm name"})
        }
    }


    return (
        <div>

            <h5 className="display-10">Confirm Image Details</h5>


            <div className="input-group mt-3">
                <span className="input-group-text" >Image Name: </span>
                <input value={name} onChange={e => setName(e.target.value)} onKeyDown={confirmNameOnKeyDown} disabled={disabled} placeholder='Contains letters, numbers and spaces only (e.g "Favorite Photo 01")' type="text" aria-label="name" id="name"  className="form-control w-50"/>
                <button onClick={confirmNameOnClick} disabled={disabled} className="btn btn-outline-light" type="button" id="submit">Confirm</button>
            </div>


            <div className="text-center rounded-3 py-3 my-3" style={{backgroundSize: "cover", backgroundImage: `url('${data.imageDataUri}')`}}>
                <table className="table table-sm table-hover bg-primary table-borderless table-fit d-inline-block m-0 pb-1 rounded-3">
                    <thead>
                        <tr className="table-active">
                            <th className="text-center text-light" colSpan={2}>Image File</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr className="table-active">
                            <td className="text-end text-light px-3">Name <i className="fa fa-font"></i> :</td>
                            <td className="text-start text-light px-3">{name}</td>

                        </tr>
                        <tr className="table-active">
                            <td className="text-end text-light px-3">Original Filename <i className="fa fa-folder"></i> :</td>
                            <td className="text-start text-light px-3">{data.selectedFileName}</td>
                        </tr>

                        <tr className="table-active">
                            <td className="text-end text-light px-3">File Size <i className="fa fa-save"></i> :</td>
                            <td className="text-start text-light px-3">{data.filesizeKb + "KB"}</td>
                        </tr>

                        <tr className="table-active">
                            <td className="text-end text-light px-3">Original File Size <i className="fa fa-save"></i> :</td>
                            <td className="text-start text-light px-3">{data.originalFilesizeKb + "KB"}</td>
                        </tr>

                        <tr className="table-active">
                            <td className="text-end text-light px-3">File Extension <i className="fa fa-expand"></i> :</td>
                            <td className="text-start text-light px-3">{data.fileExtension}</td>
                        </tr>

                    </tbody>
                </table>
            </div>


            <div className="mt-3 text-center fixed-bottom">
                <div className="d-grid gap-2" role="group" aria-label="Submit">
                    <div className="btn-group" role="group">
                        {/*<button onClick={previousOnClick} disabled={false} type="button" className="btn btn-danger">Previous</button>*/}
                        <button onClick={nextOnClick} disabled={false} type="button" className={`btn btn-success ${isComplete ? "" : "opacity-25"}`}>Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}