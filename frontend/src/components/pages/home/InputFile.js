import React, {useEffect, useRef, useState} from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import ContainerContent from "../../containers/ContainerContent";
import {useData} from "../../utilities/DataContextProvider";




export default function InputFile(props)
{
    const [data, setData] = useData();
    const [files, setFiles] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const pond = useRef(null);

    registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);


    async function onAddFileComplete(error, file)
    {
        if(!error)
        {
            // console.log("onAddFileComplete");

            setData({selectedFile: file});
            setDisabled(false);

            // console.log("onAddFileComplete");

        }

    }

    async function onRemoveFile()
    {
        if(data.selectedFile)
        {
            // console.log("onRemoveFile");

            setData({selectedFile: null});
            setDisabled(true);

            // console.log("onRemoveFile");
        }
    }


    async function submitOnClick()
    {
        setDisabled(true);

        if(data.selectedFile)
        {
            let note = {name: data.selectedFile.filenameWithoutExtension, dataUri: data.selectedFile.getFileEncodeDataURL()}
            await fetchOffChainNote(note);
        }

        setDisabled(false);
    }

    async function fetchOffChainNote(note)
    {
        setData({showSpinner: true});

        let requestBody = {note: note};
        let methodType = "POST"
        let requestUrl = (data.backendUrl + "uploadNote/");
        let requestHeaders = {"Content-Type": "application/json"};

        try
        {
            const response = await fetch(requestUrl, {method: methodType, headers: requestHeaders, body: JSON.stringify(requestBody)});
            const jsonData = await response.json();

            if(Number(response.status.toString().substring(0, 1)) === 2) //if response code stats with 2
            {
                // FilePond.removeFile("*");
                console.log(jsonData);
                pond.current.removeFile(0);
                setFiles([]);
                setData({toastSuccess: " " + jsonData.message + " ID: " + jsonData.note._id});
            }
            else
            {
                if(jsonData.errors)
                {
                    for(let error of jsonData.errors)
                    {
                        await new Promise(resolve => setTimeout(resolve, 250));
                        setData({toastError: "Error: " + response.status + " - " + jsonData.errors[0].message});
                    }
                }
                else
                {
                    setData({toastError: "Error: " + response.status + " - Could not load"});
                }
            }
        }
        catch (exception)
        {
            setData({toastError: "Error: " + exception.message + " " + requestUrl});
        }

        setData({showSpinner: false});
    }



    return (
        <ContainerContent size="6" icon="upload" title="Input">

            <div className="alert bg-secondary">
                <p>
                    {"Input"}
                </p>
            </div>

            <div className="alert bg-secondary">
                <FilePond
                    ref={pond}
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    maxFiles={1}
                    credits={false}
                    allowFileEncode={true}
                    name="files"
                    onaddfile={async (error, file) => await onAddFileComplete(error, file)}
                    onremovefile={async (error, file) => await onRemoveFile()}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />

                <div className="mt-3 text-center">
                    <div className="d-grid gap-2" role="group" aria-label="Submit">
                        <button onClick={submitOnClick} disabled={disabled} type="button" className="btn btn-outline-light">
                            <i className="fa fa-edit"></i> Select File
                        </button>
                    </div>
                </div>

            </div>



        </ContainerContent>
    );
}